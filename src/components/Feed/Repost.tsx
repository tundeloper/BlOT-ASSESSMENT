import React from 'react'
import Post from './Post'
import { BiRepost } from 'react-icons/bi'
import { timeAgo } from '@/utils/helper'

type RepostProps = {
    post: Post,
    isMuted: boolean,
    isFollowing: boolean,
    fetchMutedUser: () => void,
    fetchFollowing: () => void,
    setOpenAuthModal: (open: boolean) => void
}

const Repost = ({ post, isMuted, isFollowing, fetchMutedUser, fetchFollowing, setOpenAuthModal }: RepostProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 px-4'>
                <BiRepost size={20} className="text-[#7A7F8C] dark:text-white" />
                <span className='text-[13px] text-[#7A7F8C] dark:text-white'>{post?.reposter_name} reposted</span> 
                <span className='text-[13px] text-[#7A7F8C] dark:text-white'>{timeAgo(post?.created_at)}</span>
            </div>
            <Post
                key={post.id}
                post={post}
                isMuted={isMuted}
                fetchMutedUser={fetchMutedUser}
                isFollowing={isFollowing}
                fetchFollowing={fetchFollowing}
                setOpenAuthModal={setOpenAuthModal}
            />
        </div>
    )
}

export default Repost