import { useGetDashboardData } from "../services/dashboard";
import { Card, CardContent } from "../components/ui/card";
import { Copyleft, Zap, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";

const Dashboard = () => {
    const { data: dashboardResponse, isLoading } = useGetDashboardData();
    const navigate = useNavigate();

    const stats_data = dashboardResponse?.data;
    const user = stats_data?.user;
    const subscription = stats_data?.subscription;

    const stats = [
        {
            title: "Current Plan",
            value: subscription?.plan || "FREE",
            desc: "Active plan",
            icon: ShieldCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            title: "Per Day Quota",
            value: subscription?.limit || 5,
            desc: "Generations allowed",
            icon: Copyleft,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Remaining Quota",
            value: subscription ? (subscription.limit - subscription.usage.count) : 5,
            desc: "Generations left",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            title: "Total Usage",
            value: subscription?.usage?.count || 0,
            desc: "All time generations",
            icon: Activity,
            color: "text-indigo-500",
            bg: "bg-indigo-50"
        }
    ];

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                    <p className="text-slate-500 mt-1">Here is the overview of your account and API usage.</p>
                </div>
                <Button onClick={() => navigate('/generate-seo')} className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
                    Generate New SEO
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between space-x-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.title}</p>
                                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{stat.value}</h2>
                                    <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
