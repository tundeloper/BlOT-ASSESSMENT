'use client'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { getFeed } from '@/api/feed'
import { CircularProgress } from '@mui/material'
import { User } from '@/types/auth'
import { getFollowing, getMutedUser } from '@/api/user'
import { SnackbarProvider } from "notistack";
import AuthModal from '../Layout/AuthModal'
import Repost from './Repost'


type FeedType = 'following' | 'for-you';

const Feeds = () => {
  const [activeTab, setActiveTab] = useState<FeedType>('following');
  const [feed, setFeed] = useState<Post[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [mutedUser, setMutedUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const fetchFollowing = async () => {
    const res = await getFollowing();
    if (res.success) {
      setFollowing(res.data || []);
    }
  }

  const fetchMutedUser = async () => {
    const res = await getMutedUser();
    if (res.success) {
      console.log(res.data)
      setMutedUser(res.data || []);
    }
  }

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      const [feedRes] = await Promise.all([getFeed(), fetchMutedUser(), fetchFollowing()]);
      if (feedRes.success) {
        setFeed(feedRes.data || []);
      }
      setLoading(false);
    }
    fetchFeed();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4 h-[70%] grow">
        <div className="flex justify-start md:justify-end">
          <div className='gradient-border rounded-full'>
            <div className="p-[1px] rounded-full border border-[#D9D9D9] bg-white dark:bg-[#121212]">
              <div className="flex rounded-full">
                <button
                  onClick={() => setActiveTab('following')}
                  className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'following'
                    ? 'bg-[#2D439B] text-white'
                    : 'text-[#3A3D46] hover:bg-gray-50 dark:text-white'
                    }`}
                >
                  Following
                </button>
                <button
                  onClick={() => setActiveTab('for-you')}
                  className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'for-you'
                    ? 'bg-[#2D439B] text-white'
                    : 'text-[#3A3D46] hover:bg-gray-50 dark:text-white'
                    }`}
                >
                  For You
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-4 md:mt-0 h-[100%] overflow-y-auto scrollbar-hide pb-10 md:pb-6">
          {
            loading ? (
              <div className="flex justify-center items-center h-full">
                <CircularProgress size={40} sx={{ color: '#2D439B' }} />
              </div>
            ) : (
              feed.map((post) => (
                post?.type === 'repost' ? (
                  <Repost
                    key={post.id}
                    post={post}
                    isMuted={mutedUser.some((user) => user.id === post.author_id)}
                    fetchMutedUser={fetchMutedUser}
                    isFollowing={following.some((user) => user.id === post.author_id)}
                    fetchFollowing={fetchFollowing}
                    setOpenAuthModal={setOpenAuthModal}
                  />
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
              ))
            )
          }
        </div>
        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      </div>
      <SnackbarProvider />
    </>
  );
}

export default Feeds