'use client'
import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { RiHashtag } from 'react-icons/ri'
import { MdOutlineCreate } from 'react-icons/md'
import { getUserChannels } from '@/api/channels'
import { CircularProgress } from '@mui/material'

const Channel = () => {
  const [channels, setChannels] = useState<Array<Channel>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserChannels = async () => {
      setIsLoading(true)
      const res = await getUserChannels()
      if (res.success) {
        const data = res.data
        console.log(data);
        setChannels(data || [])
      }
      setIsLoading(false)
    }
    fetchUserChannels()
  }, [])


  return (
    <div className="bg-white dark:bg-[#121212] rounded flex flex-col w-full transition-colors duration-300">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          My Channels
        </h2>
        <button className="text-[13px] font-medium text-white cursor-pointer">
          See all
        </button>
      </div>
      {
        isLoading ?
          (
            <div className="flex justify-center items-center h-full py-4">
              <CircularProgress size={40} sx={{ color: '#2D439B' }} />
            </div>
          ) :
          <>
            {
              channels?.length === 0 ?
                <ChannelPending /> :
                <div className="flex flex-col">
                  {channels.map((channel, index) => (
                    <div
                      key={channel?.id}
                      className={`flex justify-between items-center px-4 py-2.5 ${index !== channels.length - 1 ? 'border-b border-[#D9D9D9]' : ''
                        }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
                          {channel?.name} . <span className='dark:text-[#C9CDD4] font-normal'>{channel?.is_private ? "private" : "public"}</span>
                        </span>
                        <span className="text-[12px] text-[#3A3D46] dark:text-[#C9CDD4]">
                          {channel?.member_count} members
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </>
      }
    </div>
  );
}

export default Channel

export const ChannelPending = () => {
  return (
    <div className="bg-white dark:bg-[#121212] rounded flex flex-col w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#D9D9D9] cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <IoAdd size={16} className='dark:text-white' />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
              Create Channels
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#D9D9D9] cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <MdOutlineCreate size={16} className='dark:text-white' />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
              Join Channels
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2.5 cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <RiHashtag size={16} className='dark:text-white' />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
              My Channels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}