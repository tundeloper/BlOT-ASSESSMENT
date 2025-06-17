'use client'
import React from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';

interface Contributor {
    id: string;
    name: string;
    username: string;
    avatar: string;
    timestamp: string;
    isVerified?: boolean;
}

const Contributors = () => {
    const contributors: Contributor[] = [
        {
            id: '1',
            name: 'Marvin McKinney',
            username: '@marvins',
            avatar: 'https://ui-avatars.com/api/?name=Marvin+McKinney&background=2D439B&color=fff',
            timestamp: '23 Aug at 4:21pm',
            isVerified: true,
        },
        {
            id: '2',
            name: 'Albert Flores',
            username: '@marvins',
            avatar: 'https://ui-avatars.com/api/?name=Albert+Flores&background=9A1B39&color=fff',
            timestamp: '23 Aug at 4:21pm',
            isVerified: false,
        },
        {
            id: '3',
            name: 'Dianne Russell',
            username: '@marvins',
            avatar: 'https://ui-avatars.com/api/?name=Dianne+Russell&background=6A2B70&color=fff',
            timestamp: '23 Aug at 4:21pm',
            isVerified: false,
        },
        {
            id: '4',
            name: 'Marvin McKinney',
            username: '@marvins',
            avatar: 'https://ui-avatars.com/api/?name=Marvin+McKinney&background=FF6B35&color=fff',
            timestamp: '23 Aug at 4:21pm',
            isVerified: false,
        },
    ];

    return (
        <div className="bg-white dark:bg-[#121212] rounded shadow-sm p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] font-medium text-[#1E1E1E] dark:text-white">
                    Top Contributors
                </h2>
                <button className="text-[13px] font-medium text-[#2D439B] hover:underline">
                    See all
                </button>
            </div>

            <div className="flex flex-col gap-2.5">
                {contributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-center gap-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={contributor.avatar}
                                alt={contributor.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1 w-[122px]">
                                <span className="text-[13px] font-normal text-[#1E1E1E] truncate dark:text-white">
                                    {contributor.name}
                                </span>
                                {contributor.isVerified && (
                                    <MdVerified className="w-4 h-4 text-[#2D439B] flex-shrink-0" />
                                )}
                            </div>

                            <div className="flex items-end gap-2">
                                <span className="text-[10px] font-normal text-[#3A3D46] dark:text-white">
                                    {contributor.username}
                                </span>
                                <span className="text-[8px] font-normal text-[#3A3D46] dark:text-white">
                                    {contributor.timestamp}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contributors;