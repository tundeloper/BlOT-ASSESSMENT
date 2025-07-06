import React from 'react'
import JoinLounge from '../JoinLounge'
import LoungeNav from '../LoungeNav'
import Contributors from '../Contributors'
import TopPredictors from '../Prediction/TopPredictors'
import Stats from '../Prediction/Stats'
import Summary from '../Prediction/Summary'
import Challenge from './Challenge'

const ChallengesPage = () => {
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
            </div>
        </div>
    )
}

export default ChallengesPage