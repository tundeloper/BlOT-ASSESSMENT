import React from 'react'
import Trends from '../Feed/Trends'
import Lounge from '../Feed/Lounge'
import Channel from '../Feed/Channel'
import Livescore from '../Feed/Livescore'
import Fixtures from '../Feed/Fixtures'
import Predictions from '../Feed/Predictions'
import CreateRepost from './CreateRepost'

const RepostMain: React.FC<{ postID: string }> = ({ postID }) => {
    return (
        <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1e1e1e] w-[100%] transition-colors duration-300'>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <Trends />
                <Lounge />
                <Channel />
            </div>
            <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh] relative overflow-y-auto scrollbar-hide'>
                <CreateRepost postID={postID} />
            </div>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <Livescore />
                <Fixtures />
                <Predictions />
            </div>
        </div>
    )
}

export default RepostMain