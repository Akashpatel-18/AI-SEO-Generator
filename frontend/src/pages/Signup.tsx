import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, LogIn, UserPlus } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useLogin, useRegister } from "../services/auth";
import { useAppDispatch } from "../store/hooks";
import { setUser, setToken } from "../store/authSlice";

const authSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginMutation = useLogin();
    const registerMutation = useRegister();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof authSchema>) => {
        if (isLogin) {
            loginMutation.mutate({ email: values.email, password: values.password }, {
                onSuccess: (res) => {
                    toast.success("Welcome back!");
                    dispatch(setToken(res.data.token));
                    dispatch(setUser(res.data));
                    // Redirect to Generate SEO since they probably came from there or landing
                    navigate("/generate-seo");
                },
                onError: (err: any) => {
                    const rawMessage = err?.response?.data?.message || "";
                    let friendlyMessage = "Failed to login. Please check your credentials.";

                    if (rawMessage.includes("Invalid email or password")) {
                        friendlyMessage = "Incorrect email or password. Please try again.";
                    } else if (rawMessage.includes("User not found")) {
                        friendlyMessage = "No account found with this email.";
                    }

                    toast.error(friendlyMessage);
                }
            });
        } else {
            if (!values.name) {
                toast.error("Name is required for sign up.");
                return;
            }
            registerMutation.mutate(values, {
                onSuccess: (res) => {
                    toast.success("Account created successfully!");
                    dispatch(setToken(res.data.token));
                    dispatch(setUser(res.data));
                    navigate("/generate-seo");
                },
                onError: (err: any) => {
                    const rawMessage = err?.response?.data?.message || "";
                    let friendlyMessage = "Failed to create account. Please try again.";

                    if (rawMessage.includes("already exists")) {
                        friendlyMessage = "An account with this email already exists.";
                    }

                    toast.error(friendlyMessage);
                }
            });
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        reset();
    };

    const isPending = loginMutation.isPending || registerMutation.isPending;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-slate-50 pointer-events-none"></div>
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 relative z-10 animate-fade-in-up">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
                    {isLogin ? "Welcome Back" : "Create an Account"}
                </h2>
                <p className="text-center text-slate-500 mb-8">
                    {isLogin ? "Enter your credentials to access your account" : "Sign up to start generating AI SEO content"}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                {...register("name")}
                                className="bg-slate-50 border-slate-200 h-11 focus-visible:ring-indigo-600"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                            className="bg-slate-50 border-slate-200 h-11 focus-visible:ring-indigo-600"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                            className="bg-slate-50 border-slate-200 h-11 focus-visible:ring-indigo-600"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all text-white text-base font-semibold"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : isLogin ? (
                            <span className="flex items-center"><LogIn className="w-5 h-5 mr-2" /> Sign In</span>
                        ) : (
                            <span className="flex items-center"><UserPlus className="w-5 h-5 mr-2" /> Sign Up</span>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500 font-medium whitespace-nowrap">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={toggleMode}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors focus:outline-none focus:underline underline-offset-4"
                    >
                        {isLogin ? "Create one" : "Sign in instead"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
