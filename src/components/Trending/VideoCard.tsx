'use client'
import React, { useRef, useState, useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { BiMessageRounded } from 'react-icons/bi';
import { BsBookmark, BsPlay, BsPause } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { PiShareFat } from 'react-icons/pi';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const VideoCard: React.FC<{videoData: Video, isMuted: boolean, setIsMuted: (isMuted: boolean) => void}> = ({videoData, isMuted, setIsMuted}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7, // 70% of the element must be visible
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Video is in view
                    videoRef.current?.play().catch((error) => {
                        // Handle any autoplay restrictions
                        console.log("Autoplay prevented:", error);
                    });
                    setIsPlaying(true);
                } else {
                    // Video is out of view
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch((error) => {
                    console.log("Playback prevented:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    return (
        <div ref={containerRef} className="w-full rounded-md overflow-hidden bg-black relative h-[95%] shrink-0">
            {/* Video player */}
            <div className="relative w-full h-[100%]">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster={videoData?.thumbnail}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    playsInline
                    loop
                    muted={isMuted}
                >
                    <source src={videoData?.videoUrl} type="video/mp4" />
                </video>

                {/* Play/Pause and Volume controls overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                    <button 
                        className="bg-black/50 rounded-full p-3 transition-opacity duration-300 hover:bg-black/70"
                        onClick={togglePlay}
                    >
                        {isPlaying ? (
                            <BsPause className="text-white w-6 h-6" />
                        ) : (
                            <BsPlay className="text-white w-6 h-6" />
                        )}
                    </button>
                </div>
                <div className="absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                    <button 
                        className="bg-black/50 rounded-full p-3 transition-opacity duration-300 hover:bg-black/70"
                        onClick={toggleMute}
                    >
                        {isMuted ? (
                            <HiVolumeOff className="text-white w-6 h-6" />
                        ) : (
                            <HiVolumeUp className="text-white w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <div 
                        className="h-full bg-red-600"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Right side vertical icons */}
                <div className="absolute top-6 right-4 flex flex-col gap-4">
                    <div className="flex flex-col items-center cursor-pointer">
                        <FaHeart className="text-white w-6 h-6" />
                        <span className="text-white text-sm font-medium mt-1">{videoData?.likes}</span>
                    </div>
                    
                    <div className="flex flex-col items-center cursor-pointer">
                        <BiMessageRounded className="text-white w-6 h-6" />
                        <span className="text-white text-sm font-medium mt-1">{videoData?.comments}</span>
                    </div>
                    
                    <div className="flex flex-col items-center cursor-pointer">
                        <BsBookmark className="text-white w-6 h-6" />
                        <span className="text-white text-sm font-medium mt-1">{videoData?.bookmarks}</span>
                    </div>
                    
                    <div className="flex flex-col items-center cursor-pointer">
                        <PiShareFat className="text-white w-6 h-6" />
                        <span className="text-white text-sm font-medium mt-1">{videoData?.shares}</span>
                    </div>
                    
                    <button className="text-white cursor-pointer">
                        <FiMoreHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>
            
            {/* Bottom caption section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-2">
                    <h3 className="text-white text-base font-normal">{videoData?.user?.name}</h3>
                    <MdVerified className="text-[#2D439B] w-4 h-4 flex-shrink-0" />
                </div>
                
                <p className="text-white text-sm font-normal mt-2">{videoData?.description}</p>
                <p className="text-white text-sm font-normal mt-2">{videoData?.hashtags}</p>
            </div>
        </div>
    );
};

export default VideoCard;