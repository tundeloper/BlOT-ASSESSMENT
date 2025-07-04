import React from 'react'

const badgeRows = [
    { badge: 'Bronze', desc: 'Complete 5 predictions +3 challenges OR 100 total XP from both', reward: 'Bronze ring around your avatar' },
    { badge: 'Silver', desc: 'Complete 10 predictions +  5 challenges  OR 200 total XP', reward: 'Silver ring around your avatar' },
    { badge: 'Gold', desc: '15+ predictions + 8+ challenges OR 300+ total XP', reward: 'Gold ring around your avatar' },
];

const Badges = () => {
    return (
        <div className='mt-2'>
            <h1 className="text-[16px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>Badge & Requirements</h1>
            <div className="bg-white dark:bg-[#1A1C20] rounded-[4px] border border-[#D9D9D9] dark:border-[#35383F] shadow w-full mt-3">
                <table className="w-full text-left text-[13px] font-normal" style={{ fontFamily: 'Switzer' }}>
                    <thead className='bg-[#F9FAFB] dark:bg-[#23262F]'>
                        <tr className="border-b border-[#D9D9D9] dark:border-[#35383F]">
                            <th className="py-3 px-4 w-[10%] text-[#3A3D46] dark:text-white font-medium">Badge</th>
                            <th className="py-3 px-4 w-[40%] text-[#3A3D46] dark:text-white font-medium border-l border-[#D9D9D9] dark:border-[#35383F]">Criteria (Combined XP or Milestones)</th>
                            <th className="py-3 px-4 w-[50%] text-[#3A3D46] dark:text-white font-medium border-l border-[#D9D9D9] dark:border-[#35383F]">Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {badgeRows.map((row) => (
                            <tr key={row.badge} className="border-b border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                                <td className="py-3 px-4 w-[10%] text-[#3A3D46] dark:text-white">{row.badge}</td>
                                <td className="py-3 px-4 w-[50%] text-[#3A3D46] dark:text-white border-l border-[#D9D9D9] dark:border-[#35383F]">{row.desc}</td>
                                <td className="py-3 px-4 w-[40%] text-[#3A3D46] dark:text-white border-l border-[#D9D9D9] dark:border-[#35383F]">{row.reward}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Badges