import React from 'react'
import Predictions from '@/components/Feed/Predictions'
import NewsList from './NewsList'
import JoinLounge from '../JoinLounge'
import LoungeNav from '../LoungeNav'
import Contributors from '../Contributors'
import Livescore from '@/components/Feed/Livescore'
import Fixtures from '@/components/Feed/Fixtures'

const News = () => {
    return (
        <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <JoinLounge />
                <LoungeNav />
                <Contributors />
            </div>
            <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
                <NewsList />
            </div>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <Livescore />   
                <Fixtures />
                <Predictions />
            </div>
        </div>
    )
}

export default News