export type User = {
  country: string;
  email: string;
  full_name: string;
  id: number;
  is_verified: boolean;
  onboarding_completed: boolean;
};

export type SignupPayload = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  country: string;
  terms_accepted: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: {data: T};
  detail?: string;
};
