export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  date_of_birth: string;
  country: string;
  favorite_sport: string;
  favorite_team: string;
  bio: string;
  location: string;
  following_count: number;
  followers_count: number;
  formatted_join_date: string;
  formatted_member_since: string;
  profile_picture: string;
  banner_image: string;
  website: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
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
  data: T;
  detail?: string
};
