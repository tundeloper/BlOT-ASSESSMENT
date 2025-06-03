import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo2.png'

const Welcome = () => {
    return (
        <div className="md:max-w-[550px] w-full md:bg-white rounded flex flex-col items-center gap-6 p-8 md:shadow-card mt-[50%] md:mt-0">
            <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
                <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
                <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center"><span className='mr-2'>🎉</span> Welcome, Chinagozie!</h1>
                <p>Your Sportlaze experience is ready!</p>
            </div>
            <button className="w-[100%] flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]" style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}>
                Go to Dashboard
            </button>
        </div>
    )
}

export default Welcome