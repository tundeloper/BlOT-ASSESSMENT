import { getAuthTokensFromLocalStorage } from "@/store/authstore";
import axios from "axios";

const apiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiAxios.interceptors.request.use((config) => {
    const token = getAuthTokensFromLocalStorage();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default apiAxios;