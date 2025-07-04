import React from 'react'

const manUtd = [
    'Ter stegen',
    'Kounde',
    'Araujo',
    'Christen',
    'Balde',
    'Gavi',
    'De jong',
    'Pedri',
    'Raphinha',
    'Lewandowski',
];

const chelsea = [
    'Courtois',
    'carvajal',
    'Rudiger',
    'Alaba',
    'mendy',
    'Modric',
    'Kroos',
    'Valverde',
    'Vinicius',
    'Benzema',
];

const Formation = () => {
    return (
        <div className="w-full mt-8">
            <div className="mb-2">
                <h2 className="font-medium text-[13px] md:text-[16px] text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer, sans-serif' }}>Formations</h2>
                <div className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white mt-1" style={{ fontFamily: 'Switzer, sans-serif' }}>
                    Manchester United: 4-3-3<br />Chelsea: 4-3-3
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-[300px] w-full border border-[#D9D9D9] dark:border-[#35383F] rounded-lg table-fixed">
                    <thead>
                        <tr className="bg-[#F9FAFB] dark:bg-[#2A2D34]">
                            <th className="w-1/2 text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Manchester United</th>
                            <th className="w-1/2 text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Chelsea</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <tr key={i} className="border-b border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                                <td className="w-1/2 text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2" style={{ fontFamily: 'Switzer, sans-serif' }}>{manUtd[i]}</td>
                                <td className="w-1/2 text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>{chelsea[i]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Formation