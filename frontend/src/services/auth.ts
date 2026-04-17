import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await API.post("/api/auth/login", data);
            return response.data;
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await API.post("/api/auth/register", data);
            return response.data;
        },
    });
};

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
             const response = await API.get("/api/auth/profile");
             return response.data;
        },
    });
};
