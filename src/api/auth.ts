import { AxiosError } from "axios";
import apiAxios from ".";
import { LoginPayload, SignupPayload, User } from "@/types/auth";

export const loginUser = async (
  body: Pick<LoginPayload, "email" | "password">
): Promise<{
  data: LoginPayload | string | null;
  status: number;
  success: boolean;
}> => {
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

export const forgotPassword = async (
  body: Pick<LoginPayload, "email">
): Promise<{
  data: { message: string } | string | null;
  status: number;
  success: boolean;
}> => {
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
  body: { otp: string } & Pick<SignupPayload, "password" | "confirm_password">
): Promise<{
  data: { message: string } | string | null;
  status: number;
  success: boolean;
}> => {
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

export const verifyEmail = async (
  body: { verification_code: string } & Pick<SignupPayload, "email">
): Promise<{
  data: { message: string } | string | null;
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/auth/verify", body);
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

export const googleLogin = async (body: {
  access_token: string;
}): Promise<{
  data: {data: User, token: string};
  status: number;
  success: boolean;
}> => {
  try {
    const response = await apiAxios.post("/auth/oauth/google", body);
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
