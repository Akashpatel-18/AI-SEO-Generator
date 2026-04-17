import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useGetDashboardData = () => {
    return useQuery({
        queryKey: ["dashboardData"],
        queryFn: async () => {
             const response = await API.get("/api/dashboard");
             return response.data;
        },
    });
};
