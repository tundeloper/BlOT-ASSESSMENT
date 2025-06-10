import React from 'react'
import Image from 'next/image'
import { SiPremierleague } from 'react-icons/si'
import logo from '@/assets/logo.png'

interface GoalScorer {
  name: string;
  minute: string;
}

interface Team {
  score: number;
  scorers: GoalScorer[];
}

const Livescore = () => {
  const chelsea: Team = {
    score: 2,
    scorers: [
      { name: 'Cole palmer', minute: '40' },
      { name: 'Nickolas Jackson', minute: '15' }
    ]
  };

  const manCity: Team = {
    score: 4,
    scorers: [
      { name: 'Phil foden', minute: '02' },
      { name: 'Bernando silver', minute: '10' },
      { name: 'Phil foden', minute: '15' },
      { name: 'Phil foden', minute: '18' }
    ]
  };

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
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center items-center w-full gap-16">
            <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
              <Image src={logo} alt="Chelsea" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
              <Image src={logo} alt="Manchester City" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center w-[58px]">
            <SiPremierleague size={24} className="text-[#1E1E1E]" />
            <span className="text-[13px] font-semibold text-[#1E1E1E] text-center">
              2nd half
            </span>
            <span className="text-[10px] font-extrabold bg-gradient-to-r from-[#2D439B] via-[#6A2B70] to-[#9A1B39] text-transparent bg-clip-text">
              50:14
            </span>
          </div>

          <div className="flex justify-center w-full gap-8">
            <div className="flex flex-col items-center gap-1 w-[97px]">
              <div className="flex justify-center items-center px-1.5 bg-[#F9FAFB] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] rounded">
                <span className="text-[16px] text-[#3A3D46]">{chelsea.score}</span>
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                {chelsea.scorers.map((scorer, index) => (
                  <span key={index} className="text-[10px] text-[#3A3D46]">
                    {scorer.name}, {scorer.minute}&apos;
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 w-[97px]">
              <div className="flex justify-center items-center px-1.5 bg-[#F9FAFB] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] rounded">
                <span className="text-[16px] text-[#3A3D46]">{manCity.score}</span>
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                {manCity.scorers.map((scorer, index) => (
                  <span key={index} className="text-[10px] text-[#3A3D46]">
                    {scorer.name}, {scorer.minute}&apos;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          <div className="w-2 h-2 rounded-full bg-[#2D439B]" />
          <div className="w-2 h-2 rounded-full bg-[#E4E6EC]" />
          <div className="w-2 h-2 rounded-full bg-[#E4E6EC]" />
        </div>
      </div>
    </div>
  );
}

export default Livescore