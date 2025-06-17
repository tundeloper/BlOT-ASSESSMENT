import apiAxios from ".";
import { AxiosError } from "axios";

export const getLounges = async (): Promise<{
    data: [] | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get("/lounges/");
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

export const getLounge = async (slug: string): Promise<{
    data: Lounge | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get(`/lounges/${slug}`);
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

export const joinLounge = async (id: number): Promise<{
    data: Lounge | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/lounges/${id}/join`);
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

export const leaveLounge = async (id: string): Promise<{
    data: Lounge | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/lounges/${id}/leave`);
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