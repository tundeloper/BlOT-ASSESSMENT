'use client'
import React from 'react';
import {
    MdOutlineScoreboard,
    MdOutlineVideoLibrary,
    MdOutlineNewspaper,
    MdOutlineEmojiEvents
} from 'react-icons/md';
import {
    HiOutlineChartBar,
    HiOutlineHeart,
    HiOutlineFire
} from 'react-icons/hi';
import { IoChevronForward, IoTvOutline } from 'react-icons/io5';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    hasSubmenu?: boolean;
    isSelected?: boolean;
    path: string
}

const LoungeNav = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { slug } = useParams()

    const navItems: NavItem[] = [
        {
            id: 'live-score',
            label: 'Live Score',
            icon: <MdOutlineScoreboard className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/livescore`,
            isSelected: `/lounge/${slug}/livescore` === pathname
        },
        {
            id: 'channels',
            label: 'Channels',
            icon: <IoTvOutline className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/channels`,
            isSelected: `/lounge/${slug}/channels` === pathname
        },
        {
            id: 'predictions',
            label: 'Predictions',
            icon: <HiOutlineChartBar className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/predictions`,
            isSelected: `/lounge/${slug}/predictions` === pathname
        },
        {
            id: 'sport-dating',
            label: 'Sport Dating',
            icon: <HiOutlineHeart className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/dating`,
            isSelected: `/lounge/${slug}/dating` === pathname
        },
        {
            id: 'trending-videos',
            label: 'Trending Videos',
            icon: <MdOutlineVideoLibrary className="w-5 h-5" />,
            hasSubmenu: false,
            path: `/lounge/${slug}/trending`,
            isSelected: `/lounge/${slug}/trending` === pathname
        },
        {
            id: 'sport-news',
            label: 'Sport News',
            icon: <MdOutlineNewspaper className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/news`,
            isSelected: `/lounge/${slug}/news` === pathname
        },
        {
            id: 'challenges',
            label: 'Challenges',
            icon: <HiOutlineFire className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/challenges`,
            isSelected: `/lounge/${slug}/challenges` === pathname
        },
        {
            id: 'league-info',
            label: 'League information',
            icon: <MdOutlineEmojiEvents className="w-5 h-5" />,
            hasSubmenu: true,
            path: `/lounge/${slug}/league`,
            isSelected: `/lounge/${slug}/league` === pathname
        },
    ];

    return (
        <div className="bg-white dark:bg-[#121212] rounded shadow-sm p-4 w-full">
            <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => router.push(item.path)}
                        className={`
                                    flex items-center gap-2.5 px-2 py-2.5 cursor-pointer rounded transition-all duration-200
                                    ${item.isSelected
                                ? 'bg-[#2D439B]/10 border-r-[3px] border-[#2D439B] text-[#2D439B]'
                                : 'text-[#3A3D46] hover:bg-gray-50 dark:text-white dark:hover:bg-gray-50'
                            }
                        `}
                    >
                        <div className={`${item.isSelected ? 'text-[#2D439B]' : 'text-[#3A3D46]'}`}>
                            {item.icon}
                        </div>

                        <div className="flex-1 flex items-center justify-between">
                            <span className={`text-[13px] font-normal ${item.isSelected ? 'text-[#2D439B]' : 'text-[#3A3D46] dark:text-white'}`}>
                                {item.label}
                            </span>

                            {item.hasSubmenu && (
                                <IoChevronForward className={`w-4 h-4 ${item.isSelected ? 'text-[#2D439B]' : 'text-[#3A3D46] dark:text-white'}`} />
                            )}
                        </div>

                        {item.isSelected && (
                            <div className="w-[3px] bg-[#2D439B] absolute right-0 h-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoungeNav;