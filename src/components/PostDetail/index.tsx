import React from 'react'
import Trends from '../Feed/Trends'
import Channel from '../Feed/Channel'
import Livescore from '../Feed/Livescore'
import Fixtures from '../Feed/Fixtures'
import Predictions from '../Feed/Predictions'
import Details from './Details'
import Lounge from '../Feed/Lounge'


const PostDetail:React.FC<{id: string}> = ({id}) => {
  return (
    <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
      <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
        <Trends />
        <Lounge />
        <Channel />
      </div>
      <div className='flex flex-col gap-4 w-[100%] md:p-[16px] md:bg-white md:dark:bg-[#121212] md:w-[56%] h-[86vh] overflow-y-auto scrollbar-hide'>
        <Details id={id}/>
      </div>
      <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
        <Livescore />
        <Fixtures />
        <Predictions />
      </div>
    </div>
  )
}

export default PostDetail