"use client";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import GradientButton from "../ui/gradientButton";
import { Eye, EyeOff } from "lucide-react";
import countries from "world-countries";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import appleIcon from "@/assets/appleIcon.png";
import googleIcon from "@/assets/googleIcon.png";
import Select from "react-select";
import { GroupBase, StylesConfig } from "react-select";
import { useRouter } from "next/navigation";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useAuthStore } from "@/store/authstore";

interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  country: CountryOption | null;
  terms_accepted: boolean;
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

const customStyles: StylesConfig<
  CountryOption,
  false,
  GroupBase<CountryOption>
> = {
  control: (base, state) => ({
    ...base,
    height: "50px",
    borderRadius: "6px",
    borderColor: state.isFocused ? "#2D439B" : "#E4E6EC",
    boxShadow: "none",
    fontSize: "16px",
    fontFamily: "switzer",
  }),
  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "switzer",
    backgroundColor: state.isSelected ? "#F0F4FF" : "#fff",
    color: "#3A3D46",
  }),
  singleValue: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  // This removes the vertical separator between value and arrow
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const formatOptionLabel = ({ label, flag }: CountryOption) => (
  <div className="flex items-center gap-2">
    <Image
      src={flag}
      alt={label}
      width={112}
      height={112}
      className="w-5 h-4 object-cover rounded"
    />
    <span>{label}</span>
  </div>
);

const Signup = () => {
  const router = useRouter();
  const state = useAuthStore()

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1)); // remove '#' and parse
    const accessToken = params.get("access_token");

    if (accessToken) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, {
          access_token: accessToken,
        })
        .then((data) => {
          console.log(data);
          state.setUser(data.data.data, data.data.token)
          router.replace('/home')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      country: null,
    },
  });

  const password = watch("password", "");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/auth/register`,
        { ...data, country: data.country?.label || "" }
      );

      if (response.data?.success) {
        router.push(`/auth/verify/?email=${data.email}`);
        enqueueSnackbar("Registration successful", { variant: "success" });
      } else {
        enqueueSnackbar(
          response.data?.message || "User already exists with this email",
          { variant: "error" }
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error");
        const message =
          error.response?.data?.detail ||
          "Registration failed. Please try again.";
        enqueueSnackbar(message || "Registration failed. Please try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }

    // const formattedData = {
    //   ...data,
    //   country: data.country?.label || "",
    // };
    // alert(
    //   "Form submitted successfully!\n" + JSON.stringify(formattedData, null, 2)
    // );
  };

  return (
    <div className="md:max-w-[550px] w-full md:bg-white rounded flex flex-col items-center gap-1 p-[22px] md:shadow-card md:p-[34]">
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7 lg:mt-[10rem]">
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
        <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#2D439B] hover:text-[#9A1B39] transition-colors"
          >
            Login
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]"
          >
            Full Name
          </label>
          <input
            id="name"
            {...register("full_name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters",
              },
            })}
            className={`w-full px-4 h-[50px] border rounded outline-none text-[16px] font-switzer ${
              errors.full_name ? "border-red-500" : "border-[#E4E6EC]"
            }`}
            placeholder="Full Name"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 h-[50px] border rounded outline-none text-[16px] font-switzer ${
              errors.email ? "border-red-500" : "border-[#E4E6EC]"
            }`}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: {
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasLowercase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
              },
            })}
            className={`w-full px-4 h-[50px] border rounded outline-none text-[16px] font-switzer ${
              errors.password ? "border-red-500" : "border-[#E4E6EC]"
            }`}
            placeholder="********"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full px-4 h-[50px] border rounded outline-none text-[16px] font-switzer ${
              errors.confirm_password ? "border-red-500" : "border-[#E4E6EC]"
            }`}
            placeholder="********"
          />
          <div
            className="absolute top-9 right-3 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]"
          >
            Country
          </label>
          <Controller
            control={control}
            name="country"
            rules={{ required: "Please select your country" }}
            render={({ field }) => (
              <Select
                {...field}
                options={countryList}
                getOptionValue={(e) => e.value}
                formatOptionLabel={formatOptionLabel}
                styles={customStyles}
                placeholder="Select country"
                className={`${
                  errors.country ? "border-red-500" : "border-[#E4E6EC]"
                }`}
              />
            )}
          />
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
              {...register("terms_accepted", {
                required: "You must accept the terms and conditions",
              })}
              className={`form-checkbox accent-[#9a1b39] h-5 w-5 cursor-pointer bg-transparent text-primary rounded focus:ring-1 focus:ring-primary transition duration-200 ease-in-out ${
                errors.terms_accepted ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span className="text-[13px] ml-2 md:text-[16px] font-switzer text-[#3A3D46]">
              Terms and Conditions
            </span>
          </label>
          {errors.terms_accepted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.terms_accepted.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <GradientButton
          type="submit"
          disabled={loading}
          className="w-full h-[50px] text-[16px] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60 bg-[#2D439B] py-2 "
        >
          {loading ? "Loading..." : "Create Account"}
        </GradientButton>
      </form>

      {/* Divider */}
      <div className="flex items-center w-full gap-4 my-3">
        <div className="flex-1 h-px bg-[#E4E6EC]" />
        <span className="text-[13px] text-[#3A3D46] font-switzer">
          Or Continue with
        </span>
        <div className="flex-1 h-px bg-[#E4E6EC]" />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all">
          <Image src={appleIcon} alt="apple icon" width={15} height={15} />
          <span className="font-switzer font-medium text-[16px] text-[#3A3D46]">
            Apple
          </span>
        </button>
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
          <span className="font-switzer font-medium text-[16px] text-[#3A3D46]">
            Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
