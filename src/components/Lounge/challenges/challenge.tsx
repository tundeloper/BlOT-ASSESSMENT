"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import backIcon from "@/assets/backIcon.png";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useTheme } from "@/context/ThemeContext";
// import { BiSort } from 'react-icons/bi'
import { getLoungeNav } from "@/utils/lounge";
import { getLounge, joinLounge } from "@/api/lounges";
import { CircularProgress } from "@mui/material";
import QuizPage from "./ChallegeQuiz";

const Challenge = () => {
  const { theme } = useTheme();
  const router = useRouter();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedSort, setSelectedSort] = useState("Premier League");

  const [lounge, setLounge] = useState<Lounge | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const pathname = usePathname();
  const navItems = getLoungeNav(pathname, slug as string);

  useEffect(() => {
    const fetchLounge = async () => {
      setLoading(true);
      const response = await getLounge(slug as string);
      if (response.success) {
        setLounge(response.data);
      } else {
        console.log(response);
      }
      setLoading(false);
    };
    fetchLounge();
  }, [slug]);

  const handleJoinLounge = async () => {
    if (lounge?.is_member) {
      navigator.share({
        title: lounge?.name,
        text: lounge?.description,
        url: `${window.location.href}`,
      });
      return;
    }
    if (lounge?.id) {
      setIsJoining(true);
      const response = await joinLounge(lounge.id);
      if (response.success) {
        setLounge(response.data);
      } else {
        console.log(response);
      }
      setIsJoining(false);
    }
  };

//   const handleSort = (option: string) => {
//     setSelectedSort(option);
//     setShowDropdown(false);
//   };

  return (
    <div className="flex flex-col gap-4 bg-inherit md:bg-white md:dark:bg-[#121212] rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4">
      <div className="block md:hidden">
        <div className="flex justify-between items-center">
          <button
            className="cursor-pointer flex items-center gap-2"
            onClick={() => router.back()}
          >
            <Image
              src={backIcon}
              alt="back"
              width={24}
              height={24}
              className={`${theme === "dark" ? "invert" : ""}`}
            />
            <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white">
              Back
            </span>
          </button>
          <p className="text-[13px] font-normal text-[#3A3D46] dark:text-white">
            {loading ? "Loading..." : lounge?.name || 'Football'} Lounge
          </p>
          <button
            className="bg-[#2D439B] text-white w-[75px] h-[25px] rounded-[2px] text-[14px] font-normal"
            onClick={handleJoinLounge}
          >
            {isJoining ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : lounge?.is_member ? (
              "Invite"
            ) : (
              "Join"
            )}
          </button>
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`text-[13px] font-normal text-[#3A3D46] dark:text-white shrink-0 border-b-[3px] border-[#2D439B] pb-1 ${
                item.isSelected ? "border-[#2D439B]" : "border-transparent"
              }`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Image
          src={backIcon}
          alt="back"
          width={24}
          height={24}
          className={`${
            theme === "dark" ? "invert" : ""
          } cursor-pointer hidden md:block`}
          onClick={() => router.back()}
        />
        <div className="flex justify-end items-center w-full md:w-auto">
          
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2 mb-12">
        <QuizPage />
        <p className='italic text-[13px] dark:text-[#ffffff] text-center'>You will be notified instatly once you hit a badge milestone through an in-app pop-up, glow animation on your profile pic, and a badge upgrade toast. Your new badge becomes visible across the site automatically </p>

        {/* <div className='flex flex-row flex-wrap gap-4'>
                    <PredictionCard />
                    <PredictionCard />
                </div>
                <PointSystem />
                <Rules />
                <Badges /> */}
      </div>
    </div>
  );
};

export default Challenge;
