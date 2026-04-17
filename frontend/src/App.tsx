import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

const Landing = React.lazy(() => import("./pages/Landing"));
const AuthForm = React.lazy(() => import("./pages/Signup"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const GenerateSEO = React.lazy(() => import("./pages/GenerateSEO"));
const History = React.lazy(() => import("./pages/History"));
const HistoryDetails = React.lazy(() => import("./pages/HistoryDetails"));

const SuspenseFallback = () => (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
);

const App = () => {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Routes>
                <Route path="/signup" element={
                    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
                        <AuthForm />
                    </Suspense>
                } />

                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <Suspense fallback={<SuspenseFallback />}>
                            <Landing />
                        </Suspense>
                    } />
                    <Route path="generate-seo" element={
                        <Suspense fallback={<SuspenseFallback />}>
                            <GenerateSEO />
                        </Suspense>
                    } />

                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <Suspense fallback={<SuspenseFallback />}>
                                <Dashboard />
                            </Suspense>
                        </ProtectedRoute>
                    } />

                    <Route path="history" element={
                        <ProtectedRoute>
                            <Suspense fallback={<SuspenseFallback />}>
                                <History />
                            </Suspense>
                        </ProtectedRoute>
                    } />

                    <Route path="history/:id" element={
                        <ProtectedRoute>
                            <Suspense fallback={<SuspenseFallback />}>
                                <HistoryDetails />
                            </Suspense>
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </>
    );
};

export default App;