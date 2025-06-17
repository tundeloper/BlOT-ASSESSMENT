'use client'
import React from 'react'
import { BiSolidHome } from 'react-icons/bi'
import { IoMdVideocam } from 'react-icons/io'
import { IoAddOutline } from 'react-icons/io5'
import { PiCouchLight, PiSparkleFill } from 'react-icons/pi'
import { FiTv } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const BottomNav = () => {
    const pathname = usePathname()

    const navItems = [
        { icon: BiSolidHome, label: 'Home', path: '/feed', isActive: pathname === '/feed' },
        { icon: IoMdVideocam, label: 'Video', path: '/trending', isActive: pathname === '/trending' },
        { icon: IoAddOutline, label: 'Add', path: '/create', isActive: pathname === '/create' },
        { icon: PiCouchLight, label: 'Lounge', path: '/lounge', isActive: pathname.includes('/lounge') },
        { icon: FiTv, label: 'Channel', path: '/channel', isActive: pathname === '/channel' }
    ]

    return (
        <nav className="fixed bottom-3 left-0 right-0 z-50">
            <div className="mx-auto max-w-[360px] rounded-[25px] bg-white dark:bg-[#121212] p-1.5 shadow-lg flex items-center justify-between">
                <div className="flex items-center justify-between rounded-[25px] bg-[#E4E6EC] dark:bg-[#1E1E1E] h-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-0.5 h-full rounded-[25px] px-4 py-1 transition-all ${item.isActive
                                ? 'bg-[#2D439B] text-white'
                                : 'text-[#3A3D46] dark:text-white'
                                }`}
                        >
                            <item.icon size={22} />
                            {item.isActive && (
                                <span className="text-sm font-normal">{item.label}</span>
                            )}
                        </Link>
                    ))}
                </div>
                <div className='flex items-center justify-center bg-[#E4E6EC] dark:bg-[#1E1E1E] rounded-full w-10 h-10 cursor-pointer'>
                    <PiSparkleFill size={22} className='text-[#2D439B]' />
                </div>
            </div>
        </nav>
    )
}

export default BottomNav