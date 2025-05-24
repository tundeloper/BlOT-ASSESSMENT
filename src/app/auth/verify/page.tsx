"use client";

import { useEffect, useRef, useState } from "react";
import AuthCard from "@/components/auth/card";
import GradientButton from "@/components/ui/gradientButton";

export default function OTPForm() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const startCountdown = () => {
    setCountdown(30); // 30 seconds
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1 && timerRef.current) {
          clearInterval(timerRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (!/^\d*$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      const nextSibling = element.nextElementSibling as HTMLInputElement;
      if (nextSibling) nextSibling.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevSibling =
        (e.currentTarget.previousElementSibling as HTMLInputElement) || null;
      if (prevSibling) prevSibling.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete) return;

    alert("OTP submitted: " + otp.join(""));
    setIsSubmitted(true);
    startCountdown();
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setIsSubmitted(false);
    startCountdown();
    alert("OTP resent!");
  };

  //   useEffect(() => {
  //     startCountdown();
  //     if (countdown === 0) {
  //       startCountdown();
  //     }
  //   }, [isSubmitted, countdown]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold mb-2 text-center">Verify Account</h1>
      <p className="font-bold text-gray-400 text-center mb-6">
        Enter the OTP code sent to your email
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex space-x-2 justify-center">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center text-xl text-[#111827] border rounded focus:outline-none focus:ring "
              value={digit}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <GradientButton type="submit" disabled={!isOtpComplete} className={`cursor-pointer w-full font-semibold ${!isOtpComplete && "opacity-50 bg-gray-400 cursor-not-allowed"}`}>
          Submit
        </GradientButton>
        {/* <button
          type="submit"
          disabled={!isOtpComplete}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isOtpComplete
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button> */}

        {isSubmitted && (
          <div className="text-center ">
            {countdown > 0 ? (
              <p className="text-sm text-gray-300">
                Didn't get the code? Resend in <span className="text-secondary dark:text-white">{countdown}s</span>
              </p>
            ) : (
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">Didn't get the code?</p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </AuthCard>
  );
}
