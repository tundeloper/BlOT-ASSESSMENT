import React from 'react'
import lazeIcon from '@/assets/lazeIcon.png'
import Image from 'next/image'

const InfoCard = () => {
    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] p-4 flex flex-col items-center gap-4 w-full max-w-xs">
            <div className="w-[70px] h-[70px] flex items-center justify-center mb-0">
                <Image src={lazeIcon} alt="LazeAI Icon" width={70} height={70} className='w-full h-full object-cover' />
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="font-medium text-[16px] dark:text-white leading-[1.32em] text-[#1E1E1E] font-sans">Laze AI</span>
                <span className="font-medium text-[13px] dark:text-white leading-[1.32em] text-[#3A3D46] text-center font-sans">
                    Your smart assistant for all things football.
                </span>
            </div>
        </div>
    )
}

export default InfoCard