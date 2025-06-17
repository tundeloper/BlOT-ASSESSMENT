'use client'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { getFeed } from '@/api/feed'
import { CircularProgress } from '@mui/material'
import { User } from '@/types/auth'
import { getFollowers } from '@/api/user'

type FeedType = 'following' | 'for-you';

const Feeds = () => {
  const [activeTab, setActiveTab] = useState<FeedType>('following');
  const [feed, setFeed] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(followers);
  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      const [feedRes, followersRes] = await Promise.all([getFeed(), getFollowers()]);
      console.log(followersRes);
      if (feedRes.success) {
        setFeed(feedRes.data || []);
      }
      if (followersRes.success) {
        setFollowers(followersRes.data || []);
      }
      setLoading(false);
    }
    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4">
      <div className="flex justify-start md:justify-end">
        <div className="p-[1px] rounded-full border border-[#D9D9D9]">
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

      <div className="flex flex-col gap-4 mt-4 md:mt-0 h-[70vh] md:h-[57vh] overflow-y-auto scrollbar-hide pb-6">
        {
          loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress size={40} sx={{ color: '#2D439B' }} />
            </div>
          ) : (
            feed.map((post) => (
              <Post key={post.id} post={post} />
            ))
          )
        }
      </div>
    </div>
  );
}

export default Feeds