'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FiEyeOff } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import logo from '@/assets/logo2.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '@/types/validation';
import OtpInput from 'react-otp-input';
import { resetPassword } from '@/api/auth'
import { useRouter } from 'next/navigation';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

const ResetPasswordForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ password: string; confirm_password: string }>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: { password: string; confirm_password: string }) => {
        const response = await resetPassword({ otp, ...data });
        if (response.success) {
            enqueueSnackbar('Password reset successful', { variant: 'success' });
            router.push('/auth/login');
        } else {
            enqueueSnackbar(response?.data as string, { variant: 'error' });
        }
    };

    return (
        <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-[22px] md:shadow-card md:[32px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-[427px]">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">Reset Password</h1>
                <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center">
                    Password must be at least 8 characters
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Enter OTP</label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            height: '50px',
                            border: '1px solid #E4E6EC',
                            flexGrow: 1,
                            borderRadius: '4px',
                            outline: 'none'
                        }}
                        containerStyle={{gap: '6px'}}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                {/* Password */}
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="password" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Password</label>
                    <div className={`flex items-center gap-2 border rounded px-4 w-full h-[50px] ${errors.password ? 'border-red-500' : 'border-[#E4E6EC]'}`}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="*********"
                            className="w-full h-full focus:ring-[#2D439B] outline-none text-[16px] font-switzer pr-10 bg-transparent"
                            {...register('password')}
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />
                        {showPassword ? <FiEye onClick={() => setShowPassword(false)} className='cursor-pointer' /> : <FiEyeOff onClick={() => setShowPassword(true)} className='cursor-pointer' />}
                    </div>
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="confirmPassword" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Confirm Password</label>
                    <div className={`flex items-center gap-2 border rounded px-4 w-full h-[50px] ${errors.confirm_password ? 'border-red-500' : 'border-[#E4E6EC]'}`}>
                        <input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="*********"
                            className="w-full h-full focus:ring-[#2D439B] outline-none text-[16px] font-switzer pr-10 bg-transparent"
                            {...register('confirm_password')}
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />
                        {showPassword ? <FiEye onClick={() => setShowPassword(false)} className='cursor-pointer' /> : <FiEyeOff onClick={() => setShowPassword(true)} className='cursor-pointer' />}
                    </div>
                    {errors.confirm_password && <span className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</span>}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            <SnackbarProvider />
        </div>
    )
}

export default ResetPasswordForm