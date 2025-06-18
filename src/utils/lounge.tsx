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
import { IoTvOutline } from 'react-icons/io5';


export const getLoungeNav = (pathname: string, slug: string) => {
    const navItems: NavItem[] = [
        {
            id: 'live-score',
            label: 'Live Score',
            icon: <MdOutlineScoreboard className="w-5 h-5" />,
            path: `/lounge/${slug}/livescore`,
            isSelected: `/lounge/${slug}/livescore` === pathname
        },
        {
            id: 'channels',
            label: 'Channels',
            icon: <IoTvOutline className="w-5 h-5" />,
            path: `/lounge/${slug}/channels`,
            isSelected: `/lounge/${slug}/channels` === pathname
        },
        {
            id: 'predictions',
            label: 'Predictions',
            icon: <HiOutlineChartBar className="w-5 h-5" />,
            path: `/lounge/${slug}/predictions`,
            isSelected: `/lounge/${slug}/predictions` === pathname
        },
        {
            id: 'sport-dating',
            label: 'Sport Dating',
            icon: <HiOutlineHeart className="w-5 h-5" />,
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
            path: `/lounge/${slug}/news`,
            isSelected: `/lounge/${slug}/news` === pathname
        },
        {
            id: 'challenges',
            label: 'Challenges',
            icon: <HiOutlineFire className="w-5 h-5" />,
            path: `/lounge/${slug}/challenges`,
            isSelected: `/lounge/${slug}/challenges` === pathname
        },
        {
            id: 'league-info',
            label: 'League information',
            icon: <MdOutlineEmojiEvents className="w-5 h-5" />,
            path: `/lounge/${slug}/league`,
            isSelected: `/lounge/${slug}/league` === pathname
        },
    ];

    return navItems;
}