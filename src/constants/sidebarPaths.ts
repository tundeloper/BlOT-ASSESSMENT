import { AiOutlineHome } from 'react-icons/ai';
import { BiTrendingUp, BiMessageDetail } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineVerified, MdOutlineHelpOutline } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { TiMessages } from 'react-icons/ti';
import { IconType } from 'react-icons';

export interface SidebarPath {
  label: string;
  path: string;
  icon: IconType;
  section?: 'main' | 'bottom';
  color?: string;
}

export const sidebarPaths: SidebarPath[] = [
  {
    label: 'Home',
    path: '/feed',
    icon: AiOutlineHome,
    section: 'main'
  },
  {
    label: 'Trending',
    path: '/trending',
    icon: BiTrendingUp,
    section: 'main'
  },
  {
    label: 'Lounges',
    path: '/lounges',
    icon: TiMessages,
    section: 'main'
  },
  {
    label: 'Channels',
    path: '/channels',
    icon: BiMessageDetail,
    section: 'main'
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: CgProfile,
    section: 'main'
  },
  {
    label: 'Bookmarks',
    path: '/bookmarks',
    icon: BsBookmarkFill,
    section: 'main'
  },
  {
    label: 'Verification',
    path: '/verification',
    icon: MdOutlineVerified,
    section: 'main'
  },
  {
    label: 'Monetization',
    path: '/monetization',
    icon: RiMoneyDollarCircleLine,
    section: 'main'
  },
  {
    label: 'Accounts',
    path: '/accounts',
    icon: HiOutlineUserGroup,
    section: 'bottom'
  },
  {
    label: 'Help Center',
    path: '/help',
    icon: MdOutlineHelpOutline,
    section: 'bottom'
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: IoSettingsOutline,
    section: 'bottom'
  },
  {
    label: 'Logout',
    path: '/auth/login',
    icon: TbLogout2,
    section: 'bottom',
    color: '#FF4D4F'
  }
]; 