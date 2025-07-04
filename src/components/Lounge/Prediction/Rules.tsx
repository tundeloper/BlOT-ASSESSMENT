import React from 'react'

const Rules = () => {
    return (
        <div className="bg-white dark:bg-[#1A1C20] rounded-[4px] shadow p-4 w-full flex flex-col gap-4 mt-3">
            <span className="text-[16px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>
                Rules Summary
            </span>
            <ul className="text-[13px] font-normal flex flex-col gap-1 text-[#3A3D46] dark:text-white whitespace-pre-line list-disc list-inside" style={{ fontFamily: 'Switzer' }}>
                <li>You earn 10 XP for each correct match outcome.</li>
                <li>Predicting the exact final score gives you +15 XP total.</li>
                <li>You can submit only once per match. No edits allowed.</li>
                <li>Late predictions (after match start) will be invalid.</li>
                <li>Earn bonus XP for keeping a 7-day prediction streak active.</li>
            </ul>
        </div>
    )
}

export default Rules