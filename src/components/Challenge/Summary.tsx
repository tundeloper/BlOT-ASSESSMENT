const Summary = () => {
  return (
    <div className="mt-3">
        <h2 className="text-[13px] md:text-[16px] text-[#3A3D46] dark:text-[#ffffff] font-semibold mb-2 flex ">
            Rules Summary
          </h2>
      <ul className="list-disc px-6 ">
        {[
          "Users earn points by participating in different types of challenges.",
          "Points are tracked weekly and reset every Sunday at midnight.",
          "Bonus XP is awarded for consistent participation (3+ challenges).",
          "Users with the highest points appear on the Lounge Challenge Leaderboard.",
          "Cheating, spamming, or multiple submissions will lead to disqualification.",
          "Some challenges are time-bound missed deadlines earn no points.",
          "Points may unlock badges, ranks, or exclusive lounge privileges.",
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
  );
};

export default Summary;
