"use client";
import AuthCard from "@/components/Auth/card";
import GradientButton from "@/components/ui/gradientButton";
import React, { useState } from "react";

const sportsList = [
  'Football', 'Basketball',
  'Formula1', 'Boxing',
  'Tennis', 'Athletics'
];

export default function Page() {
    const [selectedSports, setSelectedSports] = useState<string[]>([]);


    const handleToggle = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const handleNext = () => {
    alert(`Selected sports: ${selectedSports.join(', ') || 'None'}`);
  };

  const handleSkip = () => {
    alert('Skipped');
  };

  return (
    <AuthCard>
      <div className="w-[20rem]">
      <h2 className="text-xl font-bold mb-4 text-center">What sport do you love ?</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sportsList.map((sport) => (
          <label key={sport} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSports.includes(sport)}
              onChange={() => handleToggle(sport)}
              className="accent-primary border-gray-300 bg-transparent text-primary rounded focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
            />
            <span>{sport}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3">
        <GradientButton
          onClick={handleNext}
          className="bg-primary font-semibold flex-1 text-white px-4 py-2 rounde transition"
        >
          Next
        </GradientButton>
        <button
          onClick={handleSkip}
          className="bg-gray-200 font-semibold flex-1 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Skip
        </button>
      </div>
      </div>
    </AuthCard>
  );
}
