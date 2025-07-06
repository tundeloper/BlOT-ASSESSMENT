import React from 'react'
import JoinLounge from '../JoinLounge'
import LoungeNav from '../LoungeNav'
import Contributors from '../Contributors'
// import PredictionMain from '../Prediction/PredictionMain'
import TopPredictors from '../Prediction/TopPredictors'
import Stats from '../Prediction/Stats'
import Summary from '../Prediction/Summary'
import Challenge from './challenge'

const ChallengePage = () => {
    return (
        <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <JoinLounge />
                <LoungeNav />
                <Contributors />
            </div>
            <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
                <Challenge />
            </div>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <TopPredictors />   
                <Stats />
                <Summary />
                <p className='italic text-center'>You will be notified instatly once you hit a badge milestone through an in-app pop-up, glow animation on your profile pic, and a badge upgrade toast. Your new badge becomes visible across the site automatically </p>
            </div>
        </div>
    )
}

export default ChallengePage