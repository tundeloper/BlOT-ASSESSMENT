"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { googleLogin } from "@/api/auth";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import GradientButton from "../ui/gradientButton";
import { User } from "@/types/auth";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [loading, setloading] = useState<boolean>(false);
  const state = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash; // Get everything after '#'
        const params = new URLSearchParams(hash.slice(1)); // Remove '#' and parse
        const accessToken = params.get("access_token");
        if (accessToken) {
          setloading(true);
          const response = await googleLogin({ access_token: accessToken });
          console.log(response)
          state.setUser(
            response.data?.data as User,
            response.data?.token as string
          );
          router.push("/feed");
          setloading(false);
        }
      }
    };
    handleGoogleLogin();
  }, [router, state]);

  return (
    <>
      {loading && (
        <div className="fixed h-screen bg-[#3a3d4644] w-screen flex items-center justify-center z-10">
          <CircularProgress size={40} sx={{ color: '#2D439B' }} />
        </div>
      )}
      <div className="relative max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-[22px] md:p-[34] md:shadow-card mt-[50%] md:mt-2 dark:bg-[#121212] transition-colors duration-300">
        <div className="flex flex-col items-center gap-4 w-[427px]">
          <Image
            src={logo}
            alt="logo"
            width={114}
            height={100}
            className="w-[92px] md:w-[114px] h-[80px] md:h-[100px]"
          />
          <h1 className="font-[500] text-[16px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] dark:text-[#C9CDD4] text-center">
            Experience Sports Like Never Before
          </h1>
        </div>
        <div className="flex flex-col w-full gap-2 mt-7">
          <GradientButton
            onClick={() => router.push("/auth/register")}
            className="flex-1 p-3 flex items-center justify-center h-[50px] bg-[##2D439B] transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] bg-[] leading-[1.5em]"
            style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
          >
            Get Started
          </GradientButton>

          {/* Divider */}
          <div className="flex items-center w-full gap-4">
            <div className="flex-1 h-px bg-[#E4E6EC]" />
            <span className="text-[13px] text-[#3A3D46] dark:text-[#C9CDD4] font-switzer">
              OR
            </span>
            <div className="flex-1 h-px bg-[#E4E6EC]" />
          </div>

          <Link
            href="/auth/login"
            className="flex-1 p-3 flex items-center justify-center h-[50px] bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] leading-[1.5em]"
            style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
          >
            Login
          </Link>
          <Link
            href="/feed"
            className="flex items-center gap-2 border text-[#3A3D46] dark:text-[#C9CDD4] border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all dark:hover:text-black"
            style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
