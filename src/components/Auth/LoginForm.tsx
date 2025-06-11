"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import logo from "@/assets/logo2.png";
import appleIcon from "@/assets/appleIcon.png";
import googleIcon from "@/assets/googleIcon.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/types/validation";
// import { loginUser } from '@/api/auth';
import { enqueueSnackbar, SnackbarProvider } from "notistack";
// import { useSearchParams } from 'next/navigation';
import { LoginPayload, User } from "@/types/auth";
import { post } from "@/utils/api.utils";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const state = useAuthStore();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const errorParams = searchParams.get("error");
  // const accessToken = searchParams.get("id_token");
  // console.log(errorParams, accessToken);

  // useEffect(() => {
  //     if (errorParams) {
  //         enqueueSnackbar(errorParams, { variant: 'error' });
  //     }
  //     if (accessToken) {
  //         enqueueSnackbar('Login successful', { variant: 'success' });
  //     }
  // }, [errorParams, accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Pick<LoginPayload, "email" | "password">>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: Pick<LoginPayload, "email" | "password">) => {
    try {
      const response = await post<{ user: User; token: string }, typeof data>({
        url: "/auth/login",
        data,
      });
      if (response.success) {
        enqueueSnackbar("Login successful", { variant: "success" });
        state.setUser(response.data.user, response.token as string);
        console.log(response)
        router.replace("/feed");
      } else {
        enqueueSnackbar(response.message || "Invalid credentials", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      enqueueSnackbar("An unexpected error occurred. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card mt-[10%] md:mt-2 dark:bg-[#121212] transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 w-[427px]">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={76}
          className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
        />
        <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center dark:text-white">
          Welcome Back!
        </h1>
        <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center dark:text-[#C9CDD4]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#2D439B] hover:text-[#9A1B39] transition-colors"
          >
            Signup
          </Link>
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46] dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className={`w-full px-4 h-[50px] border text-[#7A7F8C] dark:text-white rounded outline-none text-[16px] font-switzer ${
              errors.email ? "border-red-500" : "border-[#E4E6EC]"
            }`}
            {...register("email")}
            autoComplete="email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="password"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46] dark:text-white"
          >
            Password
          </label>
          <div
            className={`flex items-center gap-2 border rounded px-4 w-full h-[50px] ${
              errors.password ? "border-red-500" : "border-[#E4E6EC]"
            }`}
          >
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              className="w-full h-full text-[#7A7F8C] focus:ring-[#2D439B] outline-none text-[16px] font-switzer pr-10 bg-transparent dark:text-white"
              {...register("password")}
              autoComplete="current-password"
              disabled={isSubmitting}
            />
            {showPassword ? (
              <FiEye
                onClick={() => setShowPassword(false)}
                className="cursor-pointer"
              />
            ) : (
              <FiEyeOff
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-[13px] text-[#3A3D46] dark:text-[#7A7F8C] hover:text-[#2D439B] font-switzer underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.04)" }}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-[#E4E6EC]" />
        <span className="text-[13px] text-[#3A3D46] dark:text-[#C9CDD4] font-switzer">
          Or Continue with
        </span>
        <div className="flex-1 h-px bg-[#E4E6EC]" />
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-4 w-full">
        {/* Apple */}
        <button className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all">
          <Image src={appleIcon} alt="apple icon" width={15} height={15} />
          <span className="font-switzer font-medium text-[16px] text-[#3A3D46] dark:text-[#C9CDD4]">
            Apple
          </span>
        </button>
        {/* Google */}
        <button
          onClick={() => {
            const url =
              `https://accounts.google.com/o/oauth2/v2/auth?` +
              `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
              `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}` +
              `&response_type=token` +
              `&scope=openid%20email%20profile` +
              `&response_mode=fragment`;
            window.open(url, "_self");
          }}
          className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all"
        >
          <Image src={googleIcon} alt="google icon" width={20} height={20} />
          <span className="font-switzer font-medium text-[16px] text-[#3A3D46] dark:text-[#C9CDD4]">
            Google
          </span>
        </button>
      </div>
      <SnackbarProvider />
    </div>
  );
};

export default LoginForm;
