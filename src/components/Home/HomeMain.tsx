import React from "react";
import HomeSvg from "@/assets/diamond-thin";
import blot from "@/assets/BLOTT.png";
import Image from "next/image";
import Link from "next/link";

const HomeMain: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-[#000000] overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute -right-64 top-1/2 transform -translate-y-1/2 w-[900px] h-[700px] rounded-full filter blur-3xl opacity-70"
        // style={{ backgroundColor: "#4E5D75" }}
      >
        <HomeSvg />
      </div>

      {/* Main content flex container */}
      <div className="max-w-[1190px] mx-auto flex justify-center flex-col h-full">
        {/* Left text section */}
        <div className="text-white flex flex-col gap-[50px]">
          <p className="text-[50px] font-light">Blott Studio</p>
          <h1 className="text-[120px] font-bold">Web Assessment</h1>
          <p className=" text-[46px] font-light text-[#828282]">
            Finance Digest
          </p>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between w-auto mt-[10rem] space-x-2 z-30">
          <div className="flex gap-2">
            <Image src={blot} alt="Blott logo" className="" />
            <div className=" flex gap-2 flex-col">
              <span className="text-xs font-medium text-white opacity-70">
                BlottLab experimental playground
              </span>
              <span className="text-xs font-thin text-white opacity-70">
                @2020 Blott.io Ltd, All right reserved
              </span>
            </div>
          </div>
          <Link href='/news' className="px-8 py-4 cursor-pointer bg-[#55ACEE] hover:bg-blue-500 rounded-full text-[#ffffff] text-base font-medium">
            Ready
          </Link>
        </div>
      </div>

      {/* Footer logo and text */}
    </div>
  );
};

export default HomeMain;
