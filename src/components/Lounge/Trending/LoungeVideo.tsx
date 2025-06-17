'use client'
import React, { useState } from 'react'
import VideoCard from '@/components/Trending/VideoCard'
import backIcon from '@/assets/backIcon.png'
import Image from 'next/image'

const videos = [
    {
        title: 'Video 1',
        description: 'Description 1',
        hashtags: 'Hashtags 1',
        likes: '100',
        comments: '100',
        bookmarks: '100',
        shares: '100',
        thumbnail: 'https://via.placeholder.com/150',
        videoUrl: 'https://res.cloudinary.com/duqgr7s10/video/upload/v1749561516/Screen_Recording_2025-06-10_at_14.15.44_dbkxmg.mp4',
        user: {
            id: 1,
            name: 'NBA Highlights',
            avatar: 'https://via.placeholder.com/150'
        }
    },
    {
        title: 'Video 2',
        description: 'Description 2',
        hashtags: 'Hashtags 2',
        likes: '100',
        comments: '100',
        bookmarks: '100',
        shares: '100',
        thumbnail: 'https://via.placeholder.com/150',
        videoUrl: 'https://res.cloudinary.com/duqgr7s10/video/upload/v1749561516/Screen_Recording_2025-06-10_at_14.15.44_dbkxmg.mp4',
        user: {
            id: 2,
            name: 'Football Highlights',
            avatar: 'https://via.placeholder.com/150'
        }
    }
]

const LoungeVideo = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('trending');

    return (
        <div className='flex flex-col gap-4 bg-inherit md:bg-white rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4'>
            <div className='flex justify-between items-center mb-2'>
                <button className='cursor-pointer'>
                    <Image src={backIcon} alt='back' width={24} height={24} />
                </button>
                <div className="p-[1px] rounded-full border border-[#D9D9D9]">
                    <div className="flex rounded-full">
                        <button
                            onClick={() => setActiveTab('trending')}
                            className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'trending'
                                ? 'bg-[#2D439B] text-white'
                                : 'text-[#3A3D46] hover:bg-gray-50 dark:text-white'
                                }`}
                        >
                            Trending
                        </button>
                        <button
                            onClick={() => setActiveTab('recent')}
                            className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'recent'
                                ? 'bg-[#2D439B] text-white'
                                : 'text-[#3A3D46] hover:bg-gray-50 dark:text-white'
                                }`}
                        >
                            Recent
                        </button>
                    </div>
                </div>
            </div>
            {videos.map((video) => (
                <VideoCard key={video.title} videoData={video} isMuted={isMuted} setIsMuted={setIsMuted} />
            ))}
        </div>
    )
}

export default LoungeVideo