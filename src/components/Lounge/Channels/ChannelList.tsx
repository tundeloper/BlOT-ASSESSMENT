'use client'
import backIcon from '@/assets/backIcon.png'
import React, { useEffect, useState } from 'react'
import { BiSort } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { IoChevronDown } from 'react-icons/io5'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getLounge, joinLounge } from '@/api/lounges'
import { CircularProgress } from '@mui/material'
import { getLoungeNav } from '@/utils/lounge'
import YourChannels from './YourChannels'
import TopChannels from './TopChannels'
import { getLoungeChannels, getUserChannels } from '@/api/channels'

const ChannelList = () => {
    const [search, setSearch] = useState('');
    const { theme } = useTheme();
    const router = useRouter();
    const { slug } = useParams();
    const [lounge, setLounge] = useState<Lounge | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()
    const navItems = getLoungeNav(pathname, slug as string);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Most Active');
    const [userChannels, setUserChannels] = useState<Array<Channel> | null>(null);
    const [topChannels, setTopChannels] = useState<Array<Channel> | null>(null);

    const fetchUserChannels = async () => {
        const response = await getUserChannels();
        if (response.success) {
            setUserChannels(response.data);
        }
    }

    const fetchTopChannels = async (id: number) => {
        const response = await getLoungeChannels(id);
        if (response.success) {
            setTopChannels(response.data);
        }
    }

    useEffect(() => {
        const fetchLounge = async () => {
            setLoading(true);
            const response = await getLounge(slug as string);
            if (response.success) {
                setLounge(response.data);
                await Promise.all([fetchUserChannels(), fetchTopChannels(response.data?.id || 0)]);
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
            <div className='flex justify-between items-center'>
                <Image src={backIcon} alt='back' width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''} cursor-pointer hidden md:block`} onClick={() => router.back()} />
                <div className='flex justify-between items-center w-full md:w-auto'>
                    <div className="flex items-center gap-2 border border-[#D9D9D9] dark:border-[#23262F] rounded px-2 h-[24px] w-[200px] bg-inherit">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search channels"
                            className="bg-transparent h-full outline-none text-xs text-[#3A3D46] dark:text-white placeholder-[#7A7F8C] dark:placeholder-white flex-1 pl-1 border-r border-[#D9D9D9] dark:border-[#23262F]"
                        />
                        <HiOutlineSearch className="w-4 h-4 text-[#7A7F8C] dark:text-white" />
                    </div>
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
            {
                loading ? <div className='flex justify-center items-center h-full'><CircularProgress /></div> :
                    <div>
                        <YourChannels channels={userChannels || []} />
                        <TopChannels channels={topChannels || []} />
                    </div>
            }
        </div >
    )
}

export default ChannelList