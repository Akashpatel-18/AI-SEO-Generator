import { geminiModel } from "../../config/gemini";
import groq from "../../config/groq";
import { Subscription } from "../subscription/subscription.model";
import { PLAN_LIMITS } from "../../config/plans";
import SEOContent from "./seoContent.model";

export const generateSEOContent = async (
  userId: string,
  keyword: string,
  topic: string
) => {
  // Check quota via Subscription
  const subscription: any = await Subscription.findOne({ userId });
  if (!subscription) throw new Error("Subscription not found");

  const limits = PLAN_LIMITS[subscription.plan];

  // reset logic
  if (subscription.usage.resetAt < new Date()) {
    subscription.usage.count = 0;
    subscription.usage.resetAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  }

  // quota check
  if (limits && subscription.usage.count >= limits.maxGenerations) {
    throw new Error("Quota exceeded. Upgrade plan.");
  }

  // Call Gemini for initial structure
  const geminiPrompt = `
    Generate SEO blog content for:
    Keyword: ${keyword}
    URL/Topic: ${topic}

    Return a JSON object with:
    - outline: A structured blog outline with 5 headings (An Array of Strings format only)
    - metaTitle: An SEO meta title (max 60 chars)
    - metaDescription: An SEO meta description (max 160 chars)
    - internalLinkSuggestions: An array of 3 objects, each containing:
          - anchorText: clickable text
          - url: a valid SEO-friendly relative URL (e.g., https://react.dev/reference/react/hooks), don't include just slug, i need full url

    IMPORTANT RULES:
    - URLs MUST be real and valid (no fake domains like example.com)
    - Return ONLY valid JSON.
  `;

  const geminiResult = await geminiModel.generateContent(geminiPrompt);
  const geminiText = geminiResult.response.text();

  let geminiData;
  try {
    // Basic cleaning in case the model returns markdown code blocks
    const cleanedJson = geminiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    geminiData = JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Failed to parse Gemini JSON:", geminiText);
    throw new Error("AI Provider (Gemini) returned invalid format", {
      cause: error,
    });
  }

  // Call Groq for refinement
  const groqPrompt = `
    Improve the following SEO blog outline and meta data to make it more professional and engaging:
    ${JSON.stringify(geminiData)}

    Return a JSON object with the same structure but with improved, more compelling content.
    The metaTitle and metaDescription should be optimized for click-through rate while respecting SEO limits.
  `;

  let groqData;
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: groqPrompt }],
      response_format: { type: "json_object" },
    });
    groqData = JSON.parse(response.choices[0]?.message?.content || "{}");
  } catch (error) {
    console.error("Groq call failed:", error);
    // Fallback if Groq fails, use Gemini data
    groqData = geminiData;
  }

  // Save to database
  const finalOutput = {
    ...groqData,
    source: "combined (Gemini + Groq)",
  };

  const generation = await SEOContent.create({
    userId,
    input: {
      keyword,
      topic,
    },
    output: {
      final: finalOutput,
      raw: {
        gemini: geminiData,
        groq: groqData,
      },
    },
  });

  // Update subscription usage
  subscription.usage.count += 1;
  await subscription.save();

  return generation;
};

export const getHistory = async (userId: string) => {
  return await SEOContent.find({ userId }).sort({ createdAt: -1 });
};
