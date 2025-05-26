'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FiEyeOff } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import logo from '@/assets/logo2.png'

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-[427px]">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">Reset Password</h1>
                <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center">
                    Password must be at least 8 characters
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full">
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
                {/* Confirm Password */}
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="confirmPassword" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Confirm Password</label>
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

                <button className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default ResetPasswordForm