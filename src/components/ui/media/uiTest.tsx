import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the media item shape
interface MediaItem {
  id: number;
  post_id: number;
  media_type: string; // 'image' or 'video'
  created_at: string;
  media_url: string;
  order_index: number;
}

interface PostDetailProps {
  mediaItems: MediaItem[];
}

export default function PostDetail({ mediaItems }: PostDetailProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((idx) => (idx === 0 ? mediaItems.length - 1 : idx - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((idx) => (idx === mediaItems.length - 1 ? 0 : idx + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const renderMediaElement = (item: MediaItem, onClick: () => void, extraClasses = '') => {
    const baseCls = `w-full object-cover rounded ${extraClasses} cursor-pointer`;
    if (item.media_type.startsWith('video')) {
      return (
        <video
          key={item.id}
          src={item.media_url}
          className={baseCls}
          controls
          onClick={(e) => { 
            e.stopPropagation();
            onClick();
          }}
        />
      );
    }
    return (
      <Image
        width={300}
        height={300}
        key={item.id}
        src={item.media_url}
        alt="media"
        className={baseCls}
        onClick={onClick}
      />
    );
  };

  const renderGrid = () => {
    const count = mediaItems.length;
    if (count === 1) {
      return <div className='flex justify-center h-auto'>{renderMediaElement(mediaItems[0], () => openLightbox(0), "text-center w-full")}</div>
    }
    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-1">
          {mediaItems.map((m, i) => renderMediaElement(m, () => openLightbox(i), 'h-60'))}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1">
          {mediaItems.map((m, i) => {
            if (i < 2) {
              return renderMediaElement(m, () => openLightbox(i), 'h-30 md:h-44 h-full');
            }
            // third item spans full width and has extra height
            return (
              <div key={m.id} className="col-span-2">
                {renderMediaElement(m, () => openLightbox(i), 'h-30 md:h-44')}
              </div>
            );
          })}
        </div>
      );
    }
    // 4 or more
    const display = mediaItems.slice(0, 4);
    const extra = mediaItems.length - 4;
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        {display.map((m, i) => (
          <div key={m.id} className="relative" onClick={() => openLightbox(i)}>
            {renderMediaElement(m, () => openLightbox(i), 'h-48')}
            {i === 3 && extra > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <span className="text-white text-2xl font-semibold">+{extra}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      {renderGrid()}

      {/* Lightbox */}
      <AnimatePresence initial={false} custom={direction}>
        {isLightboxOpen && (
          <motion.div
            key={currentIndex}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute left-4 text-white text-3xl" onClick={prev}>&larr;</button>
            <motion.div
              className="flex items-center justify-center"
              key={mediaItems[currentIndex].id}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mediaItems[currentIndex].media_type.startsWith('video') ? (
                <video
                  src={mediaItems[currentIndex].media_url}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  width={900}
                  height={600}
                  src={mediaItems[currentIndex].media_url}
                  alt="lightbox"
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded"
                />
              )}
            </motion.div>
            <button className="absolute right-4 text-white text-3xl" onClick={next}>&rarr;</button>
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeLightbox}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}