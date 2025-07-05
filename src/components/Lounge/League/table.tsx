import React from "react";
import ScoreLeague from "../Livescore/ScoreLeague";

const teams = [
  {
    id: 1,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 2,
    name: "Chelsea",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 3,
    name: "Manchester United",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 4,
    name: "Arsenal",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 5,
    name: "Liverpool",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 6,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 7,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 8,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 9,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
  {
    id: 10,
    name: "Man City",
    P: 30,
    W: 20,
    D: 5,
    L: 5,
    GF: 62,
    GA: 62,
    GD: 0,
    PTS: 65,
  },
];

const LeagueTable = () => {
  return (
    <div className="p w-full">
      {/* Table wrapper */}
      <p className="text-[#3A3D46] dark:text-[#FFFFFF] text-[13px] mb-1">League Table</p>
      <div className="overflow-x-auto border border-[#D9D9D9] dark:border-[#35383F] rounded-md shadow-sm">
        <table className="min-w-full text-[11px] md:text-[13px] text-left text-gray-700">
          <thead className="dark:text-[#FFFFFF] bg-gray-100 dark:bg-[#35383F]">
            <tr>
              {["#", "Teams", "P", "W", "D", "L", "GF", "GA", "GD", "PTS"].map(
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
            {teams.map((team) => (
              <tr
                key={team.id}
                className="hover:bg-gray-50 dark:hover:bg-[#35383F]"
              >
                <td className="p-[8px] border-r border-b border-t dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] last:border-b-0">
                  {team.id}
                </td>
                <td className="p-[8px] border text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] font-medium">
                  {team.name}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.P}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.W}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.D}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.L}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.GF}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.GA}
                </td>
                <td className="p-[8px] border last:border-b-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F]">
                  {team.GD}
                </td>
                <td className="p-[8px] border-l border border-r-0 text-[#3A3D46] dark:text-[#FFFFFF] border-[#D9D9D9] dark:border-[#35383F] font-medium">
                  {team.PTS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Performers  */}
      <div className="my-3 gap-2 mb-2">
        <h2 className="font-semibold text-lg text-[#3A3D46] dark:text-[#FFFFFF] mb-2">
          Top Performers
        </h2>
        <ul className="list-disc px-6 ">
        {[
          "Top Scorer: Haaland - 25 goals",
          "Top Keeper: Alisson - 15 clean sheets",
          "Most Assists: De Bruyne - 13 assists",
        ].map((item) => {
          return (
            <li
              key={item}
              className="text-[#1E1E1E] dark:text-[#FFFFFF] text-[10px] md:text-[13px]"
            >
              {item}
            </li>
          );
        })}
      </ul>
      </div>
      <ScoreLeague leagueName='' country='Germany' leagueLogo='https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32' isLive={false} />
    </div>
  );
};

export default LeagueTable;
