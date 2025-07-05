const points = [
  {
    level: "Bronze ",
    criteria: "Complete 5 predictions +3 challenges XP OR 100 total XP from both ",
    chealsea: "Thin bronze ring around profile picture",
  },
   {
    level: "Silver",
    criteria: "Complete 10 predictions +  5 challenges  OR 200 total XP",
    chealsea: "Silver ring around profile picture",
  },
   {
    level: "Gold",
    criteria: "15+ predictions + 8+ challenges XP OR 300+ total XP",
    chealsea: "Gold ring around profile picture",
  },

  
];

const BadgeLevelTable = () => {
    return <div className="mt-3">
        <p className="text-[#3A3D46] dark:text-[#FFFFFF] text-[13px] md:text-[16px] mb-1">BADGE LEVELS & REQUIREMENTS</p>
      <div className="overflow-x-auto border border-[#D9D9D9] dark:border-[#35383F] rounded-md shadow-sm">
        <table className="min-w-full text-[11px] md:text-[13px] text-left text-gray-700">
          <thead className="dark:text-[#FFFFFF] bg-gray-100 dark:bg-[#35383F]">
            <tr>
              {["Badge Levels", "Criteria (Combined XP or Milestones)", "Chelsea"].map(
                (h) => (
                  <th
                    key={h}
                    className="p-[8px] border-r border-gray-300 dark:border-[#3c3f46] last:border-r-0 font-medium"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {points.map((point, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-[#35383F]"
              >
                <td className="p-[8px] border-r border-b border-t dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                  {point.level}
                </td>
                <td className="p-[8px] border text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] font-medium">
                  {point.criteria}
                </td>
                <td className="p-[8px] border text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] font-medium">
                  {point.chealsea}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
}

export default BadgeLevelTable