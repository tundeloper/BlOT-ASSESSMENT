"use client";
import React, { useState } from 'react';
import { Search, Share, Users } from 'lucide-react';
import football from '../../assets/lounge/football.png';
import basketball from '../../assets/lounge/basketball.png';
import nfl from '../../assets/lounge/nfl.png';
import hockey from '../../assets/lounge/hockey.png';
import golf from '../../assets/lounge/golf.png';
import boxing from '../../assets/lounge/boxing.png';
import cycling from '../../assets/lounge/cycling.png';
import tennis from '../../assets/lounge/tennis.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Sample lounge data
const lounges = [
  { id: 1, title: 'Football', href: "football/livescore", image: football, members: '990k', description: 'Global game, local passion. Dive into match talk, and goals.' },
  { id: 2, title: 'Basket Ball', href: "football/basketball", image: basketball, members: '990k', description: 'Join the court-side conversation. From NBA to streetball – it’s all here.' },
  { id: 3, title: 'The NFL', href: "football/the nfl", image: nfl, members: '990k', description: 'All things football – hot takes, game predictions, and draft chatter.' },
  { id: 4, title: 'Hockey', href: "football/hockey", image: hockey, members: '990k', description: 'Fast-paced, hard-hitting talk for true puck fans.' },
  { id: 5, title: 'Golf', href: "football/golf", image: golf, members: '990k', description: 'A calm space for swing talk, tour highlights, and gear tips.' },
  { id: 6, title: 'Boxing', href: "football/boxing", image: boxing, members: '990k', description: 'From classic bouts to today’s  fights step into the ring of discussion.' },
  { id: 7, title: 'Cycling', href: "football/cycling", image: cycling, members: '990k', description: 'From Tour de France to gear advice – pedal through the convo.' },
  { id: 8, title: 'Tennis', href: "football/tenis", image: tennis, members: '990k', description: 'From Tour de France to gear advice – pedal through the convo.' },
  { id: 9, title: 'Football', href: "football/football", image: football, members: '990k', description: 'Global game, local passion. Dive into match talk, and goals.' },
  { id: 10, title: 'Basket Ball', href: "football/basketball", image: basketball, members: '990k', description: 'Join the court-side conversation. From NBA to streetball – it’s all here.' },
  { id: 11, title: 'The NFL', href: "football/the nfl", image: nfl, members: '990k', description: 'All things football – hot takes, game predictions, and draft chatter.' },
  { id: 12, title: 'Hockey', href: "football/hockey", image: hockey, members: '990k', description: 'Fast-paced, hard-hitting talk for true puck fans.' },
  { id: 13, title: 'Golf', href: "football/golf", image: golf, members: '990k', description: 'A calm space for swing talk, tour highlights, and gear tips.' },
  { id: 14, title: 'Boxing', href: "football/boxing", image: boxing, members: '990k', description: 'From classic bouts to today’s  fights step into the ring of discussion.' },
  { id: 15, title: 'Cycling', href: "football/cycling", image: cycling, members: '990k', description: 'From Tour de France to gear advice – pedal through the convo.' },
  { id: 16, title: 'Tenis', href: "football/tennis", image: tennis, members: '990k', description: 'From Tour de France to gear advice – pedal through the convo.' },
  // add more items as needed
];

export default function LoungeGrid() {
  const route = useRouter();
  const [query, setQuery] = useState('');
  const filtered = lounges.filter(lounge =>
    lounge.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 md:mb-2">
        <h1 className="md:text-[31px] font-semibold text-[#1E1E1E] ">Lounges</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Lounges"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pr-10 pl-2 md:pl-4 py-2 w-[200px] h-[25px] md:w-[350px] md:h-[33px] text-[10px] md:text-[13px] border border-gray-300 rounded-sm focus:outline-none focus:ring-2"
          />
          <Search className="w-3 h-3 md:w-5 md:h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Scrollable grid container */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid mr-1 mb-4 md:mr-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {filtered.map(lounge => (
            <div key={lounge.id} className="bg-[#fffff] shadow-sm overflow-hidden">
              <div className="h-40 bg-gray-200">
                <Image
                width={300}
                height={300}
                  src={lounge.image}
                  alt={lounge.title}
                  className="w-full h-[158px] object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-40">
                <h2 className="text-center text-[##1E1E1E] text-[13px] md:text-[16px] font-medium mb-4">{lounge.title}</h2>
                <p className="text-center text-[8px] md:text-[13px] text-[#3A3D46] mb-4">{lounge.description}</p>
                <div className="flex justify-between items-center text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-5 h-5" />
                    <span className="text-[8px] md:text-sm">{lounge.members}</span>
                  </div>
                  <button className="text-[8px] md:text-sm text-[#1E1E1E] hover:text-[#1E1E1E]" onClick={() => route.push(`/lounge/${lounge.href}`)}>
                  <Share className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
