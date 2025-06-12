"use client";
import { useEffect, useRef, useState } from "react";
import GradientButton from "../ui/gradientButton";
import logo from "@/assets/logo2.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useAuthStore } from "@/store/authstore";
import { User } from "@/types/auth";
import axios from "axios";

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") as string;
  const state = useAuthStore();

  useEffect(() => {
    if (!email) return;
  }, [email]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const startCountdown = () => {
    setCountdown(60); // 60 seconds
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/auth/verify`,
        { email, verification_code: otp.join("") }
      );
      console.log(response.data);

      if (response.data) {
        state.setUser(
          response.data.data as User,
          response.data.token as string
        );
        router.push(`/onboarding/sports`);
      } else {
        enqueueSnackbar(
          response.data?.message ||
            "Already verified login and proceed to the app",
          { variant: "error" }
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsSubmitted(true);
        startCountdown();
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }

    // alert("OTP submitted: " + otp.join(""));
    // try {
    //   const response = await axios.post(
    //     "https://lazeapi-v2.onrender.com/api/auth/verify",
    //     {
    //       email: email,
    //       verification_code: otp.join(""),
    //     }
    //   );
    //   if (response) {
    //     route.push('/onboarding/sports')
    //   }
    // } catch (error) {
    //   if(error) route.push('/onboarding/sports')
    //   startCountdown();

    // }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(""));
    setIsSubmitted(false);
    startCountdown();
    console.log("resend");
    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL as string
        }/auth/resend-verification`,
        { email }
      );
      console.log(response);
      enqueueSnackbar("OTP resent check your email", { variant: "success" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
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
      <div
        className={`max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card mt-[50%] md:mt-2 dark:bg-[#121212] transition-colors duration-300`}
      >
        <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
          <Image
            src={logo}
            alt="logo"
            width={114}
            height={76}
            className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
          />
          <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center dark:text-white">
            Verify Account
          </h1>
          <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] dark:text-[#C9CDD4] text-center">
            Enter the OTP code sent to your email
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center gap-6 mt-6"
          >
            <div className="flex space-x-2 justify-center mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-[39px] h-[39px] text-[#3A3D46] dark:text-white text-center text-xl border rounded focus:outline-none focus:ring "
                  value={digit}
                  onChange={(e) => handleChange(e.target, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <GradientButton
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] text-[16px] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60 bg-[#2D439B] py-2 `}
            >
              {loading ? "Verifying..." : "Crate Account"}
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
                  <p className="text-sm text-gray-400">
                    Don&apos;t get the code? Resend in{" "}
                    <span className="text-[#9a1b39s]">{countdown}s</span>
                  </p>
                ) : (
                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-400">
                      Don&apos;t get the code?
                    </p>
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
        </div>
        <SnackbarProvider />
      </div>
  );
};

export default Verify;
