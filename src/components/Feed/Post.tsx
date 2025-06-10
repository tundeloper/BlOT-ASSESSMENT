'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { BiRepost } from 'react-icons/bi'
import { PiShareFatLight } from 'react-icons/pi'
import { IoBookmarkOutline } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import logo from '@/assets/logo.png'

interface PostProps {
    userAvatar?: string; // optional for build
    userName?: string;  // optional for build
    userHandle?: string;// optional for build
    timestamp?: string; // optional for build
    content?: string;   // optional for build
    hashtags?: string[];// optional for build
    image?: string;
    likes?: number;     // optional for build
    comments?: number;  // optional for build
    reposts?: number;   // optional for build
    shares?: number;    // optional for build
}

const Post = ({
    userAvatar = logo.src,
    userName = "Marvin McKinney",
    userHandle = "@marvins",
    timestamp = "23 Aug at 4:21pm",
    content = "⚽Watch Giannis dominate with a monster dunk in OT!",
    hashtags = ["#Liverpool", "#UCL"],
    image = logo.src,
    likes = 30,
    comments = 12,
    reposts = 1,
    shares = 3
}: PostProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                            <Image
                                src={userAvatar}
                                alt={userName}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-[13px] text-[#1E1E1E] font-normal">
                                    {userName}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#3A3D46]">{userHandle}</span>
                                <span className="text-[8px] text-[#3A3D46]">{timestamp}</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2">
                        <BsThreeDotsVertical size={24} className="text-[#3A3D46]" />
                    </button>
                </div>

                <div className="px-4">
                    <div className="max-w-[341px]">
                        <p className="text-[13px] text-[#3A3D46]">{content}</p>
                        <p className="text-[13px] text-[#2D439B]">
                            {hashtags.join(' ')}
                        </p>
                    </div>
                    {image && (
                        <div className="mt-2.5 w-full aspect-video rounded overflow-hidden">
                            <Image
                                src={image}
                                alt="Post image"
                                width={500}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <button
                                onClick={handleLike}
                                className="flex items-end gap-0.5"
                            >
                                {isLiked ? (
                                    <AiFillHeart size={20} className="text-[#2D439B]" />
                                ) : (
                                    <AiOutlineHeart size={20} className="text-[#3A3D46]" />
                                )}
                                <span className="text-[13px] text-[#3A3D46]">{likeCount}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <IoChatbubbleOutline size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{comments}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <BiRepost size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{reposts}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <PiShareFatLight size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{shares}</span>
                            </button>
                        </div>

                        <button>
                            <IoBookmarkOutline size={24} className="text-[#3A3D46]" />
                        </button>
                    </div>
                </div>

                <div className="px-4">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                            <Image
                                src={userAvatar}
                                alt={userName}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center w-full rounded bg-[#E4E6EC] px-3 py-1">
                                <input
                                    type="text"
                                    placeholder="Write a comment"
                                    className="flex-1 bg-transparent text-[12px] text-[#3A3D46] outline-none placeholder:text-[#3A3D46]"
                                />
                                <button>
                                    <BsEmojiSmile size={14} className="text-[#3A3D46]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post