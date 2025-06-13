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
import { timeAgo } from '@/utils/helper'
import { PostMoreDropdown } from './PostModal'

const Post = ({ post }: { post: Post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                            <Image
                                src={post?.profile_picture}
                                alt={post?.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-[13px] text-[#1E1E1E] font-normal">
                                    {post?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#3A3D46]">{post?.username}</span>
                                <span className="text-[8px] text-[#3A3D46]">{timeAgo(post?.created_at)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <button className="p-2 cursor-pointer" onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}>
                            <BsThreeDotsVertical size={24} className="text-[#3A3D46]" />
                        </button>
                        {isMoreDropdownOpen && (
                            <PostMoreDropdown username={post?.username} onClose={() => setIsMoreDropdownOpen(false)} />
                        )}
                    </div>
                </div>

                <div className="px-4">
                    <div className="max-w-[341px]">
                        <p className="text-[13px] text-[#3A3D46]">{post?.content}</p>
                        <p className="text-[13px] text-[#2D439B]">
                            {post?.hashtags}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post?.media_files?.map((media) => (
                            <div key={media.id} className="mt-2.5 w-full aspect-video rounded overflow-hidden grow">
                                <Image
                                    src={media.media_url}
                                    alt="Post image"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    unoptimized={true}
                                />
                            </div>
                        ))}
                    </div>
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
                                <span className="text-[13px] text-[#3A3D46]">{post?.likes_count}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <IoChatbubbleOutline size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{post?.comments_count}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <BiRepost size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{post?.reposts_count}</span>
                            </button>

                            <button className="flex items-end gap-0.5">
                                <PiShareFatLight size={20} className="text-[#3A3D46]" />
                                <span className="text-[13px] text-[#3A3D46]">{post?.shares_count}</span>
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
                                src={post?.profile_picture}
                                alt={post?.name}
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