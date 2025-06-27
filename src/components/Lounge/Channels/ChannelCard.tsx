import React, { useState } from 'react'
import { SiPremierleague } from 'react-icons/si'
import { FiMoreVertical } from 'react-icons/fi'
import { IoPeopleOutline } from 'react-icons/io5'
import { joinChannel } from '@/api/channels'
import { enqueueSnackbar } from 'notistack'

const ChannelCard: React.FC<{ channel: Channel }> = ({ channel }) => {
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div className="bg-[#F9FAFB] dark:bg-[#1A1C20] border border-[#D9D9D9] dark:border-[#23262F] rounded-lg p-4 w-full md:w-[46%] grow md:max-w-[50%] flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#D9D9D9] dark:border-[#23262F]">
                        <SiPremierleague size={28} className="text-[#1E1E1E] dark:text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-medium text-[#3A3D46] dark:text-white">{channel?.name}</span>
                        <div className="flex items-center gap-1 text-[#7A7F8C] dark:text-[#C9CDD4] text-[10px]">
                            <IoPeopleOutline className="w-4 h-4" />
                            <span>{channel?.member_count} Members</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <FiMoreVertical className="w-6 h-6 text-[#7A7F8C] dark:text-[#C9CDD4] cursor-pointer" onClick={() => setShowOptions(!showOptions)} />
                    {showOptions && <ChannelOptions channel={channel} setShowOptions={setShowOptions} />}
                </div>
            </div>
            <div className="text-[10px] text-[#7A7F8C] dark:text-[#C9CDD4]">
                {channel?.description}
            </div>
            <button className="w-full py-2 rounded border border-[#2D439B] text-[13px] font-normal text-[#2D439B]">
                Visit Channel
            </button>
        </div>
    )
}

export default ChannelCard


const ChannelOptions: React.FC<{ channel: Channel, setShowOptions: (show: boolean) => void }> = ({ channel, setShowOptions }) => {


    const handleJoinChannel = async () => {
        setShowOptions(false);
        const response = await joinChannel(channel?.id || 0);
        if (response.success) {
            enqueueSnackbar('Channel joined successfully', { variant: 'success' });
        } else {
            enqueueSnackbar('Failed to join channel', { variant: 'error' });
        }
    }

    return (
        <div className="absolute right-0 mt-2 w-[165px] bg-white dark:bg-[#23262F] rounded shadow-lg border border-[#F0F0F0] dark:border-[#23262F] z-50">
            <button
                className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212]`}
            >
                Manage Notifications
            </button>
            <button
                className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212]`}
                onClick={handleJoinChannel}
            >
                Join Channel
            </button>
            <button
                className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212]`}
            >
                Share Channel
            </button>
            <button
                className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212]`}
            >
                Report Channel
            </button>
        </div>
    )
}