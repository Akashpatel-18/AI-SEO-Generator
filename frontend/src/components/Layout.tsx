import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    History,
    LogOut,
    Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from './ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Layout = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/generate-seo', label: 'Generate SEO', icon: FileText },
        { path: '/history', label: 'History', icon: History },
    ];

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const headerMenu = token ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-indigo-100">
                        <AvatarImage src="" alt={user?.name} />
                        <AvatarFallback className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button onClick={() => navigate('/signup')} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all" variant="default">
            Sign Up
        </Button>
    );

    const mainContent = (
        <div className="flex flex-1 flex-col min-h-screen">
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center shadow-sm">
                <div className="w-full px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {token && <SidebarTrigger className="md:hidden" />}
                        {token ? (
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center gap-2 md:hidden mr-4">
                                    <Sparkles className="h-5 w-5 text-indigo-600" />
                                    <span className="font-bold text-slate-800">Shoutnhike</span>
                                </Link>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="h-8 w-1 bg-indigo-600 rounded-full mr-2" />
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                        {menuItems.find(m => m.path === location.pathname)?.label || "Shoutnhike SEO"}
                                    </h2>
                                </div>
                            </div>
                        ) : (
                            <Link to="/" className="flex items-center gap-2">
                                <Sparkles className="h-6 w-6 text-indigo-600" />
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                    Shoutnhike
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {headerMenu}
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6">
                <Outlet />
            </main>
        </div>
    );

    return token ? (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
                <Sidebar className="border-r border-slate-200 dark:border-slate-800">
                    <SidebarContent className="bg-white dark:bg-slate-900 h-full">
                        <div className="p-6">
                            <Link to="/" className="flex items-center gap-2 select-none">
                                <div className="bg-indigo-600 p-2 rounded-xl">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                                    Shoutnhike
                                </span>
                            </Link>
                        </div>
                        <SidebarGroup>
                            {/* <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-6">Menus</SidebarGroupLabel> */}
                            <SidebarGroupContent>
                                <SidebarMenu className="gap-2 px-4">
                                    {menuItems.map((item) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <SidebarMenuItem key={item.path}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    className={`h-11 px-4 rounded-xl transition-all duration-300 group select-none ${isActive
                                                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-semibold shadow-sm"
                                                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                                                        }`}
                                                >
                                                    <Link to={item.path} className="flex items-center gap-3 w-full">
                                                        <item.icon size={20} className={isActive ? "text-indigo-600" : ""} />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                {mainContent}
            </div>
        </SidebarProvider>
    ) : (
        <div className="flex min-h-screen w-full">
            {mainContent}
        </div>
    );
};

export default Layout;
