import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';

interface LoungeItem {
  name: string;
  activeUsers: string;
  profiles: string[];
}

const lounges: LoungeItem[] = [
  {
    name: 'Soccer',
    activeUsers: '45k Active',
    profiles: [logo.src, logo.src, logo.src]
  },
  {
    name: 'Basketball',
    activeUsers: '35k Active',
    profiles: [logo.src, logo.src, logo.src]
  },
  {
    name: 'The NFL',
    activeUsers: '25k Active',
    profiles: [logo.src, logo.src, logo.src]
  },
  {
    name: 'Hockey',
    activeUsers: '15k Active',
    profiles: [logo.src, logo.src, logo.src]
  }
];

const Lounge = () => {
  return (
    <div className="bg-white rounded flex flex-col w-full">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          My Lounges
        </h2>
        <button className="text-[13px] font-medium text-white cursor-pointer">
          See all
        </button>
      </div>

      <div className="flex flex-col">
        {lounges.map((lounge, index) => (
          <div
            key={lounge.name}
            className={`flex justify-between items-center px-4 py-2.5 ${
              index !== lounges.length - 1 ? 'border-b border-[#D9D9D9]' : ''
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-medium text-[#1E1E1E]">
                {lounge.name}
              </span>
              <span className="text-[12px] text-[#3A3D46]">
                {lounge.activeUsers}
              </span>
            </div>

            <div className="flex items-center">
              {lounge.profiles.map((profile, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border border-gradient-to-b from-[#2D439B] to-[#9A1B39] ${
                    i !== 0 ? '-ml-2' : ''
                  }`}
                >
                  <Image
                    src={profile}
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
    </div>
  );
};

export default Lounge;

export const LoungePending = () => {
  return (
    <div className="bg-white rounded flex flex-col w-full">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          My Lounges
        </h2>
        <button className="text-[13px] font-medium text-white cursor-pointer">
          See all
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center px-4 py-2">
          <p className="text-[13px] font-medium text-[#3A3D46] text-center">
            Join lounges to stay updated and meet fellow fans!
          </p>
        </div>

        {lounges.map((lounge, index) => (
          <div
            key={lounge.name}
            className={`flex justify-between items-center px-4 py-2.5 ${
              index !== lounges.length - 1 ? 'border-b border-[#D9D9D9]' : ''
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[#1E1E1E]">
                {lounge.name}
              </span>
              <span className="text-[12px] text-[#3A3D46]">
                {lounge.activeUsers}
              </span>
            </div>

            <button
              className="bg-[#2D439B] text-white text-[10px] font-medium px-4 py-1 rounded shadow-[0px_2px_0px_0px_rgba(0,0,0,0.04)]"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};