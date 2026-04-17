import mongoose from "mongoose";

const seoContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    input: {
      keyword: { type: String, required: true },
      topic: { type: String, required: true },
    },
    output: {
      final: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      raw: {
        gemini: mongoose.Schema.Types.Mixed,
        groq: mongoose.Schema.Types.Mixed,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SEOContent", seoContentSchema);
