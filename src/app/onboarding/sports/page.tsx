"use client";
import AuthHeader from "@/components/Layout/AuthHeader";
// import AuthCard from "@/components/Auth/card";
import BgWrapper from "@/components/Layout/BgWrapper";
import Sports from "@/components/Onboarding/Sports";
// import GradientButton from "@/components/ui/gradientButton";

// const sportsList = [
//   'Football', 'Basketball',
//   'Formula1', 'Boxing',
//   'Tennis', 'Athletics'
// ];

export default function Page() {
  
  return (
    <BgWrapper>
      <AuthHeader showProgress={true} progress={30} />
      <div className="flex flex-col items-center justify-center h-full w-[100%]">
        <Sports />
      </div>
    </BgWrapper>
  );
}
