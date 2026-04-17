import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useGenerateSEO } from "../services/seo";
import { useAppSelector } from "../store/hooks";
import { Skeleton } from "../components/ui/skeleton";
import SeoResultDisplay from "../components/SeoResultDisplay";

const formSchema = z.object({
  keyword: z.string().min(2, { message: "Keyword must be at least 2 characters." }),
  topic: z.string().min(5, { message: "Topic must be at least 5 characters." }),
});

const GenerateSEO = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const generateMutation = useGenerateSEO();
  const [result, setResult] = useState<any>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      topic: "",
    },
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingSeoData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setValue("keyword", parsed.keyword);
        setValue("topic", parsed.topic);
        if (token) {
          sessionStorage.removeItem("pendingSeoData");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [setValue, token]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!token) {
      sessionStorage.setItem("pendingSeoData", JSON.stringify(values));
      toast.error("Sign up to get started.");
      navigate("/signup");
      return;
    }

    generateMutation.mutate(values, {
      onSuccess: (res) => {
        toast.success("SEO Content Generated successfully!");
        setResult(res.data?.output?.final || res.data?.output?.raw?.gemini);
        reset();
      },
      onError: (err: any) => {
        const rawMessage = err?.response?.data?.message || "";
        let friendlyMessage = "Failed to generate SEO content. Please try again later.";

        if (rawMessage.includes("GoogleGenerativeAI") || rawMessage.includes("gemini")) {
          friendlyMessage = "AI service is currently unavailable. We're working to restore it.";
        } else if (rawMessage.includes("Quota exceeded") || rawMessage.includes("limit")) {
          friendlyMessage = "You've reached your daily generation limit. Please upgrade your plan.";
        } else if (rawMessage.includes("invalid format")) {
          friendlyMessage = "Generated content format was invalid. Please try a different topic.";
        }

        toast.error(friendlyMessage);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <Card className="w-full lg:w-1/3 flex-shrink-0 lg:sticky lg:top-24 shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Generate Content
          </CardTitle>
          <CardDescription>
            Enter your target keyword and topic to generate a full SEO briefing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keyword">Target Keyword</Label>
              <Input
                id="keyword"
                placeholder="e.g. Best Running Shoes"
                {...register("keyword")}
                className="h-11 border-slate-300 focus-visible:ring-indigo-600"
              />
              {errors.keyword && <p className="text-sm text-red-500">{errors.keyword.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Blog Topic</Label>
              <Input
                id="topic"
                placeholder="e.g. Top 10 Running Shoes for Flat Feet in 2024"
                {...register("topic")}
                className="h-11 border-slate-300 focus-visible:ring-indigo-600"
              />
              {errors.topic && <p className="text-sm text-red-500">{errors.topic.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 transition-all"
              disabled={generateMutation.isPending}
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating SEO...
                </>
              ) : (
                "Generate SEO"
              )}
            </Button>
            {!token && (
              <p className="text-xs text-center text-slate-500">You will be asked to sign up to save results.</p>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="w-full lg:w-2/3 flex-grow">
        {generateMutation.isPending ? (
          <Card className="w-full shadow-sm">
            <CardHeader className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5 mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ) : result ? (
          <SeoResultDisplay result={result} />
        ) : (
          <div className="h-full min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 p-6 md:p-8 text-center text-slate-500">
            <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-indigo-200">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to generate</h3>
            <p className="max-w-md text-sm md:text-base">Fill out the form on the left to start generating optimal SEO content outlines, titles, and descriptions using advanced AI.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateSEO;
