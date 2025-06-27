'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { getLounge, getLoungeTopMembers } from '@/api/lounges';
import { User } from '@/types/auth';
import { CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

const Contributors = () => {
    const [contributors, setContributors] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        const fetchContributors = async () => {
            setLoading(true);
            const loungeResponse = await getLounge(slug as string);
            if (loungeResponse.success) {
                const response = await getLoungeTopMembers(loungeResponse.data?.id || 0);
                if (response.success) {
                    setContributors(response.data?.contributors || []);
                } else {
                    console.log(response);
                }
            } else {
                console.log(loungeResponse);
            }
            setLoading(false);
        };
        fetchContributors();
    }, [slug]);

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

            {
                loading ? (
                    <div className="flex justify-center items-center h-full py-4">
                        <CircularProgress size={40} sx={{ color: '#2D439B' }} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {contributors.map((contributor, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={contributor.profile_picture}
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
                                        {contributor.is_verified && (
                                            <MdVerified className="w-4 h-4 text-[#2D439B] flex-shrink-0" />
                                        )}
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <span className="text-[10px] font-normal text-[#3A3D46] dark:text-white">
                                            {contributor.username}
                                        </span>
                                        <span className="text-[8px] font-normal text-[#3A3D46] dark:text-white">
                                            {contributor.created_at}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Contributors;