export type User = {
  id: 33;
  full_name: string;
  username: string;
  email: string;
  country: string;
  is_verified: boolean;
  onboarding_completed: boolean;
  notification_preferences: {
    match_start_reminders: boolean;
    team_news: boolean;
    weekly_challenges: boolean;
    leaderboard_updates: boolean;
  };
  favorite_teams: string[];
  favorite_sports: string[];
  created_at: string;
  updated_at: string;
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
  detail?: string;
  token?: string;
};
