import React from 'react'

const suggestions = [
    'Top 5 goalkeepers so far this season',
    'Summarize the last Barcelona game.',
    'Compare Osimhen and Haaland',
    "Write a fun caption about Messi's 8th Ballon d'Or",
    'Who will win the next EL Clasico',
    "show me Chelsea's recent form.",
    "When is Arsenal's next match?",
    'Create a motivational quote for my lounge post',
    'Which teams are likely to qualify for UCL',
    'Who has the most assists in the Premier League 2025?',
    'Top 5 goalkeepers so far this season',
    'How did Nigeria perform in the last AFCON?',
];

const Suggestions = () => {
    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] p-4 flex flex-col gap-4 w-full max-w-xs">
            <div className="flex items-center w-full">
                <span className="font-medium text-[16px] leading-[1.32em] text-[#1E1E1E] dark:text-white font-sans">
                    Try saying
                </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {suggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 w-full pl-2 cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-[#3A3D46] dark:bg-white inline-block"></span>
                        <span className="font-normal text-[13px] leading-[1.32em] text-[#3A3D46] dark:text-white font-sans w-full">
                            {s}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Suggestions