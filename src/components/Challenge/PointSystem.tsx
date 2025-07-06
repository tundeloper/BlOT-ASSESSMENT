const points = [
  {
    actions: "Correct Answer",
    point: "+10 XP",
  },
   {
    actions: "Incorrect",
    point: "+0 XP",
  },
   {
    actions: "Quiz question (correct answer)",
    point: "+5 XP",
  },
  {
    actions: "Completing 3 challenges in a week",
    point: "+5",
  },
  
];

const PointSystem = () => {
    return <div className="mt-2">
        <p className="text-[#3A3D46] dark:text-[#FFFFFF] text-[13px] md:text-[16px] mb-1">Basic Point System:</p>
      <div className="overflow-x-auto border border-[#D9D9D9] dark:border-[#35383F] rounded-md shadow-sm">
        <table className="min-w-full text-[11px] md:text-[13px] text-left text-gray-700">
          <thead className="dark:text-[#FFFFFF] bg-gray-100 dark:bg-[#35383F]">
            <tr>
              {["Actions", "Points Earned",].map(
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
                  {point.actions}
                </td>
                <td className="p-[8px] border text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] font-medium">
                  {point.point}
                </td>
        
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
}

export default PointSystem