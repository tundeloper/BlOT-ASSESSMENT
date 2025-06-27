'use client';
import React from 'react'
import InfoCard from './InfoCard'
import RecentQuestions from './RecentQuestions'
import Suggestions from './Suggestions'
import ChatBox from './ChatBox'
import Livescore from '../Feed/Livescore'
import Fixtures from '../Feed/Fixtures'
import Predictions from '../Feed/Predictions'
import { SnackbarProvider } from 'notistack'

const LazeAI = () => {
    return (
        <>
            <SnackbarProvider />
            <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
                <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                    <InfoCard />
                    <RecentQuestions />
                    <Suggestions />
                </div>
                <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
                    <ChatBox />
                </div>
                <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                    <Livescore />
                    <Fixtures />
                    <Predictions />
                </div>
            </div>
        </>
    )
}

export default LazeAI