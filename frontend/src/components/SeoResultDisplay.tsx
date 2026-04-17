import { CheckCircle2, ChevronRight, Link as LinkIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SeoResultDisplayProps {
  result: any;
}

const SeoResultDisplay = ({ result }: SeoResultDisplayProps) => {
  if (!result) return null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="border border-green-100 shadow-sm bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
        <div className="h-2 w-full bg-green-500"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-slate-800">SEO Meta Data</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Meta Title
            </Label>
            <p className="text-lg font-medium text-slate-900 mt-1">{result.metaTitle}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Meta Description
            </Label>
            <p className="text-slate-700 mt-1">{result.metaDescription}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl">Blog Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.outline?.map((point: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-slate-800 font-medium leading-relaxed mt-1">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {result.internalLinkSuggestions && result.internalLinkSuggestions.length > 0 && (
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-500" />
              Internal Link Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {result.internalLinkSuggestions.map((link: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200 transition-all"
                >
                  <div className="flex bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-md text-sm whitespace-nowrap items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    {link.anchorText}
                  </div>
                  <ChevronRight className="hidden sm:block text-slate-300 flex-shrink-0" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-indigo-600 truncate w-full sm:w-auto text-sm bg-white sm:bg-transparent p-2 sm:p-0 rounded border sm:border-none"
                  >
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeoResultDisplay;
