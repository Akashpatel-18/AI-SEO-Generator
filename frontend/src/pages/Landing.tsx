import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, Zap, ChartLine, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] w-full relative overflow-hidden bg-white py-8">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white pointer-events-none"></div>
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-indigo-100 opacity-50 blur-3xl mix-blend-multiply pointer-events-none animate-pulse duration-700"></div>
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-violet-100 opacity-50 blur-3xl mix-blend-multiply pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl px-4 mx-auto flex flex-col items-center animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-8 ring-1 ring-indigo-200/50 shadow-sm">
                    <Sparkles size={16} />
                    <span>The Ultimate AI SEO Tool</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                    Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">SEO Content</span><br />
                    That Actually Ranks
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                    Stop guessing what Google wants. Our advanced AI analyzes top-ranking pages to generate perfectly optimized content briefs, outlines, and metadata in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto group"
                        onClick={() => navigate('/generate-seo')}
                    >
                        Get Started for Free
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 h-14 text-lg font-semibold border-slate-200 hover:bg-slate-50 w-full sm:w-auto"
                    >
                        View Examples
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 relative z-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Lightning Fast</h3>
                    <p className="text-slate-600">Generate complete SEO outlines and metadata in under 10 seconds.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 text-violet-600">
                        <ChartLine size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Data-Driven</h3>
                    <p className="text-slate-600">Powered by Gemini & Groq to ensure highly optimized, ranking-focused outputs.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Plagiarism Free</h3>
                    <p className="text-slate-600">100% original outlines and suggestions, uniquely tailored to your topic.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
