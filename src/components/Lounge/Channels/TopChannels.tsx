import React from 'react'
import ChannelCard from './ChannelCard'

const TopChannels: React.FC<{ channels: Array<Channel> }> = ({ channels }) => {
  return (
    <div className='mt-4'>
        <p className='text-[15px] font-normal text-[#3A3D46] dark:text-white'>Explore Top channels</p>
        <div className='flex flex-wrap gap-4 mt-4'>
            {channels?.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
            ))}
        </div>
        <p className='text-center text-[#2D439B] mt-3 cursor-pointer text-[15px] font-normal'>See more...</p>
    </div>
  )
}

export default TopChannels