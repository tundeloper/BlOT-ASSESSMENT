import { User } from "@/types/auth";
import apiAxios from ".";
import { AxiosError } from "axios";

export const followUser = async (username: string): Promise<{
    data: {
        username: string
    } | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/profile/follow/${username}`);
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

export const unfollowUser = async (username: string): Promise<{
    data: {
        username: string
    } | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.post(`/profile/unfollow/${username}`);
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

export const getFollowers = async (): Promise<{
    data: User[] | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get(`/profile/followers`);
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