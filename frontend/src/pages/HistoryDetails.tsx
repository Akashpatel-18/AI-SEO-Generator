import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { useGetHistory } from "../services/seo";
import SeoResultDisplay from "../components/SeoResultDisplay";
import { Button } from "../components/ui/button";
import { ArrowLeft, Clock, Search } from "lucide-react";
import { format } from "date-fns";

const HistoryDetails = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: historyResponse, isLoading } = useGetHistory();

    const historyItem = state?.item || (historyResponse?.data && historyResponse.data.find((i: any) => i._id === id));

    if (isLoading && !historyItem) {
        return (
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 rounded-full border-r-2 border-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500">Loading history details...</p>
            </div>
        );
    }

    if (!historyItem) {
        return <Navigate to="/history" />;
    }

    const { input, output, createdAt } = historyItem;
    const resultToDisplay = output?.final || output?.raw?.gemini;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/history')}
                    className="border-slate-200 hover:bg-slate-100 flex-shrink-0"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Generation Details</h1>
                    <div className="flex items-center text-sm text-slate-500 mt-1 gap-2">
                        <Clock className="w-4 h-4" />
                        {format(new Date(createdAt), 'MMM dd, yyyy - hh:mm a')}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Target Keyword</p>
                    <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Search className="w-4 h-4 text-indigo-500" />
                        {input.keyword}
                    </p>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-200"></div>
                <div className="space-y-1 flex-1">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Topic</p>
                    <p className="text-md text-slate-800 line-clamp-2">{input.topic}</p>
                </div>
            </div>

            <div className="pt-2">
                <SeoResultDisplay result={resultToDisplay} />
            </div>
        </div>
    );
};

export default HistoryDetails;
