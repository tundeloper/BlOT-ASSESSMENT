import axios from "axios";

const apiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default apiAxios;