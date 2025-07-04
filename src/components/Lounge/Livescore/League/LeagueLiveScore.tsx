'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import backIcon from '@/assets/backIcon.png'
import ScoreLeague from '../ScoreLeague'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getLoungeNav } from '@/utils/lounge'
import { getLounge, joinLounge } from '@/api/lounges'
import { CircularProgress } from '@mui/material'
import { useTheme } from '@/context/ThemeContext'

const LeagueLiveScore = () => {
    const { theme } = useTheme()
    const [lounge, setLounge] = useState<Lounge | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { slug } = useParams()
    const pathname = usePathname()
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

    return (
        <div className='flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4'>
            <button className='cursor-pointer hidden md:block' onClick={() => router.back()}>
                <Image src={backIcon} alt='back' width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''}`} />
            </button>
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
                <ScoreLeague leagueName='Premier League' country='England' leagueLogo='https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32' />
            </div>
        </div>
    )
}

export default LeagueLiveScore