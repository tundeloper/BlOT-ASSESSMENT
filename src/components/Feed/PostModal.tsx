'use client'
import React from 'react';
import { BsBookmark } from 'react-icons/bs';
import { HiUserAdd } from 'react-icons/hi';
import { BiBlock } from 'react-icons/bi';
import { IoVolumeMuteOutline } from 'react-icons/io5';
import { FiFlag } from 'react-icons/fi';

interface PostMoreDropdownProps {
    username: string;
    onClose?: () => void;
    handleFollow?: () => void;
    handleBookmark?: () => void;
    isBookmarked?: boolean;
}

export const PostMoreDropdown: React.FC<PostMoreDropdownProps> = ({ username, onClose, handleFollow, handleBookmark, isBookmarked }) => {
    const menuItems = [
        {
            icon: <HiUserAdd className="w-4 h-4" />,
            label: `Follow ${username}`,
            onClick: handleFollow
        },
        {
            icon: <IoVolumeMuteOutline className="w-4 h-4" />,
            label: `Mute ${username}`,
            onClick: () => console.log('Mute clicked')
        },
        {
            icon: <BiBlock className="w-4 h-4" />,
            label: 'Block',
            onClick: () => console.log('Block clicked')
        },
        {
            icon: <FiFlag className="w-4 h-4" />,
            label: 'Report',
            onClick: () => console.log('Report clicked')
        },
        {
            icon: <BsBookmark className="w-4 h-4" />,
            label: isBookmarked ? 'Remove from saved' : 'Save post',
            onClick: handleBookmark
        }
    ];

    return (
        <div className="w-[200px] bg-white rounded shadow-lg overflow-hidden absolute top-10 right-0 z-50">
            {/* Arrow at top right */}
            <div className="flex justify-end px-[22px]">
                <div className="w-3 h-1.5 overflow-hidden">
                    <div className="w-3 h-3 bg-white rotate-45 transform origin-bottom-left"></div>
                </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            item.onClick?.();
                            onClose?.();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-[5px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    >
                        <span className="text-[#3A3D46]">{item.icon}</span>
                        <span className="text-[13px] text-[#3A3D46] font-normal">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};