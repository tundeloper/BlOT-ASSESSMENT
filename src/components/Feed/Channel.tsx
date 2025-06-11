import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { RiHashtag } from 'react-icons/ri'
import { MdOutlineCreate } from 'react-icons/md'

interface ChannelItem {
  name: string;
  privacy: 'private' | 'public';
  activeUsers: string;
}

const channels: ChannelItem[] = [
  {
    name: 'Premier league match',
    privacy: 'private',
    activeUsers: '45k Active'
  },
  {
    name: 'Champions league live',
    privacy: 'public',
    activeUsers: '35k Active'
  },
  {
    name: 'Pre match analysis',
    privacy: 'public',
    activeUsers: '25k Active'
  }
];

const Channel = () => {
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

      <div className="flex flex-col">
        {channels.map((channel, index) => (
          <div
            key={channel.name}
            className={`flex justify-between items-center px-4 py-2.5 ${index !== channels.length - 1 ? 'border-b border-[#D9D9D9]' : ''
              }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-medium text-[#1E1E1E] dark:text-white">
                {channel.name} . <span className='dark:text-[#C9CDD4] font-normal'>{channel.privacy}</span>
              </span>
              <span className="text-[12px] text-[#3A3D46] dark:text-[#C9CDD4]">
                {channel.activeUsers}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel

export const ChannelPending = () => {
  return (
    <div className="bg-white rounded flex flex-col w-full">
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-[#2D439B] to-[#9A1B39] rounded-t-[4px]">
        <h2 className="text-[16px] font-medium text-white">
          My Channels
        </h2>
        <button className="text-[13px] font-medium text-white cursor-pointer">
          View all
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <IoAdd size={16} />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E]">
              Create Channels
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <MdOutlineCreate size={16} />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E]">
              Join Channels
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-[#3A3D46]">
              <RiHashtag size={16} />
            </div>
            <span className="text-[14px] font-medium text-[#1E1E1E]">
              My Channels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}