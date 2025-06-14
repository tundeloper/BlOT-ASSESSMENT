'use client'
import React, { useEffect, useState } from 'react'
import { SiPremierleague } from 'react-icons/si'
import { IoChevronDown } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { getFixtures } from '@/api/livescore'

interface Match {
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  time: string;
}

interface FixtureDay {
  date: string;
  matches: Match[];
}

const fixtures: FixtureDay[] = [
  {
    date: 'Today',
    matches: [
      {
        homeTeam: { name: 'Chelsea', logo: logo.src },
        awayTeam: { name: 'Mancity', logo: logo.src },
        time: '16:00'
      },
      {
        homeTeam: { name: 'Barcelona', logo: logo.src },
        awayTeam: { name: 'ManUtd', logo: logo.src },
        time: '16:00'
      }
    ]
  },
  {
    date: 'Friday 18 Oct',
    matches: []
  },
  {
    date: 'Saturday 19 Oct',
    matches: []
  },
  {
    date: 'Sunday 20 Oct',
    matches: []
  }
];

const Fixtures = () => {
  const [activeDay, setActiveDay] = useState<string>('Today');

  useEffect(() => {
    const fetchFixtures = async () => {
      const response = await getFixtures();
      console.log(response);
    };
    fetchFixtures();
  }, []);

  const toggleDay = (date: string) => {
    setActiveDay(activeDay === date ? '' : date);
  };

  return (
    <div className="bg-white rounded flex flex-col w-full dark:bg-[#121212] transition-colors duration-300">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          Weekly Fixtures
        </h2>
        <button className="text-[13px] font-normal text-white cursor-pointer">
          View all
        </button>
      </div>

      <div className="flex justify-center items-center p-2.5 bg-[#F9FAFB] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.15)] rounded-full w-fit mx-auto my-4">
        <SiPremierleague size={40} className="text-[#1E1E1E]" />
      </div>

      <div className="flex flex-col gap-2.5 pb-4">
        {fixtures.map((day, dayIndex) => (
          <div
            key={day.date}
            className={`flex flex-col gap-2.5 px-4 ${
              dayIndex !== fixtures.length - 1 ? 'pb-2.5 border-b border-[#D9D9D9]' : ''
            }`}
          >
            <button 
              onClick={() => toggleDay(day.date)}
              className="flex justify-between items-center w-full cursor-pointer"
            >
              <span className="text-[13px] text-[#3A3D46] dark:text-[#C9CDD4]">{day.date}</span>
              <IoChevronDown 
                size={16} 
                className={`text-[#3A3D46] transform transition-transform duration-200 ${
                  activeDay === day.date ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {activeDay === day.date && day.matches.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {day.matches.map((match, matchIndex) => (
                  <div key={matchIndex} className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-1 w-[85px] justify-end">
                      <span className="text-[13px] font-medium text-[#1E1E1E] dark:text-white">
                        {match.homeTeam.name}
                      </span>
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          width={20}
                          height={20}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="bg-[#2D439B] h-[13px] w-[33px] flex items-center justify-center text-[10px] text-white rounded">
                        {match.time}
                    </div>

                    <div className="flex items-center gap-1 w-[72px]">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          width={20}
                          height={20}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[13px] font-medium text-[#1E1E1E] dark:text-white">
                        {match.awayTeam.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fixtures