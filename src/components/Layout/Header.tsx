import React from 'react';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageDetail } from 'react-icons/bi';
import Image from 'next/image';
import logo from '@/assets/logo2.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authstore';
import Link from 'next/link';

const Header: React.FC<{ onSidebarOpen: () => void }> = ({ onSidebarOpen }) => {
  const {theme} = useTheme()
  const {user} = useAuthStore()
  return (
    <header className="bg-white h-[72px] dark:bg-[#121212] px-4 md:px-8 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <GiHamburgerMenu color={theme === "dark" ? "white" : "#3A3D46"} onClick={onSidebarOpen} className='cursor-pointer w-6 h-6 md:w-8 md:h-8' />
        <Link href="/feed" className="w-8 h-6 md:w-12 md:h-8">
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sportlaze"
              className="hidden md:block w-[282px] h-[36px] px-4 py-1 border border-[#F9FAFB] rounded-[4px] text-sm placeholder-[#7A7F8C] text-[#7A7F8C] focus:outline-none focus:border-blue-500"
            />
            <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A7F8C] text-lg" />
          </div>
        </div>
        <div className="relative p-1 cursor-pointer">
          <BiMessageDetail size={24} className="text-[#3A3D46] dark:text-white" />
        </div>

        <div className="relative p-1 cursor-pointer">
          <IoMdNotificationsOutline size={24} className="text-[#3A3D46] dark:text-white" />
          <span className="absolute -top-2 -right-2 bg-[#FF4D4F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            99
          </span>
        </div>

        <div className="p-1 cursor-pointer hidden md:block">
          <IoSettingsOutline size={24} className="text-[#3A3D46] dark:text-white" />
        </div>

        <div className="hidden md:block w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
          <Image src={user?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.trim() || 'Anonymous')}`} alt="profile" width={40} height={40} />
        </div>
      </div>
    </header>
  );
};

export default Header;