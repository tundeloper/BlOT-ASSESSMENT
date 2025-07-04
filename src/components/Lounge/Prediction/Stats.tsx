'use client'
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const matches = [
    {
        teams: 'Chelsea VS Man City',
        metrics: [
            {
                label: 'Head - to- Head',
                id: 'h2h',
                content: "Chelsea vs Man City – Last 5 Meetings\nMan City won 4, Chelsea won 1\nAvg goals per game: 2.6\nChelsea haven't beaten City in their last 3 meetings",
            },
            { label: 'Recent Form', id: 'recent-form', content: null },
            { label: 'Injury Report', id: 'injury-report', content: null },
        ],
    },
    {
        teams: 'Arsenal VS Man City',
        metrics: [
            { label: 'Head - to- Head', id: 'h2h', content: null },
            { label: 'Recent Form', id: 'recent-form', content: null },
            { label: 'Injury Report', id: 'injury-report', content: null },
        ],
    },
];

const Stats = () => {
    // openMetric[matchIdx] = metricIdx or null
    const [openMetric, setOpenMetric] = useState<(number | null)[]>(matches.map(() => null));

    const handleToggle = (matchIdx: number, metricIdx: number) => {
        setOpenMetric((prev) =>
            prev.map((open, idx) =>
                idx === matchIdx ? (open === metricIdx ? null : metricIdx) : open
            )
        );
    };

    return (
        <div className="bg-white dark:bg-[#121212] rounded-[4px] shadow p-4 flex flex-col gap-6 w-full max-w-xs">
            <div className="flex flex-col gap-1 w-full">
                <span className="text-[16px] font-medium text-[#2D439B] dark:text-[#2D439B]">Stats for prediction</span>
            </div>
            <div className="flex flex-col gap-6 w-full">
                {matches.map((match, matchIdx) => (
                    <div key={match.teams} className="flex flex-col gap-2 w-full">
                        <span className="text-[13px] font-medium text-[#3A3D46] dark:text-white mb-1" style={{fontFamily:'Switzer'}}>{match.teams}</span>
                        {match.metrics.map((metric, metricIdx) => (
                            <div key={metric.label} className="flex flex-col w-full">
                                <button
                                    className="flex flex-row justify-between items-center w-full py-2 px-2 bg-white dark:bg-[#121212] rounded-[4px] shadow text-[13px] text-[#3A3D46] dark:text-white font-normal cursor-pointer"
                                    onClick={() => handleToggle(matchIdx, metricIdx)}
                                    type="button"
                                    style={{ fontFamily: 'Switzer', fontWeight: 400 }}
                                >
                                    <span>{metric.label}</span>
                                    <IoChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${openMetric[matchIdx] === metricIdx ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openMetric[matchIdx] === metricIdx && metric.content && (
                                    <div className="p-2">{getMetricContent(metric.id, metric.content)}</div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;

const getMetricContent = (metricId: string, content: string) => {
    if (metricId === 'h2h') {
        return (
            <div className="text-[13px] text-[#3A3D46] dark:text-white whitespace-pre-line">
                {content}
            </div>
        );
    }
    if (metricId === 'recent-form') {
        return <div>{content}</div>;
    }
    if (metricId === 'injury-report') {
        return <div>{content}</div>;
    }
    return null;
}