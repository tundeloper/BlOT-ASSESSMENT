import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import LinearProgress from '@mui/material/LinearProgress';

const votingOptions = [
    { label: 'Chelsea', percent: 25 },
    { label: 'Draw', percent: 50 },
    { label: 'Man City', percent: 25 },
];

const PredictionCard = () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="bg-[#F9FAFB] dark:bg-[#1A1C20] rounded-[4px] border border-[#D9D9D9] dark:border-[#35383F] shadow p-4 flex flex-col gap-4 w-full md:max-w-xs">
            <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Chelsea</span>
                <span className="text-[16px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Man City</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex flex-row items-center justify-center gap-6 w-full">
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                        {/* Replace with club image if available */}
                    </div>
                    <span
                        className="text-[16px] font-medium"
                        style={{
                            fontFamily: 'Switzer',
                            background: 'linear-gradient(180deg, #2D439B 0%, #6A2B70 50%, #9A1B39 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Vs
                    </span>
                    {/* Club 2 placeholder */}
                    <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                        {/* Replace with club image if available */}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 mt-1">
                    <span className="text-[10px] font-medium text-[#7A7F8C] dark:text-white" style={{ fontFamily: 'Switzer' }}>
                        Sunday, 20 October - 6:00pm WAT
                    </span>
                    <span className="text-[10px] font-medium text-[#9A1B39]" style={{ fontFamily: 'Switzer' }}>
                        02 : 14 : 16
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span className="text-[13px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Voting options</span>
                <div className="flex flex-col gap-2 w-full">
                    {votingOptions.map((option, idx) => (
                        <div key={option.label} className="flex gap-1 w-full">
                            <Radio
                                checked={selected === idx}
                                onChange={() => setSelected(idx)}
                                value={option.label}
                                name="prediction-radio"
                                sx={{
                                    color: '#2D439B',
                                    '&.Mui-checked': {
                                        color: '#2D439B',
                                    },
                                    padding: 0,
                                    marginRight: 1,
                                }}
                            />
                            <div className='flex flex-col gap-1 w-full'>
                                <div className="flex flex-row justify-between items-center gap-2 w-full">
                                    <span className="flex-1 text-[13px] text-[#3A3D46] dark:text-white font-normal" style={{ fontFamily: 'Switzer' }}>{option.label}</span>
                                    <span className="text-[10px] text-[#2D439B] font-semibold ml-2" style={{ fontFamily: 'Switzer' }}>[{option.percent}% votes]</span>
                                </div>
                                <LinearProgress
                                    variant="determinate"
                                    value={option.percent}
                                    sx={{
                                        height: 6,
                                        borderRadius: 4,
                                        backgroundColor: '#E4E6EC',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#2D439B',
                                            borderRadius: 4,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-1 w-full mt-1">
                        <Radio
                            checked={selected === votingOptions.length}
                            onChange={() => setSelected(votingOptions.length)}
                            value="Other"
                            name="prediction-radio"
                            sx={{
                                color: '#2D439B',
                                '&.Mui-checked': {
                                    color: '#2D439B',
                                },
                                padding: 0,
                                marginRight: 1,
                            }}
                        />
                        <div className='flex flex-col gap-1 w-full'>
                            <div className="flex flex-row justify-between items-center gap-2 w-full">
                                <span className="flex-1 text-[13px] text-[#3A3D46] dark:text-white font-normal" style={{ fontFamily: 'Switzer' }}>Final Score</span>
                            </div>
                            <div className="flex flex-row items-center gap-2 w-full">
                                <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Chelsea</span>
                                <button className="px-2 min-w-[25px] h-6 rounded-[2px] border border-[#D9D9D9] bg-white text-[13px] font-normal text-[#3A3D46] shadow-sm flex items-center justify-center" style={{ fontFamily: 'Switzer' }}>1</button>
                                <span className="text-[13px] font-bold text-[#3A3D46]">:</span>
                                <button className="px-2 min-w-[25px] h-6 rounded-[2px] border border-[#D9D9D9] bg-white text-[13px] font-normal text-[#3A3D46] shadow-sm flex items-center justify-center" style={{ fontFamily: 'Switzer' }}>1</button>
                                <span className="text-[13px] font-normal text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Man City</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="w-full py-2 bg-[#2D439B] text-white rounded-[2px] text-[13px] font-normal shadow-sm hover:bg-[#22337a] transition mt-2" style={{ fontFamily: 'Switzer' }}>
                Submit Prediction
            </button>
        </div>
    );
};

export default PredictionCard;