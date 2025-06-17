'use client'
import React from 'react';
import Image from 'next/image';
import { RxDot } from 'react-icons/rx';

const ScoreItem: React.FC<{ livescore: Livescore }> = ({ livescore }) => {
    return (
        <div className="border border-[#D9D9D9] rounded p-4 flex flex-col gap-7 w-full">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-[#3A3D46]">
                        {'Week 14'}
                    </span>
                    <span className="text-[13px] font-normal text-[#7A7F8C]">
                        {livescore?.date}
                    </span>
                </div>

                {livescore?.status === 'live' && (
                    <div className="bg-[#9A1B39] border border-[#9A1B39] rounded-full px-2 py-0.5 flex items-center gap-0.5">
                        <RxDot className="w-2.5 h-2.5 text-white" />
                        <span className="text-[8px] font-normal text-white">
                            {livescore?.elapsed}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <Image
                        src={livescore?.teams?.home?.logo}
                        alt={livescore?.teams?.home?.name}
                        width={70}
                        height={70}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-[20px] font-semibold text-[#1E1E1E] text-center">
                        {Number(livescore?.score?.halftime?.home) + Number(livescore?.score?.fulltime?.home)}   :   {Number(livescore?.score?.halftime?.away) + Number(livescore?.score?.fulltime?.away)}
                    </span>
                    <span className="text-[10px] font-normal text-[#3A3D46] text-center">
                        {livescore?.venue?.name}
                    </span>
                </div>

                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <Image
                        src={livescore?.teams?.away?.logo}
                        alt={livescore?.teams?.away?.name}
                        width={70}
                        height={70}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <button className="w-full border border-[#D9D9D9] rounded py-1.5 px-4 text-[14px] font-normal text-[#7A7F8C] hover:bg-gray-50 transition-colors">
                View Match Stats
            </button>
        </div>
    );
};

export default ScoreItem;