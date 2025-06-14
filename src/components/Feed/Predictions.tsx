'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'

interface VotingOption {
  name: string;
  votes: number;
  isSelected?: boolean;
}

const Predictions = () => {
  const [options, setOptions] = useState<VotingOption[]>([
    { name: 'Chelsea', votes: 25 },
    { name: 'Draw', votes: 10 },
    { name: 'ManCity', votes: 65 }
  ]);

  const handleVote = (index: number) => {
    setOptions(options.map((option, i) => ({
      ...option,
      isSelected: i === index
    })));
  };

  return (
    <div className="bg-white rounded flex flex-col w-full p-4 gap-4 dark:bg-[#121212] transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-medium text-[#1E1E1E] dark:text-white">
          Predictions
        </h2>
        <button className="text-[13px] text-[#2D439B] cursor-pointer">
          Visit channel
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-center items-center gap-6">
          <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
            <Image src={logo} alt="Chelsea" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="text-[16px] font-medium bg-gradient-to-b from-[#2D439B] via-[#6A2B70] to-[#9A1B39] text-transparent bg-clip-text">
            Vs
          </span>
          <div className="w-10 h-10 rounded-full shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] bg-white">
            <Image src={logo} alt="Manchester City" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
        <span className="text-[10px] font-medium text-[#9A1B39]">
          Sunday, 20 October
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-medium text-[#3A3D46] dark:text-[#C9CDD4]">
          Voting options
        </span>
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <div key={option.name} className="flex items-center gap-2.5 w-full">
              <button
                onClick={() => handleVote(index)}
                className={`w-4 h-4 rounded-full border ${
                  option.isSelected
                    ? 'border-[#1890FF] bg-[#1890FF]'
                    : 'border-[#D9D9D9]'
                } relative`}
              >
                {option.isSelected && (
                  <div className="absolute inset-0 m-1 rounded-full bg-white" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#3A3D46] dark:text-[#C9CDD4]">{option.name}</span>
                  <span className="text-[8px] text-[#2D439B]">[{option.votes}% votes]</span>
                </div>
                <div className="h-1.5 bg-[#E4E6EC] rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-[#2D439B] rounded-full transition-all duration-300"
                    style={{ width: `${option.votes}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#2D439B]" />
        <div className="w-2 h-2 rounded-full bg-[#E4E6EC]" />
        <div className="w-2 h-2 rounded-full bg-[#E4E6EC]" />
      </div>
    </div>
  );
}

export default Predictions