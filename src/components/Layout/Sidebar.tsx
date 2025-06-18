'use client'
import React from 'react';
import { Drawer } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { sidebarPaths } from '@/constants/sidebarPaths';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authstore';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { logout, user } = useAuthStore()
    const mainPaths = sidebarPaths.filter(path => path.section === 'main');
    const bottomPaths = sidebarPaths.filter(path => path.section === 'bottom');
    const { toggleTheme, theme } = useTheme();


    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: "207px",
                    backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
                },
            }}
        >
            <div className="flex flex-col h-full">
                <div className="p-[16px_13px] border-b border-[#F0F0F0] flex items-center gap-4">
                    <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                        <Image
                            src={user?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.trim() || 'Anonymous')}`}
                            alt="Profile"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div>
                        <div className="text-[13px] text-[#1E1E1E] dark:text-white">
                            {user?.name || 'Anonymous'}
                        </div>
                        <div className="text-[10px] font-medium text-[#7A7F8C] dark:text-gray-400">
                            @{user?.username || 'Anonymous'}
                        </div>
                    </div>
                </div>

                <nav className="flex-1">
                    <ul className="pt-0">
                        {mainPaths.map((path) => (
                            <li
                                key={path.path}
                                onClick={() => {
                                    router.push(path.path);
                                    onClose();
                                }}
                                className={`h-10 px-4 cursor-pointer flex items-center gap-2 ${pathname === path.path
                                    ? 'bg-[#2D439B]'
                                    : 'hover:bg-black/[0.04]'
                                    }`}
                            >
                                <span className="min-w-[32px]">
                                    <path.icon
                                        size={18}
                                        className={`text-[#3A3D46] dark:text-white ${pathname === path.path ? 'text-white' : ''}`}
                                    />
                                </span>
                                <span
                                    className={`text-sm font-[Roboto] ${pathname === path.path ? 'text-white' : 'text-[#1E1E1E] dark:text-white'
                                        }`}
                                >
                                    {path.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="border-t border-[#F0F0F0]">
                    <ul className="pt-0">
                        {bottomPaths.map((path) => (
                            <li
                                key={path.path}
                                onClick={() => {
                                    if (path.path === "/auth/login") {
                                        logout()
                                    }
                                    router.push(path.path);
                                    onClose();
                                }}
                                className="h-10 px-4 cursor-pointer flex items-center gap-2 hover:bg-black/[0.04]"
                            >
                                <span className="min-w-[32px]">
                                    <path.icon
                                        size={18}
                                        className='text-[#3A3D46] dark:text-white'
                                    />
                                </span>
                                <span
                                    className="text-sm font-[Roboto] dark:text-white"
                                >
                                    {path.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className="mt-auto p-[10px_16px] bg-[#E4E6EC] border-t border-[#F0F0F0] dark:bg-gray-800 flex items-center cursor-pointer"
                    onClick={() => { toggleTheme(); onClose() }}
                >
                    {theme === 'dark' ? <LuSun size={16} color="#FFFFFF" /> : <LuMoon size={16} color="#3A3D46" />}
                </div>
            </div>
        </Drawer>
    );
};

export default Sidebar;