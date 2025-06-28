'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getLounges, getUserLounges, joinLounge } from '@/api/lounges';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

const Lounge = () => {
  const [userLounges, setUserLounges] = useState<Lounge[]>([]);
  const [allLounges, setAllLounges] = useState<Lounge[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchLounges = async () => {
      setLoading(true);
      const response = await getUserLounges();
      if (response.success) {
        setUserLounges(response.data || []);
        if ((response.data?.length || 0) < 1) {
          const allLoungesResponse = await getLounges();
          if (allLoungesResponse.success) {
            setAllLounges(allLoungesResponse.data || []);
          }
        }
      } else {
        console.log(response);
      }
      setLoading(false);
    };
    fetchLounges();
  }, []);

  return (
    <div className="bg-white rounded flex flex-col w-full dark:bg-[#121212] transition-colors duration-300">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          My Lounges
        </h2>
        <button className="text-[13px] font-medium text-white cursor-pointer">
          See all
        </button>
      </div>

      <>
        {
          loading ? (
            <div className="flex justify-center items-center h-full py-4">
              <CircularProgress size={40} sx={{ color: '#2D439B' }} />
            </div>
          ) : (
            <>
              {
                userLounges.length > 0 ? (
                  <div className="flex flex-col">
                    {userLounges.map((lounge, index) => (
                      <div
                        key={lounge.name}
                        className={`flex justify-between items-center px-4 py-2.5 cursor-pointer ${index !== userLounges.length - 1 ? 'border-b border-[#D9D9D9]' : ''
                          }`}
                        onClick={() => router.push(`/lounge/${lounge.slug}/trending`)}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
                            {lounge.name}
                          </span>
                          <span className="text-[12px] text-[#3A3D46] dark:text-[#C9CDD4]">
                            {lounge.member_count} members
                          </span>
                        </div>

                        <div className="flex items-center">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded-full border border-gradient-to-b from-[#2D439B] to-[#9A1B39] ${i !== 0 ? '-ml-2' : ''
                                }`}
                            >
                              <Image
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lounge.name.trim())}`}
                                alt={`${lounge.name} profile ${i + 1}`}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <LoungePending lounges={allLounges} />
                )
              }
            </>
          )
        }
      </>
    </div>
  );
};

export default Lounge;

export const LoungePending: React.FC<{ lounges: Lounge[] }> = ({ lounges }) => {
  const [loading, setLoading] = useState(false);
  const handleJoin = async (lounge: Lounge) => {
    console.log(lounge);
    setLoading(true);
    const response = await joinLounge(lounge.id);
    if (response.success) {
      setLoading(false);
      enqueueSnackbar('Lounge joined successfully', { variant: 'success' });
    } else {
      console.log(response);
      enqueueSnackbar('Failed to join lounge', { variant: 'error' });
    }

  }

  return (
    <div className="bg-white rounded flex flex-col w-full dark:bg-[#121212] transition-colors duration-300">
      <div className="flex flex-col">
        <div className="flex justify-center px-4 py-2">
          <p className="text-[13px] font-medium text-[#3A3D46] text-center">
            Join lounges to stay updated and meet fellow fans!
          </p>
        </div>

        {lounges.map((lounge, index) => (
          <div
            key={lounge.name}
            className={`flex justify-between items-center px-4 py-2.5 ${index !== lounges.length - 1 ? 'border-b border-[#D9D9D9]' : ''
              }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[#1E1E1E]">
                {lounge.name}
              </span>
              <span className="text-[12px] text-[#3A3D46]">
                {lounge.member_count} members
              </span>
            </div>

            <button
              className="bg-[#2D439B] text-white text-[10px] font-medium px-4 py-1 rounded shadow-[0px_2px_0px_0px_rgba(0,0,0,0.04)] cursor-pointer"
              onClick={() => handleJoin(lounge)}
            >
              {loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};