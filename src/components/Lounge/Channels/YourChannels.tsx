import React from 'react'
import ChannelCard from './ChannelCard'

const YourChannels: React.FC<{ channels: Array<Channel> }> = ({ channels }) => {
    return (
        <div className='mt-1 md:mt-4'>
            <p className='text-[15px] font-normal text-[#3A3D46] dark:text-white'>Channels you’ve joined</p>
            {
                channels?.length > 0 ? <>
                    <div className='flex flex-wrap gap-4 mt-4'>
                        {channels?.map((channel) => (
                            <ChannelCard key={channel.id} channel={channel} />
                        ))}
                    </div>
                    <p className='text-center text-[#2D439B] mt-3 cursor-pointer text-[15px] font-normal'>See more...</p>
                </> :
                    <div className='flex justify-center items-center h-full mt-10 mb-16'>
                        <p className='text-[20px] font-normal text-[#3A3D46] text-center dark:text-white'>You haven’t joined any channels yet! Join a channel to get started with real-time conversations and insights from fans like you.</p>
                    </div>
            }
        </div>
    )
}

export default YourChannels