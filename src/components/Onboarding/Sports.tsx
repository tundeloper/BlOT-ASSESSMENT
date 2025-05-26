"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo2.png";
import { useRouter } from "next/navigation";
import Checkbox from "../ui/checkedBox";
import { useTheme } from "@/context/ThemeContext";

const sportsList = [
  "Football",
  "Basketball",
  "Formula1",
  "Boxing",
  "Tennis",
  "Athletics",
];

const Sports = () => {
  const router = useRouter();

  const {theme} = useTheme()

  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const handleToggle = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  //   const handleNext = () => {
  //     alert(`Selected sports: ${selectedSports.join(', ') || 'None'}`);
  //   };

  //   const handleSkip = () => {
  //     alert('Skipped');
  //   };

  const handleNext = () => {
    router.push("/onboarding/welcome");
  };

  return (
    <div className={`md:max-w-[550px] w-full ${theme === "dark" ? 'bg-[#121212]' : 'bg-white'} rounded flex flex-col items-center gap-1 p-8 md:shadow-card md:p-8`}>
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={76}
          className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
        />
        <h1 className={`font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-center ${theme === 'dark' ? 'text-white' : 'text-[#3A3D46]'}`}>
          What Sports do you love?
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-[180px] max-w-full mb-6 md:gap-x-[280px]">
        {sportsList.map((sport) => (
          <label key={sport} className="flex items-center space-x-2 cursor-pointer">
            {/* <input
              type="checkbox"
              checked={selectedSports.includes(sport)}
              onChange={() => handleToggle(sport)}
              className="accent-primary border-gray-300 bg-transparent text-primary rounded focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
            /> */}
            <Checkbox
              checked={selectedSports.includes(sport)}
              onChange={() => handleToggle(sport)}
            />
            <p className={''}>{sport}</p>
          </label>
        ))}
      </div>
      <div className="flex flex-row w-full gap-4 mt-7">
        <button
          onClick={handleNext}
          className="w-[50%] flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.04)" }}
        >
          Next
        </button>
        <button
          className="w-[50%] flex items-center justify-center h-[50px] bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Sports;
