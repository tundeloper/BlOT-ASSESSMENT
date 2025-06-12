'use client'
import React, { useEffect } from 'react';
import CircularProgressWithLabel from '../ui/CircularProgressWithLabel';
import { getTrending } from '@/api/trending';

interface TrendingTopic {
  category: string;
  title: string;
  location: string;
  posts: string;
}

const trendingTopics: TrendingTopic[] = [
  {
    category: 'NFL',
    title: 'Super Bowl LIX',
    location: 'Trending in Nigeria',
    posts: '350k posts'
  },
  {
    category: 'Soccer',
    title: 'Manchester United',
    location: 'Trending in Nigeria',
    posts: '150k posts'
  },
  {
    category: 'Hockey',
    title: 'Connor McDavid',
    location: 'Trending in Canada',
    posts: '50k posts'
  }
];

const Trends = () => {

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await getTrending();
      console.log(response);
    };
    fetchTrending();
  }, []);

  return (
    <div className="bg-white dark:bg-[#121212] p-4 rounded flex flex-col gap-4 shadow-[0px_0px_0px_1px_rgba(255,255,255,1)] md:shadow-none w-[100%] transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-medium text-[#1E1E1E] dark:text-white">
          Trends for you
        </h2>
        <button className="text-[13px] font-medium text-[#2D439B] cursor-pointer">
          See all
        </button>
      </div>

      <div className="flex flex-col gap-[10px]">
        {trendingTopics.map((topic, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#3A3D46] dark:text-[#C9CDD4]">
                {topic.category}
              </span>
              <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
                {topic.title}
              </span>
              <span className="text-[12px] text-[#3A3D46] dark:text-[#C9CDD4]">
                {topic.location}
              </span>
            </div>
            <span className="text-[10px] text-[#1E1E1E] w-[54px] text-right dark:text-white">
              {topic.posts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;

export const TrendPending = () => {
  return (
    <div className="bg-white p-4 rounded flex flex-col items-center gap-4 shadow-[0px_0px_0px_1px_rgba(255,255,255,1)] w-[100%]">
      <div className="flex flex-col items-center gap-1 w-full">
        <h3 className="text-[14px] font-medium text-[#1E1E1E]">
          Complete your profile
        </h3>
        <p className="text-[11px] text-[#3A3D46] text-center">
          You&apos;re almost there! Personalize your account to unlock a tailored experience.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <CircularProgressWithLabel value={30} />
        <span className="text-[13px] font-medium text-[#3A3D46]">
          Steps: 2 of 5 completed
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[13px] text-[#3A3D46]">
          Want a more personalized experience?
        </span>
        <button className="text-[13px] text-[#2D439B] cursor-pointer">
          Complete Profile
        </button>
      </div>
    </div>
  );
};