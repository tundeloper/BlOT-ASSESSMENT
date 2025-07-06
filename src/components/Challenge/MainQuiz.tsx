import React, { useState, useEffect, FormEvent } from 'react';
import PointSystem from './PointSystem';
import Summary from './Summary';
import BadgeLevelTable from './BadgeLevel';


interface Question {
  id: number;
  text: string;
  answer: string;
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

const initialSections: Section[] = [
  {
    id: 'guess',
    title: 'Guess the player',
    questions: [
      { id: 1, text: 'This player has 15 goals, 3 assists in 2025. Plays in Spain. Who is it?', answer: '' },
      { id: 2, text: 'This player has 15 goals, 3 assists in 2025. Plays in Spain. Who is it?', answer: '' },
    ],
  },
  {
    id: 'flash',
    title: 'Flash Quiz',
    questions: [
      { id: 1, text: 'This player has 15 goals, 3 assists in 2025. Plays in Spain. Who is it?', answer: '' },
      { id: 2, text: 'This player has 15 goals, 3 assists in 2025. Plays in Spain. Who is it?', answer: '' },
    ],
  },
];

const MainQuiz = () => {
   const [sections, setSections] = useState<Section[]>(initialSections);
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 14 * 60 + 16); // initial timer in seconds

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleInputChange = (
    sectionId: string,
    questionId: number,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: sec.questions.map((q) =>
                q.id === questionId ? { ...q, answer: value } : q
              ),
            }
          : sec
      )
    );
  };

  const handleSubmit = (e: FormEvent, sectionId: string, questionId: number) => {
    e.preventDefault();
    const section = sections.find((s) => s.id === sectionId);
    const question = section?.questions.find((q) => q.id === questionId);
    if (question) {
      alert(`Answer submitted: ${question.answer}`);
    }
  };

  return (
    <div className="w-full">
      <p className='text-[#3A3D46] dark:text-[#ffffff] font-semibold text-[13px] md:text-[16px]'>Weekly Challenges </p>
      {sections.map((section) => (
        <div key={section.id} className='py-2.5'>
          <h2 className="text-[13px] text-[#3A3D46] dark:text-[#ffffff] flex-col mb-2 flex ">
            {section.title}
            <span className="text-[#9A1B39] font-mono">{formatTime(timeLeft)}</span>
          </h2>
          <div className="space-y-4">
            {section.questions.map((q) => (
              <form
                key={q.id}
                onSubmit={(e) => handleSubmit(e, section.id, q.id)}
                className="space-y-2"
              >
                <p className="text-[#3A3D46] dark:text-[#ffffff] text-[13px]">{q.text}</p>
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) =>
                    handleInputChange(section.id, q.id, e.target.value)
                  }
                  className="w-full h-[32px] text-[#7A7F8C] p-2 text-[11px] border border-gray-300 rounded focus:outline-none focus:outline-none focus:border-[#2D439B] animation"
                  placeholder="Your answer"
                />
                {/* <GradientButton
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit answer
                </GradientButton> */}
              </form>
            ))}
          </div>
        </div>
      ))}
      <PointSystem />
      <Summary />
      <BadgeLevelTable />
    </div>
  );
}

export default MainQuiz