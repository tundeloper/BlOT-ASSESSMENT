import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_FINNHUB_BASE_URL;

export const finnhub = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_KEY,
  },
});

export const fetchMarketNews = async (category: string = 'general') => {
  try {
    const response = await finnhub.get('/news', {
      params: { category },
    });
    return response.data;
  } catch (error) {
    console.error('Finnhub News Error:', error);
    return [];
  }
};