interface Stories {
  id: 6;
  user_id: 10;
  username: string;
  name: string;
  profile_picture: string;
  content: "";
  media_url: string;
  media_type: string;
  media_files: StoriesMedia[];
  created_at: string;
  expires_at: string;
  views_count: number;
  is_active: boolean;
}

interface StoriesMedia {
  id: number;
  media_url: string;
  media_type: string;
  order_index: number;
}
