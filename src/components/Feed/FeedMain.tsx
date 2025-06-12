import React from 'react'
import Trends from './Trends'
import Lounge from './Lounge'
import Channel from './Channel'
import Stories from './Stories'
import Feeds from './Feeds'
import Fixtures from './Fixtures'
import Livescore from './Livescore'
import Predictions from './Predictions'

const FeedMain = () => {

  return (
    <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] w-[100%]'>
      <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
        <Trends />
        <Lounge />
        <Channel />
      </div>
      <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
        <Stories />
        <Feeds />
      </div>
      <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
        <Livescore />
        <Fixtures />
        <Predictions />
      </div>
    </div>
  )
}

export default FeedMain