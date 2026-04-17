import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useGenerateSEO = () => {
    return useMutation({
        mutationFn: async (data: { keyword: string; topic: string }) => {
            const response = await API.post("/api/seoContent/generate", data);
            return response.data;
        },
    });
};

export const useGetHistory = () => {
    return useQuery({
        queryKey: ["seo-history"],
        queryFn: async () => {
             const response = await API.get("/api/seoContent/history");
             return response.data;
        },
    });
};
