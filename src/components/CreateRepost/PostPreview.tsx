import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPost } from '@/api/feed';
import { CircularProgress } from '@mui/material';
import { timeAgo } from '@/utils/helper';

const renderMedia = (mediaUrl: string, mediaType: string) => {
    if (mediaType === 'video') {
        return <video
            className="w-full h-full object-cover"
            autoPlay={true}
            controls={true}
            playsInline
            loop
            muted={true}
        >
            <source src={mediaUrl} type="video/mp4" />
        </video>
    }
    return <Image src={mediaUrl} alt="Post image" width={500} height={300} className="w-full h-full object-cover" />
}

const PostPreview: React.FC<{ postID: string }> = ({ postID }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await getPost(+postID);
            setPost(res.data);
            setLoading(false);
        }
        fetchPost();
    }, [postID]);

    return (
        <div className='flex w-full justify-center items-center mt-4 gap-4'>
            {
                loading ? (
                    <div className='flex justify-center items-center'>
                        <CircularProgress size={20} />
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#1A1C20] rounded-[12px] shadow p-4 w-full max-w-md flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-3">
                            <Image src={post?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post?.name?.trim() || '')}&format=png`} alt="avatar" className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
                            <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>{post?.name}</span>
                                <span className="text-[12px] text-[#7A7F8C] dark:text-[#C9CDD4]">{timeAgo(post?.created_at || '')}</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap">
                            {post?.hashtags.split(' ').map((tag) => (
                                <span key={tag} className="text-[13px] text-[#2D439B]" style={{ fontFamily: 'Switzer' }}>#{tag}</span>
                            ))}
                        </div>
                        <div className="text-[14px] text-[#3A3D46] dark:text-white" style={{ fontFamily: 'Switzer' }}>
                            {post?.content}
                        </div>
                        <div className='w-full flex flex-wrap gap-2'>
                            {post?.media_files?.slice(0, 4).map((media) => (
                                <div key={media.id} className="mt-2.5 w-[45%] aspect-video rounded overflow-hidden grow">
                                    {media && renderMedia(media.media_url, media.media_type)}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PostPreview