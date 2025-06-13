import apiAxios from ".";
import { AxiosError } from "axios";

export const createPost = async (
  body: FormData
): Promise<{
  data: FormData | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/posts", body);
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