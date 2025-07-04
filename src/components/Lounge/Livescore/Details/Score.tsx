import React from 'react'

const Score = () => {
    return (
        <div className="flex justify-center items-center gap-6 w-full mt-7">
            <div className="w-[50px] md:w-[120px] h-[50px] md:h-[120px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 text-2xl">Image</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-[20px] md:text-[31px] leading-[1.32] text-[#1E1E1E] dark:text-white text-center" style={{ fontFamily: 'Switzer, sans-serif' }}>1   :   1</span>
                <span className="font-normal text-[10px] md:text-[13px] leading-[1.32] text-[#3A3D46] dark:text-white text-center" style={{ fontFamily: 'Switzer, sans-serif' }}>Premier League. Old Trafford</span>
            </div>
            <div className="w-[50px] md:w-[120px] h-[50px] md:h-[120px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-gray-400 text-2xl">Image</span>
            </div>
        </div>
    )
}

export default Score