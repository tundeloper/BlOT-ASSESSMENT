import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapPin, Search } from 'lucide-react';
import BackIcons from "@/assets/svg/backIcon";
import { useTheme } from "@/context/ThemeContext";


interface Props {
  onChange: Dispatch<SetStateAction<boolean>>;
}

type Location = {
  title: string;
  address?: string;
  lat: number;
  lng: number;
  distance?: string;
};

const MOCK_LOCATIONS: Location[] = [
  {
    title: 'University of Benin',
    address: 'Ugbowo, Edo, Nigeria',
    lat: 6.3958,
    lng: 5.6125,
  },
  {
    title: 'Ekosodin',
    lat: 6.4000,
    lng: 5.6200,
  },
  {
    title: 'GRA Benin city',
    address: 'University of Benin, Ugbowo, Edo',
    lat: 6.3400,
    lng: 5.6000,
  },
  {
    title: 'Film House Edo state',
    address: 'Benin-Lagos road',
    lat: 6.3900,
    lng: 5.5900,
  },
  {
    title: 'Benin City Center',
    lat: 6.3405,
    lng: 5.6145,
  },
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

export default function Location({onChange}: Props) {
    const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState<{ title: string; address?: string; distance: string }[]>([]);
  const {theme} = useTheme()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Location error:', err);
        alert('Please enable location to see nearby places.');
      }
    );
  }, []);

  useEffect(() => {
    if (!userCoords) return;

    const nearby = MOCK_LOCATIONS.map((loc) => ({
      ...loc,
      distance: `${haversineDistance(userCoords.lat, userCoords.lng, loc.lat, loc.lng)} km`,
    }));

    setLocations(nearby);
  }, [userCoords]);

  const filteredLocations = locations.filter((loc) =>
    loc.title.toLowerCase().includes(search.toLowerCase())
  );
    return <div className="absolute top-0 right-0 p-2 text-[13px] md:text-[16px] md:p-4 text-[#1E1E1E] h-full w-full bg-white dark:bg-[#121212]">
        <div className="flex justify-between">
            <div className="flex gap-3">
                <div onClick={() => onChange(false)} className="cursor-pointer"><BackIcons fill={theme === "dark" ? "white" : "#1E1E1E"} /></div>
                <span className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">Add location</span>
            </div>
            <button className="text-[#2D439B] cursor-pointer" onClick={() => {onChange(false)}}>Next</button>
        </div>
        <div className="bg-inherit text-white rounded-md space-y-4 mt-3">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-[#35383F] px-3 py-1 rounded">
        <MapPin className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="search location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-[#F9FAFB] h-[35px] dark:bg-black p-2 rounded-r-sm rounded-l-none text-gray-400 placeholder-gray-400 focus:outline-none dark:text-white"
        />
        <button className="bg-[#2D439B] h-[35px] px-3 cursor-pointer">
          <Search className="text-white" size={18} />
        </button>
      </div>

      {/* Nearby Locations */}
      <div>
        <h2 className="text-sm text-[#7A7E85] mb-2 text-[10px] md:text-[13px]">Nearby locations</h2>
        <ul className="space-y-3">
          {filteredLocations.length === 0 && <p className="text-xs text-gray-500">No matching results.</p>}
          {filteredLocations.map((loc, idx) => (
            <li key={idx} className="">
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">{loc.title}</span>
                {/* <span className="text-gray-400">{loc.distance}</span> */}
              </div>
                <span className="text-gray-400">{loc.distance} </span>
              {loc.address && (
                <span className="text-xs text-[#3A3D46] dark:text-[#C9CDD4]">{loc.address}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
}
