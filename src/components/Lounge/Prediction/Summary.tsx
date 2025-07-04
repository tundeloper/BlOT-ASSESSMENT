import React from 'react'
import { GoDotFill } from "react-icons/go";

const summaryData = [
    'You have made three predictions this week',
    'Your accuracy : 60%',
    'You\'re ranked #12 in Football Lounge',
    'You\'re on a 4-game correct streak',
];

const Summary = () => {
    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] shadow p-4 flex flex-col gap-4 w-full max-w-xs">
            <div className="flex flex-col gap-1 w-full">
                <span className="text-[16px] font-medium text-[#2D439B] dark:text-[#2D439B]">Your prediction summary</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {summaryData.map((line) => (
                    <div key={line} className="flex flex-row gap-2 items-center">
                        <GoDotFill
                            size={12}
                            className="text-[#3A3D46] dark:text-white"
                        />
                        <span key={line} className="text-[13px] font-normal text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>{line}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary