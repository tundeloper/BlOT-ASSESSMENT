import React from 'react'
import { RiBookmarkFill } from 'react-icons/ri'
import { PiShareFat } from 'react-icons/pi'

const NewsItem = () => {

    const handleShare = async () => {
        navigator.share({
            title: 'Lionel Messi Clinches Historic 8th Ballon d&apos;Or, Reignites GOAT Debate',
            text: 'Lionel Messi Clinches Historic 8th Ballon d&apos;Or, Reignites GOAT Debate',
            url: window.location.origin,
        });
    }

    return (
        <div>
            <div className="flex justify-between items-end w-full gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="font-medium text-[16px] text-[#3A3D46] dark:text-white leading-snug" style={{ fontFamily: 'Switzer, sans-serif' }}>
                        Lionel Messi Clinches Historic 8th Ballon d&apos;Or, Reignites GOAT Debate
                    </h1>
                    <div className="text-[13px] text-[#7A7F8C] dark:text-white" style={{ fontFamily: 'Switzer, sans-serif' }}>
                        Published: June 3, 2025 &middot; 3:45PM &middot; By ESPN Sports Desk &middot; 4 min read
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-5 h-5 flex items-center justify-center cursor-pointer">
                        <RiBookmarkFill className="w-5 h-5 text-[#3A3D46] dark:text-white" />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleShare}>
                        <PiShareFat className="w-6 h-6 text-[#3A3D46] dark:text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsItem