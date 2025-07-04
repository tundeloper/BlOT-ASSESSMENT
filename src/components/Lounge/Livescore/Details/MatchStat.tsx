import React from 'react'

const stats = [
    { stat: 'Possession', home: '58%', away: '42%' },
    { stat: 'Shots (on target)', home: '9 (4)', away: '6 (3)' },
    { stat: 'Corners', home: '5', away: '3' },
    { stat: 'Fouls', home: '7', away: '9' },
    { stat: 'Yellow cards', home: '1 (Modric)', away: '1 (Palmer)' },
    { stat: 'Red cards', home: '0', away: '0' },
    { stat: 'Saves', home: '2', away: '3' },
];

const MatchStat = () => {
    return (
        <div className="overflow-x-auto w-full mt-8">
            <table className="min-w-[400px] w-full border border-[#D9D9D9] dark:border-[#35383F] rounded-lg">
                <thead>
                    <tr className="bg-[#F9FAFB] dark:bg-[#2A2D34]">
                        <th className="text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Stat</th>
                        <th className="text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Manchester United</th>
                        <th className="text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Chelsea</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((row) => (
                        <tr key={row.stat} className="border-b border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                            <td className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2" style={{ fontFamily: 'Switzer, sans-serif' }}>{row.stat}</td>
                            <td className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>{row.home}</td>
                            <td className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>{row.away}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MatchStat