import React from 'react'

const predictors = [
    { rank: '🥇', name: 'FootballGuru', xp: 15 },
    { rank: '🥈', name: 'Adajane', xp: 13 },
    { rank: '🥉', name: 'SpeedKick', xp: 12 },
    { rank: '4.', name: 'Juniorgame', xp: 11 },
    { rank: '5.', name: 'Speeddial', xp: 11 },
];

const TopPredictors = () => {
    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] shadow p-4 flex flex-col gap-4 w-full max-w-xs">
            <div className="flex flex-col gap-1 w-full">
                <span className="text-[16px] font-medium text-[#1E1E1E] dark:text-white">Top predictors this week</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {predictors.map((p) => (
                    <div key={p.name} className="text-[13px] font-medium text-[#3A3D46] dark:text-white flex items-center">
                        <span className="mr-2" style={{ minWidth: 24, display: 'inline-block', textAlign: 'center' }}>{p.rank}</span>
                        <span className="mr-1">@ {p.name}</span>
                        <span className="ml-auto"> {p.xp} XP</span>
                    </div>
                ))}
            </div>
            <button
                className="w-full py-2 px-4 bg-transparent text-[#2D439B] rounded-[4px] text-[13px] font-normal cursor-pointer hover:underline transition dark:text-[#2D439B]"
                style={{ border: 'none', boxShadow: 'none' }}
            >
                View Full Leaderboard
            </button>
        </div>
    )
}

export default TopPredictors