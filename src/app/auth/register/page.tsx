"use client";
import BgWrapper from "@/components/Layout/BgWrapper";
import Signup from "@/components/auth/SignupForm";

export default function RegisterForm() {


  return (
    <BgWrapper> 
      <div className="flex flex-col items-center justify-center h-full">
        <Signup />     
      </div>
    </BgWrapper>
  );
}
