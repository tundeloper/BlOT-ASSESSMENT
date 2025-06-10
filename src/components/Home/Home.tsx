"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link'
import logo from "@/assets/logo.png";
import { googleLogin } from "@/api/auth";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";

const Home = () => {
  const state = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash; // Get everything after '#'
        const params = new URLSearchParams(hash.slice(1)); // Remove '#' and parse
        const accessToken = params.get('access_token');
        if (accessToken) {
          const response = await googleLogin({ access_token: accessToken });
          state.setUser(response.data.data, response.data.token)
          router.push("/home")
        }
      }
    };
    handleGoogleLogin();
  }, [router, state]);

  return (
    <div className="max-w-[500px] md:bg-white rounded md:shadow-card flex flex-col items-center gap-20 p-[64px_48px] mt-[50%] md:mt-2 dark:bg-[#121212] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4 w-[427px]">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={100}
          className="w-[92px] md:w-[114px] h-[80px] md:h-[100px]"
        />
        <h1 className="font-[500] text-[16px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] dark:text-white text-center">
          Experience Sports Like Never Before
        </h1>
      </div>
      <div className="flex flex-row w-full gap-4 mt-7">
        <Link
          href="/home"
          className="w-[50%] flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.04)" }}
        >
          Get Started
        </Link>
        <Link
          href="/auth/login"
          className="w-[50%] flex items-center justify-center h-[50px] bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
