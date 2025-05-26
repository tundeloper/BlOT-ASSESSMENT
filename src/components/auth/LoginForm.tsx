'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import logo from '@/assets/logo2.png'
import appleIcon from '@/assets/appleIcon.png'
import googleIcon from '@/assets/googleIcon.png'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-[427px]">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">Welcome Back!</h1>
                <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/signup" className="text-[#2D439B] hover:text-[#9A1B39] transition-colors">Signup</Link>
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full">
                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                        className="w-full px-4 h-[50px] border border-[#E4E6EC] rounded outline-none text-[16px] font-switzer"
                    />
                </div>
                {/* Password */}
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="password" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Password</label>
                    <div className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 w-full h-[50px]">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="*********"
                            required
                            className="w-full h-full focus:ring-[#2D439B] outline-none text-[16px] font-switzer pr-10"
                        />
                        {showPassword ? <FiEye onClick={() => setShowPassword(false)} className='cursor-pointer' /> : <FiEyeOff onClick={() => setShowPassword(true)} className='cursor-pointer' />}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link href="/auth/forgot-password" className="text-[13px] text-[#3A3D46] hover:text-[#2D439B] font-switzer underline">Forgot Password?</Link>
                </div>
                <button className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                    Login
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center w-full gap-4">
                <div className="flex-1 h-px bg-[#E4E6EC]" />
                <span className="text-[13px] text-[#3A3D46] font-switzer">Or Continue with</span>
                <div className="flex-1 h-px bg-[#E4E6EC]" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-4 w-full">
                {/* Apple */}
                <button className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all">
                    <Image src={appleIcon} alt="apple icon" width={15} height={15} />
                    <span className="font-switzer font-medium text-[16px] text-[#3A3D46]">Apple</span>
                </button>
                {/* Google */}
                <button className="flex items-center gap-2 border border-[#E4E6EC] rounded px-4 py-3 w-full cursor-pointer justify-center hover:bg-gray-50 transition-all">
                    <Image src={googleIcon} alt="google icon" width={20} height={20} />
                    <span className="font-switzer font-medium text-[16px] text-[#3A3D46]">Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginForm;