import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo2.png'

const ForgotPasswordForm = () => {
    return (
        <div className="max-w-[500px] w-full md:bg-white rounded flex flex-col items-center gap-8 p-8 md:shadow-card">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-[427px]">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[31px] font-switzer leading-[1.32em] text-[#3A3D46] text-center">Forgot Password?</h1>
                <p className="text-[13px] md:text-[16px] font-switzer text-[#7A7F8C] text-center max-w-[327px] md:max-w-[427px]">
                    Enter your email address and we’ll email you a password reset link
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
                <button className="w-full h-[50px] text-[16px] bg-[#2D439B] text-white hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer font-normal rounded shadow-md" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                    Send Link
                </button>
            </form>
        </div>
    )
}

export default ForgotPasswordForm