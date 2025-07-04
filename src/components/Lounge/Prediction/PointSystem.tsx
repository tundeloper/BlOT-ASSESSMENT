import React from 'react'

const pointRows = [
    { action: 'Correct Match Outcome', points: '+10' },
    { action: 'Incorrect Prediction', points: '0' },
    { action: 'Daily Prediction Streak', points: '+5' },
    { action: 'Exact Score Prediction', points: '+15' },
];

const PointSystem = () => {
    return (
        <div className='mt-2'>
            <h1 className="text-[16px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Basic Point System</h1>
            <div className="bg-white dark:bg-[#1A1C20] rounded-[4px] border border-[#D9D9D9] dark:border-[#35383F] shadow w-full mt-3">
                <table className="w-full text-left text-[13px] font-normal" style={{ fontFamily: 'Switzer' }}>
                    <thead className='bg-[#F9FAFB] dark:bg-[#23262F]'>
                        <tr className="border-b border-[#D9D9D9] dark:border-[#35383F]">
                            <th className="py-3 px-4 w-1/2 text-[#3A3D46] dark:text-white font-medium">Action</th>
                            <th className="py-3 px-4 w-1/2 text-[#3A3D46] dark:text-white font-medium border-l border-[#D9D9D9] dark:border-[#35383F]">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pointRows.map((row) => (
                            <tr key={row.action} className="border-b border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                                <td className="py-3 px-4 w-1/2 text-[#3A3D46] dark:text-white">{row.action}</td>
                                <td className="py-3 px-4 w-1/2 text-[#3A3D46] dark:text-white border-l border-[#D9D9D9] dark:border-[#35383F]">{row.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PointSystem