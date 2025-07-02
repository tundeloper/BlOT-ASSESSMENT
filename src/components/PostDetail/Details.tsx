"use client"
import { useEffect, useState } from "react"
import Post from "../Feed/Post"
import { getFollowing, getMutedUser } from "@/api/user";
import { getPost } from "@/api/feed";
import { SnackbarProvider } from "notistack";
import AuthModal from "../Layout/AuthModal";
import { User } from "@/types/auth";
import { CircularProgress } from "@mui/material";

const Details:React.FC<{id: string}> = ({id}) => {
      const [following, setFollowing] = useState<User[]>([]);
      const [mutedUser, setMutedUser] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [openAuthModal, setOpenAuthModal] = useState(false);
      
      
      const [post, setPost] = useState<Post>(
    {type: '',
    id: 0,
    content: '',
    author_id: 0,
    created_at: '',
    likes_count: 0,
    is_liked: false,
    is_bookmarked: true,
    hashtags: '',
    media_url: '',
    media_type: '',
    name: '',
    username: '',
    profile_picture: '',
    media_files: [],
    comments_count: 0,
    reposts_count: 0,
    shares_count: 0
});
    const fetchMutedUser = async () => {
        const res = await getMutedUser();
        if (res.success) {
          console.log(res.data)
          setMutedUser(res.data || []);
        }
      }

    const fetchFollowing = async () => {
        const res = await getFollowing();
        if (res.success) {
          setFollowing(res.data || []);
        }
      }

    
      useEffect(() => {
        const fetchFeed = async () => {
          setLoading(true);
          const [feedRes] = await Promise.all([getPost(+id), fetchMutedUser(), fetchFollowing()]);
          if (feedRes.success) {
            if(feedRes.data) setPost(feedRes.data);
            console.log(feedRes)
          }
          setLoading(false);
        }
        fetchFeed();
      }, []);
      
    return <div className="text-white mb-[10rem] w-full h-full">
    {
          loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <CircularProgress value={40} size={40} sx={{ color: '#2D439B' }} />
            </div>
          ) : (
              <Post
                key={post.id}
                post={post}
                isMuted={mutedUser.some((user) => user.id === post.author_id)}
                fetchMutedUser={fetchMutedUser}
                isFollowing={following.some((user) => user.id === post.author_id)}
                fetchFollowing={fetchFollowing}
                setOpenAuthModal={setOpenAuthModal}
              />
          )
        }
        <SnackbarProvider />
        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </div>
}

export default Details