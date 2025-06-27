'use client'
import React, { useEffect, useState } from 'react'
import VideoCard from '@/components/Trending/VideoCard'
import backIcon from '@/assets/backIcon.png'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import { CircularProgress } from '@mui/material'
import { joinLounge } from '@/api/lounges'
import { getLounge } from '@/api/lounges'
import { getLoungeNav } from '@/utils/lounge'

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
    const router = useRouter()
    const { theme } = useTheme()
    const { slug } = useParams()
    const pathname = usePathname()
    const navItems = getLoungeNav(pathname, slug as string);
    const [lounge, setLounge] = useState<Lounge | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLounge = async () => {
            setLoading(true);
            const response = await getLounge(slug as string);
            if (response.success) {
                setLounge(response.data);
            } else {
                console.log(response);
            }
            setLoading(false);
        };
        fetchLounge();
    }, [slug]);

    const handleJoinLounge = async () => {
        if (lounge?.is_member) {
            navigator.share({
                title: lounge?.name,
                text: lounge?.description,
                url: `${window.location.href}`,
            });
            return;
        }
        if (lounge?.id) {
            setIsJoining(true);
            const response = await joinLounge(lounge.id);
            if (response.success) {
                setLounge(response.data);
            } else {
                console.log(response);
            }
            setIsJoining(false);
        }
    }

    return (
        <div className='flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-10 md:pb-4'>
            <div className='block md:hidden'>
                <div className='flex justify-between items-center'>
                    <button className='cursor-pointer flex items-center gap-2' onClick={() => router.back()}>
                        <Image src={backIcon} alt='back' width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''}`} />
                        <span className='text-[13px] font-normal text-[#3A3D46] dark:text-white'>Back</span>
                    </button>
                    <p className='text-[13px] font-normal text-[#3A3D46] dark:text-white'>{loading ? 'Loading...' : lounge?.name} Lounge</p>
                    <button className='bg-[#2D439B] text-white w-[75px] h-[25px] rounded-[2px] text-[14px] font-normal' onClick={handleJoinLounge}>{isJoining ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : lounge?.is_member ? 'Invite' : 'Join'}</button>
                </div>
                <div className='flex gap-3 mt-4 overflow-x-auto scrollbar-hide'>
                    {navItems.map((item) => (
                        <div key={item.id} className={`text-[13px] font-normal text-[#3A3D46] dark:text-white shrink-0 border-b-[3px] border-[#2D439B] pb-1 ${item.isSelected ? 'border-[#2D439B]' : 'border-transparent'}`} onClick={() => router.push(item.path)}>{item.label}</div>
                    ))}
                </div>
            </div>
            <div className='flex justify-between items-center mb-2'>
                <button className='cursor-pointer hidden md:block' onClick={() => router.back()}>
                    <Image src={backIcon} alt='back' width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''} cursor-pointer`} onClick={() => router.back()} />
                </button>
                <div className='gradient-border rounded-full'>
                    <div className="p-[1px] rounded-full border border-[#D9D9D9] bg-white dark:bg-[#121212]">
                        <div className="flex rounded-full">
                            <button
                                onClick={() => setActiveTab('trending')}
                                className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'trending'
                                    ? 'bg-[#2D439B] text-white'
                                    : 'text-[#3A3D46] dark:text-white'
                                    }`}
                            >
                                Trending
                            </button>
                            <button
                                onClick={() => setActiveTab('recent')}
                                className={`px-4 py-1 rounded-full text-[10px] cursor-pointer transition-all ${activeTab === 'recent'
                                    ? 'bg-[#2D439B] text-white'
                                    : 'text-[#3A3D46] dark:text-white'
                                    }`}
                            >
                                Recent
                            </button>
                        </div>
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