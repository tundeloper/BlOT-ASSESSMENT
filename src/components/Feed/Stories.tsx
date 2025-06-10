'use client'
import React, { useRef, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { IoAddOutline } from 'react-icons/io5'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.png'

interface Story {
  id: number;
  name: string;
  avatar: string;
  isYourStory?: boolean;
}

const stories: Story[] = [
  { id: 1, name: 'Your Story', avatar: logo.src, isYourStory: true },
  { id: 2, name: 'Justin Anyanwu', avatar: logo.src },
  { id: 3, name: 'Paul Chiambase', avatar: logo.src },
  { id: 4, name: 'Obi Chioma', avatar: logo.src },
  { id: 5, name: 'Rejoice Imoisime', avatar: logo.src },
  { id: 6, name: 'Emperor blessed', avatar: logo.src },
  { id: 7, name: 'Ifeanyi Anyanwu', avatar: logo.src },
  { id: 8, name: 'Adebayo christian', avatar: logo.src }
];

const Stories = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-inherit md:bg-white rounded p-0 md:p-4 flex flex-col gap-2.5">
      <div className="hidden md:flex justify-between items-center">
        <button className="flex items-center gap-1 cursor-pointer">
          <span className="text-[10px] text-[#3A3D46]">All stories</span>
          <IoChevronDown size={16} className="text-[#3A3D46]" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className={`h-6 w-6 flex items-center justify-center rounded ${
              canScrollLeft
                ? 'bg-[#2D439B] text-white cursor-pointer'
                : 'bg-[#F5F5F5] text-[#7A7F8C] cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <IoChevronBack size={14} />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`h-6 w-6 flex items-center justify-center rounded ${
              canScrollRight
                ? 'bg-[#2D439B] text-white cursor-pointer'
                : 'bg-[#F5F5F5] text-[#7A7F8C] cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
          >
            <IoChevronForward size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-0.5 min-w-[55px] grow cursor-pointer"
          >
            <div className="relative">
              <div className={`w-full aspect-square rounded-full border ${
                story.isYourStory ? 'border-[#7A7F8C]' : 'border-[#2D439B]'
              } overflow-hidden`}>
                <Image
                  src={story.avatar}
                  alt={story.name}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              {story.isYourStory && (
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-[5px] bg-[#2D439B] border-2 border-white flex items-center justify-center">
                  <IoAddOutline size={14} className="text-white" />
                </div>
              )}
            </div>
            <span className="text-[8px] text-[#3A3D46] text-center w-full truncate">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories