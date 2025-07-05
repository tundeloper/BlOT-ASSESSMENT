interface Post {
  type: string;
  id: number;
  content: string;
  author_id: number;
  created_at: string;
  likes_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  hashtags: string;
  media_url: string;
  media_type: string;
  name: string;
  username: string;
  profile_picture: string;
  media_files: MediaFile[];
  comments_count: number;
  reposts_count: number;
  shares_count: number;
  quote: string;
  repost_id: number;
  post_id: number;
  reposter_id: number;
  reposter_name: string;
  reposter_profile_picture: string;
  reposter_username: string;
}

interface MediaFile {
  id: number;
  post_id: number;
  media_type: string;
  created_at: string;
  media_url: string;
  order_index: number;
}
