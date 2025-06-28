import { SignupPayload, User } from "@/types/auth";
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

export const getFollowing = async (): Promise<{
    data: User[] | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get(`/profile/following`);
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

export const getMutedUser = async (): Promise<{
    data: User[] | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.get(`/user/muted-users`);
        return {
            data: response.data.muted_users,
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


export const registerUser = async (
  body: Partial<SignupPayload>
): Promise<{
  data: SignupPayload | string | null;
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/auth/register", body);
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

export const muteUser = async (
  body: {user_id: number, duration_hours: number}
): Promise<{
  data: { message: string } | string | null;
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/user/mute/user", body);
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

export const unMuteUser = async (user_id: number): Promise<{
    data: {
        user_id: number
    } | null
    status: number;
    success: boolean;
}> => {
    try {
        const response = await apiAxios.delete(`/user/mute/user/${user_id}`);
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