'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getLivescore } from '@/api/livescore'
import { enqueueSnackbar } from 'notistack'
import { CircularProgress } from '@mui/material'

const Livescore = () => {
  const [livescore, setLivescore] = useState<Livescore[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeNum, setActiveNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeNum === (livescore?.length || 0) - 1) {
        setActiveNum(0);
      } else {
        setActiveNum((prev) => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [livescore?.length, activeNum]);

  useEffect(() => {
    const fetchLivescore = async () => {
      setLoading(true);
      const res = await getLivescore();
      if (res.success) {
        setLivescore(res.data?.matches || []);
      } else {
        enqueueSnackbar("Failed to fetch livescore", { variant: 'error' });
      }
      setLoading(false);
    }
    fetchLivescore();
  }, []);

  return (
    <div className="bg-white rounded flex flex-col w-full">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          Livescores
        </h2>
        <button className="text-[13px] font-normal text-white cursor-pointer">
          View all
        </button>
      </div>

      <div className="flex flex-col items-center px-4 py-4">
        {
          loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress size={40} sx={{ color: '#2D439B' }} />
            </div>
          ) : (
            livescore?.[activeNum] && <LivescoreItem livescore={livescore[activeNum]} key={livescore[activeNum].id} />
          )
        }
        <div className="flex items-center gap-1 mt-4">
          {livescore?.map((livescore, index) => (
            <div key={livescore.id} className={`w-2 h-2 rounded-full ${index === activeNum ? 'bg-[#2D439B]' : 'bg-[#E4E6EC]'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Livescore

const LivescoreItem = ({ livescore }: { livescore: Livescore }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center items-center w-full gap-16">
        <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
          <Image src={livescore?.teams?.home?.logo} width={40} height={40} alt="Chelsea" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
          <Image src={livescore?.teams?.away?.logo} width={40} height={40} alt="Manchester City" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col items-center w-[75px]">
        <Image src={livescore?.league?.logo} width={40} height={40} alt="Chelsea" className="w-[30px] h-[30px] object-contain" />
        <span className="text-[13px] font-semibold text-[#1E1E1E] text-center">
          {livescore?.status}
        </span>
        <span className="text-[10px] font-extrabold bg-gradient-to-r from-[#2D439B] via-[#6A2B70] to-[#9A1B39] text-transparent bg-clip-text">
          {livescore?.elapsed}
        </span>
      </div>

      <div className="flex justify-center w-full gap-8">
        <div className="flex flex-col items-center gap-1 w-[97px]">
          <div className="flex justify-center items-center px-1.5 bg-[#F9FAFB] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] rounded">
            <span className="text-[16px] text-[#3A3D46]">{Number(livescore?.score?.halftime?.home) + Number(livescore?.score?.fulltime?.home)}</span>
          </div>
          {/* <div className="flex flex-col gap-0.5 w-full">
            {chelsea.scorers.map((scorer, index) => (
              <span key={index} className="text-[10px] text-[#3A3D46]">
                {scorer.name}, {scorer.minute}&apos;
              </span>
            ))}
          </div> */}
        </div>

        <div className="flex flex-col items-center gap-1 w-[97px]">
          <div className="flex justify-center items-center px-1.5 bg-[#F9FAFB] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] rounded">
            <span className="text-[16px] text-[#3A3D46]">{Number(livescore?.score?.halftime?.away) + Number(livescore?.score?.fulltime?.away)}</span>
          </div>
          {/* <div className="flex flex-col gap-0.5 w-full">
            {manCity.scorers.map((scorer, index) => (
              <span key={index} className="text-[10px] text-[#3A3D46]">
                {scorer.name}, {scorer.minute}&apos;
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}