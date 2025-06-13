import apiAxios from ".";
import { AxiosError } from "axios";

export const getLivescore = async (): Promise<{
    data: {
        matches: Livescore[] | null,
        count: number
    } | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get("/livescores/live");
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

export const getFixtures = async (): Promise<{
    data: {
        matches: Livescore[] | null,
        count: number
    } | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get("/livescores/fixtures", {
            params: {
                from_date: new Date().toISOString().split('T')[0],
                to_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
        });
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