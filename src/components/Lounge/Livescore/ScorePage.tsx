import React from 'react'
import Contributors from '../Contributors'
import JoinLounge from '../JoinLounge'
import LoungeNav from '../LoungeNav'
import AllLiveScore from './AllLiveScore'
import Predictions from '@/components/Feed/Predictions'
import Upcoming from '../Upcoming'
import Finished from '../Finished'
import MatchFilter from '../MatchFilter'

const ScorePage = () => {
    return (
        <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <JoinLounge />
                <LoungeNav />
                <Contributors />
            </div>
            <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
                <AllLiveScore />
            </div>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <MatchFilter />
                <Upcoming />
                <Finished />
                <Predictions />
            </div>
        </div>
    )
}

export default ScorePage