'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart, AiOutlineSend } from 'react-icons/ai'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { BiRepost } from 'react-icons/bi'
import { PiShareFatLight } from 'react-icons/pi'
import { IoBookmarkOutline } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { timeAgo } from '@/utils/helper'
import { PostMoreDropdown } from './PostModal'
import { useAuthStore } from '@/store/authstore'
import { createBookmark, createComment, createRepost, deleteBookmark, likePost, logShare, unlikePost } from '@/api/post'
import { followUser, muteUser, unfollowUser, unMuteUser } from '@/api/user'
import { CiImageOn } from 'react-icons/ci'
import { HiOutlineGif } from "react-icons/hi2";
import { IoMdBookmark } from 'react-icons/io'
import { CircularProgress, ClickAwayListener } from '@mui/material'
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useTheme } from '@/context/ThemeContext'
import PostDetail from '../ui/media/uiTest'
import { usePathname, useRouter } from 'next/navigation'
import Comment from './comments/comment'


type PostProps = { 
    post: Post, 
    isMuted: boolean,
    isFollowing: boolean,
    fetchMutedUser: () => void,
    fetchFollowing: () => void, 
    setOpenAuthModal: (open: boolean) => void 
}

const Post = ({ post, isFollowing: isFollowingProp, fetchMutedUser, isMuted, fetchFollowing, setOpenAuthModal }: PostProps ) => {
    const { user, isAuthenticated } = useAuthStore()
    const { theme } = useTheme()
    const [isFollowing, setIsFollowing] = useState(isFollowingProp);
    const [userIsMuted, setUserIsMuted] = useState(isMuted);
    const [isLiked, setIsLiked] = useState(post?.is_liked);
    const [isBookmarked, setIsBookmarked] = useState(post?.is_bookmarked);
    const [likeCount, setLikeCount] = useState(post?.likes_count);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isCommentFocused, setIsCommentFocused] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)
    const [comment, setComment] = useState('');

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setIsFollowing(isFollowingProp);
        setUserIsMuted(isMuted)
    }, [isFollowingProp, isMuted]);

    // const renderMedia = (media: MediaFile) => {
    //     if (media.media_type === 'video') {
    //         return <video
    //             className="w-full h-full object-cover"
    //             autoPlay={true}
    //             controls={true}
    //             playsInline
    //             loop
    //             muted={true}
    //         >
    //             <source src={media.media_url} type="video/mp4" />
    //         </video>
    //     }
    //     return <Image src={media.media_url} alt="Post image" width={500} height={300} className="w-full h-full object-cover" />
    // }

    const handleShare = async () => {
        navigator.share({
            title: post?.name,
            text: post?.content,
            url: `${window.location.origin}/post/${post?.id}`,
        });
        await logShare(post?.id)
    }

    const handleLike = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        if (isLiked) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
            await unlikePost({ post_id: post?.id });
        } else {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
            await likePost({ post_id: post?.id });
        }
    }

    const handleComment = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        if (comment.trim() === '') return;
        setIsCommenting(true);
        const res = await createComment({ post_id: post?.id, content: comment });
        if (res.success) {
            setComment('');
            setIsCommentFocused(false);
            setIsCommenting(false);
        } else {
            enqueueSnackbar('Failed to comment', { variant: 'error' });
            setIsCommenting(false);
        }
    }

    const handleRepost = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        await createRepost({ post_id: post?.id });
    }

    const handleFollow = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        if (isFollowing) {
            const res = await unfollowUser(post?.username);
            if (res.success) {
                setIsFollowing(false);
                fetchFollowing();
            }
        } else {
            const res = await followUser(post?.username);
            if (res.success) {
                setIsFollowing(true);
                fetchFollowing();
            }
        }
    }

    const handleMute = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        if (userIsMuted) {
            const res = await unMuteUser(post.author_id);
            if (res.success) {
                fetchMutedUser()
            }
        } else {
            const res = await muteUser({user_id: post.author_id, duration_hours: 24}) // default bu 24 hours
            if (res.success) {
                fetchMutedUser();
            }
        }
    }

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            setOpenAuthModal(true);
            return;
        }
        if (isBookmarked) {
            setIsBookmarked(false);
            await deleteBookmark(post?.id);
        } else {
            setIsBookmarked(true);
            await createBookmark({ post_id: post?.id });
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                            <Image
                                src={post?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post?.name?.trim() || '')}&format=png`}
                                alt={post?.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-[13px] text-[#1E1E1E] dark:text-white font-normal">
                                    {post?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#3A3D46] dark:text-white">@{post?.username}</span>
                                <span className="text-[8px] text-[#3A3D46] dark:text-white">{timeAgo(post?.created_at)}</span>
                            </div>
                        </div>
                    </div>
                    <label className="relative" id="more-dropdown">
            <button
              className="p-2 cursor-pointer"
              onClick={() => setIsMoreDropdownOpen(true)}
            >
              <BsThreeDotsVertical
                size={24}
                className="text-[#3A3D46] dark:text-white"
              />
            </button>
            {isMoreDropdownOpen && (
              <ClickAwayListener
                onClickAway={() => setIsMoreDropdownOpen(false)}
              >
                <div id="more-dropdown-menu">
                  <PostMoreDropdown
                    post={post}
                    onClose={() => setIsMoreDropdownOpen(false)}
                    handleFollow={handleFollow}
                    handleBookmark={handleBookmark}
                    isBookmarked={isBookmarked}
                    isFollowing={isFollowing}
                    userIsMuted={userIsMuted}
                    handleMute={handleMute}
                  />
                </div>
              </ClickAwayListener>
            )}
          </label>
                </div>

                <div className="px-4">
                    <div className="max-w-[341px]">
                        <p className="text-[13px] text-[#3A3D46] dark:text-white">{post?.content}</p>
                        <p className="text-[13px] text-[#2D439B] dark:text-white">
                            {post?.hashtags}
                        </p>
                    </div>
                    {/* flex-wrap gap-2 */}
                    <div className="w-full">
                        <PostDetail mediaItems={post.media_files} />
                        {/* {post?.media_files?.slice(0, 4).map((media) => (
                            <div key={media.id} className="mt-2.5 w-[45%] aspect-video rounded overflow-hidden grow">
                                {media && renderMedia(media)}
                            </div>
                        ))} */}
                    </div>
                </div>

                <div className="px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <button
                                onClick={handleLike}
                                className="flex items-end gap-0.5 cursor-pointer"
                            >
                                {isLiked ? (
                                    <AiFillHeart size={20} className="text-[#FF0000]" />
                                ) : (
                                    <AiOutlineHeart size={20} className="text-[#3A3D46] dark:text-white" />
                                )}
                                <span className="text-[13px] text-[#3A3D46] dark:text-white">{likeCount}</span>
                            </button>

                            <button className="flex items-end gap-0.5 cursor-pointer" onClick={() => {router.push(`/post/${post.id}`)}}>
                                <IoChatbubbleOutline size={20} className="text-[#3A3D46] dark:text-white" />
                                <span className="text-[13px] text-[#3A3D46] dark:text-white">{post?.comments_count}</span>
                            </button>

                            <button className="flex items-end gap-0.5 cursor-pointer" onClick={handleRepost}>
                                <BiRepost size={20} className="text-[#3A3D46] dark:text-white" />
                                <span className="text-[13px] text-[#3A3D46] dark:text-white">{post?.reposts_count}</span>
                            </button>

                            <button className="flex items-end gap-0.5 cursor-pointer" onClick={handleShare}>
                                <PiShareFatLight size={20} className="text-[#3A3D46] dark:text-white" />
                                <span className="text-[13px] text-[#3A3D46] dark:text-white">{post?.shares_count}</span>
                            </button>
                        </div>

                        <button onClick={handleBookmark} className='cursor-pointer'>
                            {isBookmarked ? (
                                <IoMdBookmark size={24} color='#2D439B' />
                            ) : (
                                <IoBookmarkOutline size={24} className='text-[#3A3D46] dark:text-white' />
                            )}
                        </button>
                    </div>
                </div>

                <div className="px-4">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                            <Image
                                src={user?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.trim() || 'Anonymous')}&format=png`}
                                alt={user?.name || 'Anonymous'}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className={`flex flex-col gap-2 w-full rounded bg-[#E4E6EC] dark:bg-[#1A1C20] px-3 ${isCommentFocused ? 'py-3' : 'py-1'}`}>
                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        placeholder="Write a comment"
                                        className="flex-1 bg-transparent text-[12px] text-[#3A3D46] dark:text-white outline-none placeholder:text-[#3A3D46] dark:placeholder:text-white h-[30px]"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onFocus={() => setIsCommentFocused(true)}
                                    />
                                    {!isCommentFocused && <button className='cursor-pointer'>
                                        <BsEmojiSmile size={17} className="text-[#3A3D46] dark:text-white" />
                                    </button>}
                                </div>
                                {isCommentFocused && <div className='flex justify-between w-full items-center'>
                                    <div className='flex gap-4 items-center'>
                                        <label htmlFor="image" className='cursor-pointer'>
                                            <CiImageOn size={20} className="text-[#3A3D46] dark:text-white" />
                                        </label>
                                        <input type="file" id="image" className="hidden" />
                                        <button className='cursor-pointer'>
                                            <HiOutlineGif size={20} className="text-[#3A3D46] dark:text-white" />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <BsEmojiSmile size={18} className="text-[#3A3D46] dark:text-white" />
                                        </button>
                                    </div>
                                    <button onClick={handleComment} className='cursor-pointer'>
                                        {isCommenting ? (
                                            <CircularProgress size={20} sx={{ color: theme === 'dark' ? '#fff' : '#3A3D46' }} />
                                        ) : (
                                            <AiOutlineSend size={20} className="text-[#3A3D46] dark:text-white" />
                                        )}
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* post details */}
                {pathname === `/post/${post.id}` &&
                <div className='w-full pb-[5rem] border-t border-[#E4E6EC] dark:border-[#1A1C20]'>
                    <Comment post_id={post.id}/>
                </div>
                }
            </div>
            <SnackbarProvider />
        </div>
    );
}

export default Post