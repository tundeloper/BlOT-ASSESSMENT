'use client'
import React from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { getLoungeNav } from '@/utils/lounge';

const LoungeNav = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { slug } = useParams()

    const navItems = getLoungeNav(pathname, slug as string);

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
                                : 'text-[#3A3D46] dark:text-white'
                            }
                        `}
                    >
                        <div className={`${item.isSelected ? 'text-[#2D439B]' : 'text-[#3A3D46] dark:text-white'}`}>
                            {item.icon}
                        </div>

                        <div className="flex-1 flex items-center justify-between">
                            <span className={`text-[13px] font-normal ${item.isSelected ? 'text-[#2D439B]' : 'text-[#3A3D46] dark:text-white'}`}>
                                {item.label}
                            </span>

                            {!item.isSelected && (
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