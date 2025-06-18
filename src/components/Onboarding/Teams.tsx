"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo2.png";

import Checkbox from "../ui/checkedBox";
import GradientButton from "../ui/gradientButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAuthStore } from "@/store/authstore";

const sportsWithTeams: Record<string, string[]> = {
  Football: ["Arsenal", "Chelsea", "Barcelona", "Man-city", "Others"],
  Basketball: [
    "L.A Lakers",
    "Golden State Warriors",
    "Boston Celtics",
    "Chicago Bulls",
    "Others",
  ],
  "National Football League (NFL)": [
    "Arizona cardinals",
    "Buffalo bills",
    "Atlanta falcons",
    "Baltimore ravens",
    "Others",
  ],
  "Major League Baseball (MLB)": [
    "Arizona diamondbacks",
    "Atlanta braves",
    "Chicago cubs",
    "Athletics",
    "Others",
  ],
};

const Teams = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>(
    {}
  );

  const router = useRouter();
  const token = useAuthStore((s) => s.token);

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

  const handleNext = async () => {
    const result: Record<string, string> = {};

    Object.entries(sportsWithTeams).forEach(async ([sport, teams]) => {
      const selected = selectedTeams[sport] || [];
      try {
        result[sport] = selected.join(", ");
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/preferences/sports`,
          result,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          enqueueSnackbar("successful", { variant: "success" });
          router.push("/onboarding/notification");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          enqueueSnackbar("unauthorize", { variant: "error" });
          router.push("/auth/register");
        }
      }

      if (selected.length === teams.length) {
        result[sport] = "All selected";
      } else if (selected.length === 0) {
        result[sport] = "None selected";
      } else {
        result[sport] = selected.join(", ");
      }
    });

    // alert(JSON.stringify(result, null, 2));
  };

  return (
    <div
      className={`md:max-w-5xl w-full mt-8 md:mt-2 rounded flex flex-col items-center gap-1 p-8 md:shadow-card md:p-8 dark:bg-[#121212] transition-colors duration-300`}
    >
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={76}
          className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
        />
        <h1
          className={`font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-center text-[#3A3D46] dark:text-[#FFFFFF]`}
        >
          Pick Your Favorite Teams
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
        {Object.entries(sportsWithTeams).map(([sport, teams]) => (
          <div key={sport} className="rounded p-4">
            <h3 className="font-semibold mb-2 text-[#7A7F8C]">{sport}</h3>
            <div className="space-y-1 gap-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              {teams.map((team) => (
                <label
                  key={team}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedTeams[sport]?.includes(team) || false}
                    onChange={() => toggleTeam(sport, team)}
                  />
                  {/* <input
                    type="checkbox"
                    checked={selectedTeams[sport]?.includes(team) || false}
                    onChange={() => toggleTeam(sport, team)}
                    className="accent-primary border-gray-300 bg-transparent text-primary rounded focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
                  /> */}
                  <span className="text-[#7A7F8C]">{team}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row w-full gap-4 mt-7">
        <GradientButton
          onClick={handleNext}
          className="flex-1 flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.04)" }}
        >
          Next
        </GradientButton>
        <Link
          className="flex-1 flex items-center justify-center h-[50px] bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
          href="/onboarding/welcome"
        >
          Skip
        </Link>
      </div>
    </div>
  );
};

export default Teams;
