'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo2.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '@/types/validation';
import { forgotPassword } from '@/api/auth';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: { email: string }) => {
        const response = await forgotPassword(data);
        if (response.success) {
            enqueueSnackbar('Password reset link sent', { variant: 'success' });
            router.push('/auth/reset-password');
        } else {
            enqueueSnackbar(response?.data as string, { variant: 'error' });
        }
    };

    return (
        <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card mt-[50%] md:mt-0 dark:bg-[#121212] transition-colors duration-300">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-[427px]">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center dark:text-white">Forgot Password?</h1>
                <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center max-w-[327px] md:max-w-[427px] ">
                    Enter your email address and we&apos;ll email you a password reset link
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] md:text-[16px] font-switzer text-[#3A3D46]">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={`w-full px-4 h-[50px] border rounded outline-none text-[16px] font-switzer ${errors.email ? 'border-red-500' : 'border-[#E4E6EC]'}`}
                        {...register('email')}
                        autoComplete="email"
                        disabled={isSubmitting}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md disabled:opacity-60" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                    {isSubmitting ? 'Sending...' : 'Send Link'}
                </button>
            </form>
            <SnackbarProvider />
        </div>
    )
}

export default ForgotPasswordForm