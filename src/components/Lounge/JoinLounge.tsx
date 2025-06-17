'use client'
import React, { useEffect, useState } from 'react'
import { getLounge, joinLounge } from '@/api/lounges';
import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const JoinLounge = () => {
    const [lounge, setLounge] = useState<Lounge | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        const fetchLounge = async () => {
            setLoading(true);
            const response = await getLounge(slug as string);
            if (response.success) {
                setLounge(response.data);
            } else {
                console.log(response);
            }
            setLoading(false);
        };
        fetchLounge();
    }, [slug]);

    const handleJoinLounge = async () => {
        if (lounge?.id) {
            setIsJoining(true);
            const response = await joinLounge(lounge.id);
            if (response.success) {
                setLounge(response.data);
            } else {
                console.log(response);
            }
            setIsJoining(false);
        }
    }

    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] shadow p-4 flex flex-col items-center gap-4 w-full max-w-xs">
            {
                loading ? (
                    <div className="flex justify-center items-center h-full py-4">
                        <CircularProgress size={40} sx={{ color: '#2D439B' }} />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-1 w-full">
                            <span className="text-[13px] font-medium text-[#2D439B] w-full text-center dark:text-white">
                                {lounge?.name} Lounge
                            </span>
                            <span className="text-[13px] font-normal text-[#3A3D46] w-full text-center dark:text-white">
                                {lounge?.description}
                            </span>
                        </div>
                        <button
                            className="w-full py-2 px-4 bg-[#2D439B] text-white rounded-[4px] text-[14px] font-normal cursor-pointer shadow-sm hover:bg-[#22337a] transition dark:bg-[#2D439B] dark:hover:bg-[#22337a] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isJoining}
                            onClick={handleJoinLounge}
                        >
                            {isJoining ? 'Joining...' : 'Join Lounge'}
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default JoinLounge