'use client'
import React, { useState } from 'react'
import VideoCard from './VideoCard'

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

const Videos = () => {
    const [isMuted, setIsMuted] = useState(true);

  return (
    <div className='flex flex-col gap-4 bg-inherit md:bg-white rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4'>
        {videos.map((video) => (
            <VideoCard key={video.title} videoData={video} isMuted={isMuted} setIsMuted={setIsMuted} />
        ))}
    </div>
  )
}

export default Videos