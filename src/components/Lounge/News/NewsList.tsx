'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import backIcon from '@/assets/backIcon.png'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getLoungeNav } from '@/utils/lounge'
import { getLounge, joinLounge } from '@/api/lounges'
import { CircularProgress } from '@mui/material'
import { useTheme } from '@/context/ThemeContext'
import { BiSort } from 'react-icons/bi'
import { IoChevronDown } from 'react-icons/io5'

const NewsList = () => {
    const { theme } = useTheme()
    const [lounge, setLounge] = useState<Lounge | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { slug } = useParams()
    const pathname = usePathname()
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Most Active');
    const navItems = getLoungeNav(pathname, slug as string);

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

    const handleSort = (option: string) => {
        setSelectedSort(option);
        setShowDropdown(false);
    };

    return (
        <div className='flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4'>
            <div className='flex justify-between items-center'>
                <Image src={backIcon} alt='back' width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''} cursor-pointer hidden md:block`} onClick={() => router.back()} />
                <div className='flex justify-end items-center w-full md:w-auto'>
                    <div className='relative'>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-[#3A3D46] dark:text-white text-sm font-normal cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                            <BiSort className="w-4 h-4" />
                            <p className='text-[13px] text-nowrap'>Sort by</p>
                            <IoChevronDown className="w-4 h-4" />
                        </button>
                        <div className="relative">
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-[145px] bg-white dark:bg-[#23262F] rounded shadow-lg border border-[#F0F0F0] dark:border-[#23262F] z-50">
                                    {['Most Active', 'Newest', 'Popular', 'Recommended'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleSort(option)}
                                            className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212] ${selectedSort === option ? 'font-semibold' : ''}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
            <div>
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <NewsItem key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default NewsList

export const NewsItem = () => {
    const router = useRouter()
    const { slug } = useParams()


    const handleReadMore = () => {
        router.push(`/lounge/${slug}/news/1`)
    }

    return (
        <div className="flex gap-2 md:gap-4 w-full items-start py-3 border-b border-[#F0F0F0] dark:border-[#23262F]">
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {/* Replace with actual image */}
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-medium text-[13px] md:text-[16px] text-[#3A3D46] dark:text-white leading-snug" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    Lionel Messi Wins 8th Ballon d&apos;Or, Cementing His GOAT Legacy
                </h3>
                <div className="flex items-center gap-1 text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    <span>Published 2 hrs ago</span>
                    <span className="mx-1">
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" />
                        </svg>
                    </span>
                    <span>ESPN</span>
                </div>
                <p className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white mt-1" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    Lionel Messi has made history once again by securing his 8th Ballon d&apos;Or title in Paris, surpassing all records and intensifying the debate about the greatest footballer of all time... <span onClick={handleReadMore} className='text-[#2D439B] cursor-pointer'>Read more</span>
                </p>
            </div>
        </div>
    )
}