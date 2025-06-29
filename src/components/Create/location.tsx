"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import axios from "axios";
import BackIcons from "@/assets/svg/backIcon";
import { useTheme } from "@/context/ThemeContext";

type Location = {
  title: string;
  lat: number;
  lon: number;
  distance?: string;
};

type Props = {
  onChange: (value: boolean) => void;
  onLocation: Dispatch<SetStateAction<string>>;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return `${(R * c).toFixed(2)} km`;
}

export default function Location({onChange, onLocation}: Props) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        fetchNearbyPlaces(latitude, longitude);
      },
      () => {
        alert("Location access denied. Cannot show nearby places.");
      }
    );
  }, []);

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "jsonv2",
            lat,
            lon,
            zoom: 18,
            addressdetails: 1,
          },
        }
      );

      const address = res.data.address || {};
      const nearby = Object.values(address)
        .filter((v) => typeof v === "string")
        .map((title) => ({
          title,
          lat,
          lon,
          distance: "0.00 km",
        }));

      setLocations(nearby.slice(0, 5)); // Only 5 nearby entries
    } catch (err) {
      console.error("Failed to fetch nearby places:", err);
    }
  };

  const handleSearchClick = async () => {
    if (!search.trim() || !coords) return;

    try {
      setLoading(true);
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: search,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );

      const results = res.data
        .slice(0, 5)
        .map((place: { display_name: string; lat: string; lon: string }) => {
          const lat = parseFloat(place.lat);
          const lon = parseFloat(place.lon);
          return {
            title: place.display_name,
            lat,
            lon,
            distance: haversineDistance(coords.lat, coords.lon, lat, lon),
          };
        });

      const newLocations = results.filter(
        (item: Location) => !locations.some((l) => l.title === item.title)
      );

      const merged = [...newLocations, ...locations].slice(0, 5);
      setLocations(merged);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="absolute top-0 right-0 p-2 text-[13px] md:text-[16px] md:p-4 text-[#1E1E1E] h-full w-full bg-white dark:bg-[#121212] z-1">
      <div className="flex justify-between">
              <div className="flex gap-3 mb-3">
                <div onClick={() => onChange(false)} className="cursor-pointer">
                  <BackIcons fill={theme === "dark" ? "white" : "#1E1E1E"} />
                </div>
                <span className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">
                  Add location
                </span>
              </div>
              {/* <button
                className="text-[#2D439B] cursor-pointer"
                onClick={() => {
                  onChange(false);
                }}
              >
                Next
              </button> */}
            </div>
      {/* Search bar */}
      <div className="flex rounded mb-3">
        <div className="flex items-center">
        <MapPin className="text-gray-400 mr-2 h-full" size={25} />
        </div>
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-[#F9FAFB] dark:bg-black dark:text-[#C9CDD4] py-2 px-2 placeholder-gray-400 focus:outline-none"
        />
        <button onClick={handleSearchClick} className="px-3 bg-[#2D439B] hover:bg-[#2D439B]-700 transition-colors">
          <Search className="text-white" size={19} />
        </button>
      </div>

      {/* Location list */}
      <div>
        <h2 className="text-sm text-gray-400 mb-2">
          Nearby locations
        </h2>
        {loading && <p className="text-xs text-gray-500">Searching...</p>}
        <ul className="space-y-3">
          {locations.map((loc, idx) => (
            <li key={idx} className="hover:bg-gray-500 px-2 py-1 rounded-md" onClick={() => {onLocation(loc.title); onChange(false);}}>
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">{loc.title}</span>
                <span className="text-gray-400">{loc.distance}</span>
              </div>
              {/* <p className="text-xs text-gray-400">
                Lat: {loc.lat.toFixed(4)}, Lon: {loc.lon.toFixed(4)}
              </p> */}
            </li>
          ))}
          {!locations.length && !loading && (
            <p className="text-xs text-gray-400">No locations found yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
