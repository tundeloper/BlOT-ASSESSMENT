"use client";
import AuthCard from "@/components/auth/card";
import GradientButton from "@/components/ui/gradientButton";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const sportsWithTeams: Record<string, string[]> = {
  Football: [
    "Arsenal",
    "Real Madrid",
    "Chealsea",
    "Barcelona",
    "Manchester United",
    "Liverpool",
    "Bayern Munich",
    "PSG",
  ],
  Basketball: [
    "Los Angeles Lakers",
    "Golden State Warriors",
    "Boston Celtics",
    "Chicago Bulls",
    "Miami Heat",
    "Brooklyn Nets",
  ],
  Formula1: [
    "Mercedes",
    "Red Bull Racing",
    "Ferrari",
    "McLaren",
    "Alpine",
    "Aston Martin",
  ],
  Boxing: [
    "Floyd Mayweather",
    "Manny Pacquiao",
    "Canelo Alvarez",
    "Tyson Fury",
    "Anthony Joshua",
  ],
  Tennis: [
    "Roger Federer",
    "Rafael Nadal",
    "Novak Djokovic",
    "Serena Williams",
    "Naomi Osaka",
    "Ashleigh Barty",
  ],
  Athletics: [
    "Usain Bolt",
    "Carl Lewis",
    "Mo Farah",
    "Shelly-Ann Fraser-Pryce",
    "Elaine Thompson-Herah",
  ],
};

export default function Teams() {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>(
    {}
  );

  const {theme} = useTheme()

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("selectedTeams");
    if (stored) {
      setSelectedTeams(JSON.parse(stored));
    } else {
      // Initialize with empty arrays for all sports
      const emptyInit: Record<string, string[]> = {};
      Object.keys(sportsWithTeams).forEach((sport) => {
        emptyInit[sport] = [];
      });
      setSelectedTeams(emptyInit);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
  }, [selectedTeams]);

  const toggleTeam = (sport: string, team: string) => {
    setSelectedTeams((prev) => {
      const currentTeams = prev[sport] || [];
      const newTeams = currentTeams.includes(team)
        ? currentTeams.filter((t) => t !== team)
        : [...currentTeams, team];
      return { ...prev, [sport]: newTeams };
    });
  };

  const handleNext = () => {
    const result: Record<string, string> = {};

    Object.entries(sportsWithTeams).forEach(([sport, teams]) => {
      const selected = selectedTeams[sport] || [];
      if (selected.length === teams.length) {
        result[sport] = "All selected";
      } else if (selected.length === 0) {
        result[sport] = "None selected";
      } else {
        result[sport] = selected.join(", ");
      }
    });

    alert(JSON.stringify(result, null, 2));
  };

  const handleSkip = () => {
    alert("Skipped");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Image
        src={`${theme  === "light" ? "/svg/logo_gradient.svg" : "/svg/logo_white.svg"}`}
        alt="Sportlaze Logo"
        width={80}
        height={80}
        className="mx-auto mb-4"
      />
      <h2 className="text-xl font-bold mb-4 text-center">
        Pick Your Favorite Teams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
        {Object.entries(sportsWithTeams).map(([sport, teams]) => (
          <div key={sport} className="rounded p-4">
            <h3 className="font-semibold mb-2">{sport}</h3>
            <div className="space-y-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <label
                  key={team}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTeams[sport]?.includes(team) || false}
                    onChange={() => toggleTeam(sport, team)}
                    className="accent-primary border-gray-300 bg-transparent text-primary rounded focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
                  />
                  <span>{team}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <GradientButton
          onClick={handleNext}
          className="bg-primary font-semibold flex-1 text-white px-4 py-2 rounde transition"
        >
          Next
        </GradientButton>
        <button
          onClick={handleSkip}
          className="bg-gray-200 font-semibold flex-1 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
