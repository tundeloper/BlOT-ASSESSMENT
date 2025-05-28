"use client";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import GradientButton from "../ui/gradientButton";
import { Eye, EyeOff } from "lucide-react";
import countries from "world-countries";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "@/utils/googleLoginBtn";

interface FormData {
    name: string,
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

const countryList: CountryOption[] = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
}));

const Signup = () => {

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
    <div className="md:max-w-[550px] w-full md:bg-white rounded flex flex-col items-center gap-1 p-8 md:shadow-card md:p-8">
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
        <Image
          src={logo}
          alt="logo"
          width={114}
          height={76}
          className="w-[75px] md:w-[114px] h-[50px] md:h-[76px]"
        />
        <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">
          Create Account
        </h1>
        <p className="text-[16px] md:text-[16px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">Already have an account? Login</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">
            Full Name
          </label>
          <input
            type="name"
            id="name"
            {...register("name", {
              required: "Full name is required",
             minLength: {
                value: 2,
                message: "Full Name is required",
              },
            })}
            className={`w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
            className={`w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring ${
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
            className={`w-full px-3 py-2 pr-10 border rounded text-black focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter password"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black"/>}
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
            className={`w-full px-3 py-2 pr-10 border rounded text-black focus:outline-none focus:ring ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Re-enter password"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black" />}
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
            className={`w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select country</option>
            {countryList.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
                {
                  // <img
                  //   src={c.flag}
                  //   alt={c.label}
                  //   className="inline-block w-4 h-4 ml-2"
                  //   style={{ verticalAlign: "middle" }}
                  // />
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
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className={`form-checkbox accent-primary h-5 w-5 cursor-pointer border-gray-300 bg-transparent text-primary rounded focus:ring-2 focus:ring-primary transition duration-200 ease-in-out ${
                errors.terms ? "border-red-500" : ""
              }`}
            />
            <span className="ml-2">
              Terms and Conditions
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}
        </div>

        <GradientButton
          type="submit"
          className="w-full bg-sky-300 font-semibold text-white py-2 rounded hover:bg-blue-900 transition"
        >
          Create Account
        </GradientButton>
        {/* <<button
          type="submit"
          className="w-full bg-primary font-semibold text-white py-2 rounded hover:bg-blue-900 transition"
          >
          Register
          </button>> */}
      </form>
      <div className="flex justify-between items-center gap-10 my-4">
        <div className="flex-1 h-[.2px] bg-black dark:bg-white" />
        Or Continue With
        <div className="flex-1 h-[.1px] bg-black dark:bg-white" />
      </div>
      <GoogleLoginButton title="Google" rounded={1} />
    </div>
  );
};

export default Signup;
