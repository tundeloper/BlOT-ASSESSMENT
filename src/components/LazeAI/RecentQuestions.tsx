import React from 'react'

const questions = [
    'Who has the most assists in the Premier League 2025?',
    'Top 5 goalkeepers so far this season',
    'How did Nigeria perform in the last AFCON?',
    'Summarize the last Barcelona game.',
    'Compare Osimhen and Haaland',
];

const RecentQuestions = () => {
    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] p-4 flex flex-col gap-4 w-full max-w-xs">
            <div className="flex items-center w-full">
                <span className="font-medium text-[16px] leading-[1.32em] text-[#1E1E1E] dark:text-white font-sans">
                    You asked recently
                </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {questions.map((q, i) => (
                    <div key={i} className="flex items-center gap-2 w-full pl-2 cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-[#3A3D46] dark:bg-white inline-block"></span>
                        <span className="font-normal text-[13px] leading-[1.32em] text-[#3A3D46] dark:text-white font-sans w-full">
                            {q}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentQuestions