"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo2.png";
import { useAuthStore } from "@/store/authstore";
import ProtectedRoute from "../protectedRoute";
import Link from "next/link";

const Welcome = () => {
  const state = useAuthStore();
  return (
    <ProtectedRoute>
      <div className={`md:max-w-[550px] w-full bg-white md:bg-white rounded flex flex-col items-center gap-1 p-[22px] md:shadow-card ml-2 md:p-[32px] mt-[40%] dark:bg-[#121212] transition-colors duration-300`}>
        <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
          <Image
            src={logo}
            alt="logo"
            width={114}
            height={76}
            className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
          />
          <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center dark:text-white">
            <span className="mr-2">🎉</span> Welcome,{" "}
            {state.user?.name && state.user?.name}!
          </h1>
          <p className="text-[#7A7F8C] dark:text-[#C9CDD4]">Your Sportlaze experience is ready!</p>
        </div>
        <Link
          className="w-[100%] flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.04)" }}
          href='/feed'
        >
          Go to Dashboard
        </Link>
      </div>
    </ProtectedRoute>
  );
};

export default Welcome;
