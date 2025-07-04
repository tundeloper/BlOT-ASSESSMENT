import apiAxios from ".";
import { AxiosError } from "axios";

export const getStories = async (): Promise<{
    data: {stories: Stories[]}[] | null;
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get(`/stories`);
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

export const commentStories = async (
  body: {
    story_id: number,
    content: string,
  }
): Promise<{
  data: {
    story_id: string
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post(`/stories/${body.story_id}/comments`, {content: body.content});
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