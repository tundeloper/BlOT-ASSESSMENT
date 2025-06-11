'use client'
import React from 'react';
import { Drawer } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { sidebarPaths } from '@/constants/sidebarPaths';
import { BsChevronLeft } from 'react-icons/bs';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const mainPaths = sidebarPaths.filter(path => path.section === 'main');
    const bottomPaths = sidebarPaths.filter(path => path.section === 'bottom');
      const { toggleTheme } = useTheme();
    

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            variant="temporary"
            sx={{
                width: 207,
                backgroundColor: 'white',
            }}
        >
            <div className="flex flex-col h-full">
                {/* Header with user info */}
                <div className="p-[16px_13px] border-b border-[#F0F0F0] flex items-center gap-4">
                    <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                        <Image
                            src="/images/profile.png"
                            alt="Profile"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div>
                        <div className="text-[13px] text-[#1E1E1E]">
                            Chinagozie Anyanwu
                        </div>
                        <div className="text-[10px] font-medium text-[#7A7F8C]">
                            @china123
                        </div>
                    </div>
                </div>

                {/* Main navigation */}
                <nav className="flex-1">
                    <ul className="pt-0">
                        {mainPaths.map((path) => (
                            <li
                                key={path.path}
                                onClick={() => {
                                    router.push(path.path);
                                    onClose();
                                }}
                                className={`h-10 px-4 cursor-pointer flex items-center gap-2 ${
                                    pathname === path.path
                                        ? 'bg-[#2D439B]'
                                        : 'hover:bg-black/[0.04]'
                                }`}
                            >
                                <span className="min-w-[32px]">
                                    <path.icon
                                        size={18}
                                        color={pathname === path.path ? '#FFFFFF' : '#3A3D46'}
                                    />
                                </span>
                                <span
                                    className={`text-sm font-[Roboto] ${
                                        pathname === path.path ? 'text-white' : 'text-[#1E1E1E]'
                                    }`}
                                >
                                    {path.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom navigation */}
                <div className="border-t border-[#F0F0F0]">
                    <ul className="pt-0">
                        {bottomPaths.map((path) => (
                            <li
                                key={path.path}
                                onClick={() => {
                                    router.push(path.path);
                                    onClose();
                                }}
                                className="h-10 px-4 cursor-pointer flex items-center gap-2 hover:bg-black/[0.04]"
                            >
                                <span className="min-w-[32px]">
                                    <path.icon
                                        size={18}
                                        color={path.color || '#3A3D46'}
                                    />
                                </span>
                                <span
                                    className="text-sm font-[Roboto]"
                                    style={{ color: path.color || '#1E1E1E' }}
                                >
                                    {path.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Collapse button */}
                <div
                    className="mt-auto p-[10px_16px] bg-[#E4E6EC] border-t border-[#F0F0F0] flex items-center cursor-pointer"
                    onClick={() => {toggleTheme(); onClose()}}
                >
                    <BsChevronLeft size={16} color="#3A3D46" />
                </div>
            </div>
        </Drawer>
    );
};

export default Sidebar;