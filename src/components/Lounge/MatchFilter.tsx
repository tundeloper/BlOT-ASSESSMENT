'use client'
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { HiOutlineSearch } from 'react-icons/hi';
import Image from 'next/image';

interface Country {
    id: string;
    name: string;
    flag: string;
}

interface League {
    id: string;
    name: string;
    country: string;
    flag: string;
}

interface MatchFilterProps {
    onCountryChange?: (country: Country | null) => void;
    onLeagueChange?: (league: League | null) => void;
    onSearchCountryChange?: (search: string) => void;
    onSearchLeagueChange?: (search: string) => void;
}

const MatchFilter: React.FC<MatchFilterProps> = ({
    onCountryChange,
    onLeagueChange,
    onSearchCountryChange,
    onSearchLeagueChange
}) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
    const [searchValueCountry, setSearchValueCountry] = useState('');
    const [searchValueLeague, setSearchValueLeague] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<'country' | 'league'>('country');

    const countries: Country[] = [
        { id: '1', name: 'England', flag: 'https://ui-avatars.com/api/?name=England&background=3A3D46&color=fff&size=32' },
        { id: '2', name: 'Spain', flag: 'https://ui-avatars.com/api/?name=Spain&background=3A3D46&color=fff&size=32' },
        { id: '3', name: 'Nigeria', flag: 'https://ui-avatars.com/api/?name=Nigeria&background=3A3D46&color=fff&size=32' },
        { id: '4', name: 'Germany', flag: 'https://ui-avatars.com/api/?name=Germany&background=3A3D46&color=fff&size=32' },
    ];

    const leagues: League[] = [
        { id: '1', name: 'Premier League', country: 'England', flag: 'https://ui-avatars.com/api/?name=England&background=3A3D46&color=fff&size=32' },
        { id: '2', name: 'La Liga', country: 'Spain', flag: 'https://ui-avatars.com/api/?name=Spain&background=3A3D46&color=fff&size=32' },
        { id: '3', name: 'Bundesliga', country: 'Germany', flag: 'https://ui-avatars.com/api/?name=Germany&background=3A3D46&color=fff&size=32' },
        { id: '4', name: 'Serie A', country: 'Italy', flag: 'https://ui-avatars.com/api/?name=Italy&background=3A3D46&color=fff&size=32' },
    ];

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        onCountryChange?.(country);
    };

    const handleLeagueSelect = (league: League) => {
        setSelectedLeague(league);
        onLeagueChange?.(league);
    };

    const handleSearchCountryChange = (value: string) => {
        setSearchValueCountry(value);
        onSearchCountryChange?.(value);
    };

    const handleSearchLeagueChange = (value: string) => {
        setSearchValueLeague(value);
        onSearchLeagueChange?.(value);
    };

    return (
        <div className="bg-white dark:bg-[#121212] rounded shadow-sm p-4 w-full">
            <div className="flex flex-col gap-2 mb-4 w-[236px]">
                <div className="flex justify-between items-center w-full">
                    <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white">Country</span>
                    <button
                        onClick={() => setActiveDropdown('country')}
                        className="p-1 cursor-pointer"
                    >
                        <IoChevronDown className="w-4 h-4 text-[#3A3D46] dark:text-white" />
                    </button>
                </div>

                {activeDropdown === 'country' && (
                    <>
                        <div className="border border-[#D9D9D9] dark:border-[#3A3D46] rounded px-2.5 py-1 flex items-center gap-1">
                            <HiOutlineSearch className="w-2.5 h-2.5 text-[#7A7F8C] dark:text-white" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValueCountry}
                                onChange={(e) => handleSearchCountryChange(e.target.value)}
                                className="text-[8px] font-normal text-[#7A7F8C] placeholder-[#7A7F8C] outline-none flex-1 bg-transparent dark:text-white dark:placeholder-white"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            {countries.map((country) => (
                                <button
                                    key={country.id}
                                    onClick={() => handleCountrySelect(country)}
                                    className={`flex items-center gap-2 px-2 py-2 border-b border-[#2D439B] dark:border-[#3A3D46] cursor-pointer ${selectedCountry?.id === country.id ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <Image src={country.flag} alt={country.name} width={20} height={20} className='w-4 h-4 object-cover' />
                                    <span className="text-[10px] font-normal text-[#3A3D46] dark:text-white">
                                        {country.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2 w-[236px]">
                <div className="flex justify-between items-center w-full">
                    <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white">League</span>
                    <button
                        onClick={() => setActiveDropdown('league')}
                        className="p-1 cursor-pointer"
                    >
                        <IoChevronDown className="w-4 h-4 text-[#3A3D46] dark:text-white" />
                    </button>
                </div>


                {activeDropdown === 'league' && (
                    <>
                        <div className="border border-[#D9D9D9] dark:border-[#3A3D46] rounded px-2.5 py-1 flex items-center gap-1">
                            <HiOutlineSearch className="w-2.5 h-2.5 text-[#7A7F8C] dark:text-white" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValueLeague}
                                onChange={(e) => handleSearchLeagueChange(e.target.value)}
                                className="text-[8px] font-normal text-[#7A7F8C] placeholder-[#7A7F8C] outline-none flex-1 bg-transparent dark:text-white dark:placeholder-white"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            {leagues.map((league) => (
                                <button
                                    key={league.id}
                                    onClick={() => handleLeagueSelect(league)}
                                    className={`flex items-center gap-2 px-2 py-2 border-b border-[#2D439B] dark:border-[#3A3D46] cursor-pointer ${selectedLeague?.id === league.id ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <Image src={league.flag} alt={league.name} width={20} height={20} className='w-4 h-4 object-cover' />
                                    <div className='flex flex-col items-start'>
                                        <span className="text-[10px] font-normal text-[#3A3D46] dark:text-white">{league.name}</span>
                                        <span className="text-[8px] font-normal text-[#3A3D46] dark:text-white">{league.country}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MatchFilter;