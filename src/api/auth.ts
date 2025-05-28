import { AxiosError } from "axios";
import apiAxios from ".";

export const loginUser = async (
  body: Pick<AuthUser, "email" | "password">
): Promise<{ data: AuthUser | string | null; status: number; success: boolean }> => {
  try {
    const response = await apiAxios.post("/auth/login", body);
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

export const registerUser = async (
  body: Partial<AuthUser>
): Promise<{ data: AuthUser | string | null; status: number; success: boolean }> => {
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

export const forgotPassword = async (
  body: Pick<AuthUser, "email">
): Promise<{ data: { message: string } | string | null; status: number; success: boolean }> => {
  try {
    const response = await apiAxios.post("/auth/forgot-password", body);
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

export const resetPassword = async (
  body: { otp: string } & Pick<AuthUser, "password" | "confirm_password">
): Promise<{ data: { message: string } | string | null; status: number; success: boolean }> => {
  try {
    const response = await apiAxios.post("/auth/reset-password", body);
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