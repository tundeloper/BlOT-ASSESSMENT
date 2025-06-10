'use client'
import React, { useState } from 'react'
import Post from './Post'

type FeedType = 'following' | 'for-you';

const Feeds = () => {
  const [activeTab, setActiveTab] = useState<FeedType>('following');

  return (
    <div className="flex flex-col gap-4 bg-inherit md:bg-white rounded p-0 md:p-4">
      <div className="flex justify-start md:justify-end">
        <div className="p-[1px] rounded-full border border-[#D9D9D9]">
          <div className="flex rounded-full">
            <button
              onClick={() => setActiveTab('following')}
              className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'following'
                  ? 'bg-[#2D439B] text-white'
                  : 'text-[#3A3D46] hover:bg-gray-50'
                }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab('for-you')}
              className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'for-you'
                  ? 'bg-[#2D439B] text-white'
                  : 'text-[#3A3D46] hover:bg-gray-50'
                }`}
            >
              For You
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 md:mt-0 h-[70vh] md:h-[57vh] overflow-y-auto scrollbar-hide pb-6">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Feeds