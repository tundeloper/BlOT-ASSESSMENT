import React from 'react'

const events = [
  { minute: "63' ", event: 'Substitution: Rodrygo IN, Vinicius OUT' },
  { minute: "60' ", event: 'Yellow card- Modric' },
  { minute: "54' ", event: 'Goal - Benzema ( Man-u)' },
  { minute: "23' ", event: 'Goal - Lewandowski (chelsea)' },
];

const MatchEvents = () => {
  return (
    <div className="overflow-x-auto w-full mt-8">
      <table className="min-w-[300px] w-full border border-[#D9D9D9] dark:border-[#35383F] rounded-lg">
        <thead>
          <tr className="bg-[#F9FAFB] dark:bg-[#2A2D34]">
            <th className="text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Minute</th>
            <th className="text-left font-medium text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-b border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map((row) => (
            <tr key={row.minute + row.event} className="border-b border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
              <td className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2" style={{ fontFamily: 'Switzer, sans-serif' }}>{row.minute}</td>
              <td className="text-[11px] md:text-[13px] text-[#3A3D46] dark:text-white px-4 py-2 border-l border-[#D9D9D9] dark:border-[#35383F]" style={{ fontFamily: 'Switzer, sans-serif' }}>{row.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MatchEvents