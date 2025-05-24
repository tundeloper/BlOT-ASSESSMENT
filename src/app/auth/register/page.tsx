"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthCard from "@/components/auth/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import countries from "world-countries";
import GradientButton from "@/components/ui/gradientButton";
import GoogleLoginButton from "@/utils/googleLoginBtn";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  terms: boolean;
}

interface CountryOption {
  label: string;
  value: string;
  flag: string;
}

const country = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
];

const countryList: CountryOption[] = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
}));

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const password = watch("password", "");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log("RegisterForm rendered", countryList);

  const onSubmit = (data: FormData) => {
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold mb-1 text-center">Create Account</h1>
      <p className="font-bold mb-6 text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter password"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block mb-1 font-semibold">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Re-enter password"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1 font-semibold">
            Country
          </label>
          <select
            id="country"
            {...register("country", {
              required: "Please select your country",
            })}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select country</option>
            {countryList.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
                {
                  <img
                    src={c.flag}
                    alt={c.label}
                    className="inline-block w-4 h-4 ml-2"
                    style={{ verticalAlign: "middle" }}
                  />
                }
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className={`form-checkbox h-5 w-5 text-blue-600 ${
                errors.terms ? "border-red-500" : ""
              }`}
            />
            <span className="ml-2 text-gray-700">
              I accept the terms and conditions
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}
        </div>

        <GradientButton
          type="submit"
          className="w-full bg-primary font-semibold text-white py-2 rounded hover:bg-blue-900 transition"
        >
          Create Account
        </GradientButton>
        <div className="flex justify-between items-center gap-10 my-2">
          <div className="flex-1 h-[.2px] bg-black" />
          Or Continue With 
          <div className="flex-1 h-[.1px] bg-black" />
        </div>
        {/* <<button
          type="submit"
          className="w-full bg-primary font-semibold text-white py-2 rounded hover:bg-blue-900 transition"
          >
          Register
          </button>> */}
      </form>
          <GoogleLoginButton title="Google" rounded={1}></GoogleLoginButton>
    </AuthCard>
  );
}
