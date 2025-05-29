import { useEffect, useRef, useState } from "react";
import GradientButton from "../ui/gradientButton";
import logo from "@/assets/logo2.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams()
  const email = (searchParams.get('email'))

  const isOtpComplete = otp.every((digit) => digit !== "");

  const startCountdown = () => {
    setCountdown(10); // 60 seconds
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
    console.log(email)
    startCountdown();
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setIsSubmitted(false);
    startCountdown();
    enqueueSnackbar("OTP resent check your email", { variant: "success" });
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
      className={`md:max-w-[550px] w-full md:bg-white rounded flex flex-col items-center gap-1 p-8 md:shadow-card md:p-8`}
    >
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={76}
          className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
        />
        <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">
          Verify Account
        </h1>
        <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center">
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
                className="w-12 h-12 text-center text-xl text-[#111827] border rounded focus:outline-none focus:ring "
                value={digit}
                onChange={(e) => handleChange(e.target, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <GradientButton
            type="submit"
            disabled={!isOtpComplete}
            className={`w-full h-[50px] text-[16px] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60 bg-[#2D439B] py-2 `}
          >
            Crate Account
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
                  <span className="text-[#9a1b39s]">
                    {countdown}s
                  </span>
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
    </div>
  );
};

export default Verify;
