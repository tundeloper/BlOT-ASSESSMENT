interface Comments {
  author_id: string;
  author_name: string;
  author_profile_picture: string;
  author_username: string;
  content: string;
  created_at: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
  parent_id: number;
  post_id: number;
  replies: Comments[];
  updated_at: "2025-07-02T00:08:52.180301";
}