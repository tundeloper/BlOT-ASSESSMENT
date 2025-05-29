"use client";
import BgWrapper from "@/components/Layout/BgWrapper";
import Verify from "@/components/auth/Verify";

export default function OTPForm() {

  return (
    <BgWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <Verify />
      </div>
    </BgWrapper>
  );
}
