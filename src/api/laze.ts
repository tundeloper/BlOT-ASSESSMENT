import apiAxios from ".";
import { AxiosError } from "axios";

export const askLaze = async (message: string): Promise<{
    data: {
        message: string;
    } | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/ai/sports-expert`, { message });
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data?.detail,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
};

export const askLazeCurrent = async (message: string): Promise<{
    data: {
        message: string;
    } | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/ai/sports-expert/current`, { message });
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data?.detail,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
};