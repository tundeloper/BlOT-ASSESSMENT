"use client";
import Image from "next/image";
import React, {  useState } from "react";
import logo from "@/assets/logo2.png";
import { useRouter } from "next/navigation";
import Checkbox from "../ui/checkedBox";
import GradientButton from "../ui/gradientButton";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "@/store/authstore";
import Link from "next/link";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

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
  const token = useAuthStore((s) => s.token);

  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const handleToggle = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleNext = async () => {
    // alert(`Selected sports: [${selectedSports.join(', ') || ''}]`);
    try {
      console.log(token);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/preferences/sports`,
        {
          favorite_sport: selectedSports.join(", ") || ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        enqueueSnackbar("successful", { variant: "success" });
        router.push("/onboarding/teams");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar("unauthorize", { variant: "error" });
        router.push("/auth/register");
      }
    }
  };

  //   const handleSkip = () => {
  //     alert('Skipped');
  //   };

  //   const handleNext = () => {
  //     router.push("/onboarding/welcome");
  //   };

  return (
    <div className="md:max-w-[550px] w-full bg-white mt-[50%] md:mt-2 rounded flex flex-col items-center gap-1 p-8 md:shadow-card md:p-8 dark:bg-[#121212] transition-colors duration-300">
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7 lg:mt-6">
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
          What Sports do you love?
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-[100px] max-w-full mb-6 md:gap-x-[280px]">
        {sportsList.map((sport) => (
          <label
            key={sport}
            className="flex items-center space-x-2 cursor-pointer text-[#7A7F8C]"
          >
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
            <p className={""}>{sport}</p>
          </label>
        ))}
      </div>
      <div className="flex flex-row w-full gap-4 mt-7">
        <GradientButton
          onClick={handleNext}
          className="flex-1 h-[50px] text-[16px] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60 bg-[#2D439B] py-2 "
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
      <SnackbarProvider />
    </div>
  );
};

export default Sports;
