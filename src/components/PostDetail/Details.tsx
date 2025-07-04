"use client"
import { useEffect, useState } from "react"
import Post from "../Feed/Post"
import { getFollowing, getMutedUser } from "@/api/user";
import { getPost } from "@/api/feed";
import { SnackbarProvider } from "notistack";
import AuthModal from "../Layout/AuthModal";
import { User } from "@/types/auth";
import { CircularProgress } from "@mui/material";

const Details: React.FC<{ id: string }> = ({ id }) => {
  const [following, setFollowing] = useState<User[]>([]);
  const [mutedUser, setMutedUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

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
        if (feedRes.data) setPost(feedRes.data);
        console.log(feedRes)
      }
      setLoading(false);
    }
    fetchFeed();
  }, [id]);

  return <div className="text-white mb-[10rem] w-full h-full">
    {
      loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress value={40} size={40} sx={{ color: '#2D439B' }} />
        </div>
      ) : (
        <Post
          key={post?.id}
          post={post!}
          isMuted={mutedUser.some((user) => user.id === post?.author_id)}
          fetchMutedUser={fetchMutedUser}
          isFollowing={following.some((user) => user.id === post?.author_id)}
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