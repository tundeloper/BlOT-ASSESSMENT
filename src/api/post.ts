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

export const likePost = async (
  body: {
    post_id: number
  }
): Promise<{
  data: {
    post_id: string
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/posts/like", body);
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

export const unlikePost = async (
  body: {
    post_id: number
  }
): Promise<{
  data: {
    post_id: string
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/posts/unlike", body);
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

export const createComment = async (
  body: {
    content: string;
    post_id: number;
    parent_id?: number;
  }
): Promise<{
  data: Comments | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/social/comments", body);
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

export const getComment = async (post_id: number): Promise<{
    data: Comments[] | null;
    status: number;
    success: boolean;
}> => {
    try {
        console.log(post_id)
        const response = await apiAxios.get(`/social/comments/${post_id}`);
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

export const deleteComment = async (post_id: number): Promise<{
    data: Comments[] | null;
    status: number;
    success: boolean;
}> => {
    try {
        console.log(post_id)
        const response = await apiAxios.get(`/social/comments/${post_id}`);
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


export const likeComment = async (
  body: {comment_id: number}
): Promise<{
  data: {
    post_id: number
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/social/comments/like", body);
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

export const unlikeComment = async (
  body: {comment_id: number}
): Promise<{
  data: {
    post_id: number
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/social/comments/unlike", body);
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


export const createRepost = async (
  body: {
    post_id: number;
    quote?: string;
  }
): Promise<{
  data: {
    post_id: number
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/social/reposts", body);
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

export const createBookmark = async (
  body: {
    post_id: number;
  }
): Promise<{
  data: {
    post_id: number
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/social/bookmarks", body);
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

export const deleteBookmark = async (post_id: number): Promise<{
  data: {
    post_id: number
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.delete(`/social/bookmarks/${post_id}`);
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

export const getPostLikes = async (post_id: number): Promise<{
  data: {
    likes: {
      id: number;
      username: string;
      profile_picture: string;
    }[]
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.get(`/posts/likes/${post_id}`);
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

export const logShare = async (post_id: number): Promise<{
  data: {
      id: number;
      username: string;
      profile_picture: string;
  } | null
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post(`/social/shares`, {
      post_id: post_id
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