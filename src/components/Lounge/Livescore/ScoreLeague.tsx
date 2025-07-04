'use client'
import React from 'react';
import Image from 'next/image';
import { RxDot } from 'react-icons/rx';
import ScoreItem from './ScoreItem';
import { usePathname, useRouter } from 'next/navigation';

interface ScoreLeagueProps {
    leagueName: string;
    country: string;
    leagueLogo: string;
    isLive?: boolean;
}

const ScoreLeague: React.FC<ScoreLeagueProps> = ({
    leagueName = "Premier League",
    country = "English",
    leagueLogo = "https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32",
    isLive = true,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const livescore: Livescore = {
        id: 1,
        date: '2025-06-17',
        status: 'live',
        elapsed: 90,
        league: {
            id: 1,
            name: 'Premier League',
            country: 'England',
            logo: 'https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32',
            flag: 'https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32',
        },
        goals: {
            home: 2,
            away: 1,
        },
        teams: {
            home: {
                id: 1,
                name: 'Arsenal',
                logo: 'https://ui-avatars.com/api/?name=A&background=DC143C&color=fff&size=70',
            },
            away: {
                id: 2,
                name: 'Manchester City',
                logo: 'https://ui-avatars.com/api/?name=MC&background=0047AB&color=fff&size=70',
            },
        },
        score: {
            halftime: {
                home: 1,
                away: 0,
            },
            fulltime: {
                home: 2,
                away: 1,
            },
            extratime: {
                home: 0,
                away: 0,
            },
            penalty: {
                home: 0,
                away: 0,
            },
        },
        venue: {
            id: 1,
            name: 'Emirates Stadium',
            city: 'London',
        },
    }


    const onViewAll = () => {
        router.push(`${pathname}/${leagueName}`);
    }

    return (
        <div className='mb-4'>
            <div className="flex justify-between items-center w-full px-0.5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded overflow-hidden bg-white">
                        <Image
                            src={leagueLogo}
                            alt={leagueName}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex items-start gap-2">
                        <div className="flex flex-col">
                            <span className="text-[16px] font-medium text-[#1E1E1E] dark:text-white">
                                {leagueName}
                            </span>
                            <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white">
                                {country}
                            </span>
                        </div>

                        {isLive && (
                            <div className="border border-[#9A1B39] rounded-full px-2 py-0.5 flex items-center gap-1 mt-1">
                                <RxDot className="w-2.5 h-2.5 text-[#9A1B39]" />
                                <span className="text-[10px] font-normal text-[#3A3D46] dark:text-white">
                                    Live
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={onViewAll}
                    className="text-[13px] font-normal text-[#2D439B] dark:text-white hover:underline cursor-pointer"
                >
                    View All
                </button>
            </div>

            <div className="flex gap-2 mt-4 w-full">
                <ScoreItem livescore={livescore} />
                <ScoreItem livescore={livescore} />
            </div>
        </div>
    );
};

export default ScoreLeague;