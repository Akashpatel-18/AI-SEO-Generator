import { useGetHistory } from "../services/seo";
import { format } from "date-fns";
import { FileText, Calendar, Link as LinkIcon } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const History = () => {
    const { data: historyResponse, isLoading } = useGetHistory();
    const navigate = useNavigate();

    const historyItems = historyResponse?.data || [];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your History</h1>
                    <p className="text-slate-500 mt-1">Review all your previous SEO content generations.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4 mt-8">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
                </div>
            ) : historyItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No history found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                        You haven't generated any SEO content yet. Head over to Generate SEO to create your first brief.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 mt-8 animate-fade-in-up">
                    {historyItems.map((item: any) => (
                        <Card key={item._id} className="border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                            <div className="flex flex-col md:flex-row">
                                <div className="bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 md:w-1/3 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md w-max mb-3">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {format(new Date(item.createdAt), 'MMM dd, yyyy - hh:mm a')}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 truncate" title={item.input.keyword}>
                                        {item.input.keyword}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2" title={item.input.topic}>
                                        {item.input.topic}
                                    </p>
                                </div>
                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Meta Title</div>
                                        <p className="text-slate-900 font-medium mb-4 line-clamp-1">{item.output.final?.metaTitle || "N/A"}</p>

                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <FileText className="w-4 h-4 text-slate-400" />
                                                <span>{item.output.final?.outline?.length || 0} Steps</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <LinkIcon className="w-4 h-4 text-slate-400" />
                                                <span>{item.output.final?.internalLinkSuggestions?.length || 0} Links</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-indigo-50/50 w-full md:w-auto"
                                            onClick={() => navigate(`/history/${item._id}`, { state: { item } })}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
