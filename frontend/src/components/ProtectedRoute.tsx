import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector((state) => state.auth.token);

    if (!token) {
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default ProtectedRoute;
