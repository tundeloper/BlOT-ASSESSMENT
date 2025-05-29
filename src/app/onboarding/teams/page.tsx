"use client";
import AuthHeader from "@/components/Layout/AuthHeader";
import BgWrapper from "@/components/Layout/BgWrapper";
import Teams from "@/components/Onboarding/Teams";

export default function Page() {

  return (
    <BgWrapper>
      <AuthHeader showProgress={true} progress={60} />
      <div className="flex flex-col items-center justify-center h-full w-[100%]">
        <Teams />
      </div>
    </BgWrapper>
  );
}
