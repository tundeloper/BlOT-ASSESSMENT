import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

// Type representing a story
interface Story {
  id: string;
  url: string;
  type: 'image' | 'video';
  user: string;
  avatar?: string;
  timestamp: number;
  caption?: string;
}

// Type representing a preview item before sharing
interface PreviewItem {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'video';
  caption: string;
}

const STORIES_DURATION = 5000; // Duration per story in ms

// Helper to format time ago
const getTimeAgo = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const CURRENT_USER = 'You'; // identifier for current user; replace as needed

const StoriesSection: React.FC = () => {
  // Main stories state, including dummy stories with multiple per user
  const [stories, setStories] = useState<Story[]>(() => {
    const now = Date.now();
    return [
      // Alice has 3 stories
      {
        id: 'alice-1', url: 'https://via.placeholder.com/400x700?text=Alice+Story+1', type: 'image', user: 'Alice', avatar: 'https://i.pravatar.cc/150?u=Alice', timestamp: now - 1000 * 60 * 10,
      },
      {
        id: 'alice-2', url: 'https://via.placeholder.com/400x700?text=Alice+Story+2', type: 'image', user: 'Alice', avatar: 'https://i.pravatar.cc/150?u=Alice', timestamp: now - 1000 * 60 * 8,
      },
      {
        id: 'alice-3', url: 'https://via.placeholder.com/400x700?text=Alice+Story+3', type: 'image', user: 'Alice', avatar: 'https://i.pravatar.cc/150?u=Alice', timestamp: now - 1000 * 60 * 5,
      },
      // Bob has 2 stories
      {
        id: 'bob-1', url: 'https://via.placeholder.com/400x700?text=Bob+Story+1', type: 'image', user: 'Bob', avatar: 'https://i.pravatar.cc/150?u=Bob', timestamp: now - 1000 * 60 * 40,
      },
      {
        id: 'bob-2', url: 'https://via.placeholder.com/400x700?text=Bob+Story+2', type: 'image', user: 'Bob', avatar: 'https://i.pravatar.cc/150?u=Bob', timestamp: now - 1000 * 60 * 30,
      },
      // Charlie has 3 stories
      {
        id: 'charlie-1', url: 'https://via.placeholder.com/400x700?text=Charlie+Story+1', type: 'image', user: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=Charlie', timestamp: now - 1000 * 60 * 90,
      },
      {
        id: 'charlie-2', url: 'https://via.placeholder.com/400x700?text=Charlie+Story+2', type: 'image', user: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=Charlie', timestamp: now - 1000 * 60 * 60,
      },
      {
        id: 'charlie-3', url: 'https://via.placeholder.com/400x700?text=Charlie+Story+3', type: 'image', user: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=Charlie', timestamp: now - 1000 * 60 * 30,
      },
      // Ensure current user group present (empty initially)
    ];
  });
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentUserStories, setCurrentUserStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const pauseByHold = useRef(false);

  // Preview modal state
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Utility: group stories by user, always include current user first
  const getGroupedByUser = () => {
    const grouped: { user: string; avatar?: string; stories: Story[] }[] = [];
    // Current user stories first (even if empty)
    const currentStories = stories.filter(s => s.user === CURRENT_USER);
    grouped.push({ user: CURRENT_USER, avatar: undefined, stories: currentStories });
    // Other users
    const othersMap: Record<string, { avatar?: string; stories: Story[] }> = {};
    stories.forEach(story => {
      if (story.user === CURRENT_USER) return;
      if (!othersMap[story.user]) {
        othersMap[story.user] = { avatar: story.avatar, stories: [story] };
      } else {
        othersMap[story.user].stories.push(story);
      }
    });
    Object.entries(othersMap).forEach(([user, { avatar, stories }]) => {
      grouped.push({ user, avatar, stories });
    });
    return grouped;
  };

  // Handle avatar click: open current user's stories or trigger add
  const handleCurrentUserClick = () => {
    const userStories = stories.filter(s => s.user === CURRENT_USER);
    if (userStories.length > 0) {
      openViewer(userStories);
    } else {
      fileInputRef.current?.click();
    }
  };

  // Handle file selection for preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const items: PreviewItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('video/') ? 'video' : 'image';
        items.push({ id: `${Date.now()}-${Math.random()}-${i}`, file, url, type, caption: '' });
      }
      setPreviewItems(items);
      setPreviewIndex(0);
      setIsPreviewOpen(true);
      e.target.value = '';
    }
  };

  // Preview navigation
  const goNextPreview = () => { if (previewIndex < previewItems.length - 1) setPreviewIndex(idx => idx + 1); };
  const goPrevPreview = () => { if (previewIndex > 0) setPreviewIndex(idx => idx - 1); };

  // Discard/share preview
  const discardPreview = () => {
    setPreviewItems(prev => {
      const updated = prev.filter((_, idx) => idx !== previewIndex);
      if (updated.length === 0) closePreview();
      else if (previewIndex >= updated.length) setPreviewIndex(updated.length - 1);
      return updated;
    });
  };
  const shareCurrentPreview = () => {
    const item = previewItems[previewIndex];
    const newStory: Story = { id: item.id, url: item.url, type: item.type, user: CURRENT_USER, avatar: undefined, timestamp: Date.now(), caption: item.caption };
    // send to backend
    setStories(prev => [newStory, ...prev]);
    discardPreview();
  };
  const closePreview = () => { setIsPreviewOpen(false); setPreviewItems([]); setPreviewIndex(0); };

  // Story viewer open logic
  const openViewer = (userStories: Story[]) => {
    setCurrentUserStories(userStories);
    setCurrentIndex(0);
    setProgress(0);
    progressRef.current = 0;
    setIsPaused(false);
    pauseByHold.current = false;
    setIsViewerOpen(true);
  };
  const closeViewer = () => { setIsViewerOpen(false); clearTimer(); };
  const clearTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  // Auto-advance logic
  useEffect(() => {
    if (isViewerOpen && currentUserStories.length > 0 && !isPaused) startProgress();
    return () => clearTimer();
  }, [isViewerOpen, currentIndex, currentUserStories, isPaused]);

  const startProgress = () => {
    clearTimer();
    setProgress(progressRef.current);
    const interval = 50;
    const step = (interval / STORIES_DURATION) * 100;
    timerRef.current = setInterval(() => {
      if (isPaused) return;
      progressRef.current += step;
      if (progressRef.current >= 100) {
        progressRef.current = 100; setProgress(100); clearTimer(); handleNextStory();
      } else setProgress(progressRef.current);
    }, interval);
  };

  // Navigate next/prev story or user
  const handleNextStory = () => {
    clearTimer(); progressRef.current = 0; setProgress(0);
    if (currentIndex < currentUserStories.length - 1) setCurrentIndex(idx => idx + 1);
    else {
      const groups = getGroupedByUser();
      const currentUser = currentUserStories[0]?.user;
      const groupIndex = groups.findIndex(g => g.user === currentUser);
      if (groupIndex >= 0 && groupIndex < groups.length - 1) {
        const nextGroup = groups[groupIndex + 1]; setCurrentUserStories(nextGroup.stories); setCurrentIndex(0);
      } else closeViewer();
    }
  };
  const handlePrevStory = () => {
    clearTimer(); progressRef.current = 0; setProgress(0);
    if (currentIndex > 0) setCurrentIndex(idx => idx - 1);
    else {
      const groups = getGroupedByUser();
      const currentUser = currentUserStories[0]?.user;
      const groupIndex = groups.findIndex(g => g.user === currentUser);
      if (groupIndex > 0) {
        const prevGroup = groups[groupIndex - 1]; setCurrentUserStories(prevGroup.stories); setCurrentIndex(prevGroup.stories.length - 1);
      }
    }
  };

  // Toggle pause/play
  const togglePause = (e?: React.MouseEvent) => { e?.stopPropagation(); pauseByHold.current = false; setIsPaused(prev => !prev); };

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreviewOpen) {
        if (e.key === 'Escape') { e.preventDefault(); closePreview(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goNextPreview(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrevPreview(); }
      } else if (isViewerOpen) {
        if (e.key === 'Escape') { e.preventDefault(); closeViewer(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); handleNextStory(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrevStory(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, currentUserStories, currentIndex, isPreviewOpen, previewIndex, previewItems]);

  // Touch handlers for viewer: pause on hold, swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; pauseByHold.current = true; setIsPaused(true); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 50;
      if (dx > threshold) handlePrevStory(); else if (dx < -threshold) handleNextStory();
    }
    if (pauseByHold.current) { setIsPaused(false); pauseByHold.current = false; }
    touchStartX.current = null;
  };

  // Touch handlers for preview
  const handlePreviewTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handlePreviewTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 50;
      if (dx > threshold) goPrevPreview(); else if (dx < -threshold) goNextPreview();
    }
    touchStartX.current = null;
  };

  const groupedByUser = getGroupedByUser();

  return (
    <div className="w-full">
      {/* Stories List: current user always visible first */}
      <div className="flex items-center py-1">
        {groupedByUser.map(group => {
          const isCurrent = group.user === CURRENT_USER;
          return (
            <div key={group.user} className="relative flex flex-col items-center" onClick={() => isCurrent ? handleCurrentUserClick() : openViewer(group.stories)}>
              <div className={`w-11 h-11 rounded-full overflow-hidden ${isCurrent ? 'ring-2 ring-blue-500' : 'ring-0'}`}> 
                {group.avatar ? (
                  <Image width={50} height={50} src={group.avatar} alt={group.user} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-lg text-white">{group.user.charAt(0)}</span>
                  </div>
                )}
              </div>
              <span className="text-xs mt-1 truncate w-20 text-center">
                {isCurrent ? 'Your Story' : group.user}
              </span>
              {/* Add indicator + always visible */}
              {isCurrent && (
                <button onClick={(e) => { e.stopPropagation(); handleCurrentUserClick(); }} className="absolute bottom-5 right-[10px] bg-blue-500 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Hidden file input for add story */}
      <input type="file" accept="image/*,video/*" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      {/* Preview Modal before sharing */}
      {isPreviewOpen && previewItems.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onTouchStart={handlePreviewTouchStart} onTouchEnd={handlePreviewTouchEnd}>
          <div className="relative w-full max-w-md bg-white rounded-lg overflow-hidden">
            {/* Preview Content */}
            <div className="relative w-full h-96 bg-black flex items-center justify-center">
              {previewItems[previewIndex].type === 'video' ? (
                <video src={previewItems[previewIndex].url} controls className="max-w-full max-h-full" />
              ) : (
                <Image width={300} height={300} src={previewItems[previewIndex].url} alt="preview" className="max-w-full max-h-full object-contain" />
              )}
              {previewIndex > 0 && (
                <button onClick={goPrevPreview} className="absolute left-2 text-white bg-black bg-opacity-50 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {previewIndex < previewItems.length - 1 && (
                <button onClick={goNextPreview} className="absolute right-2 text-white bg-black bg-opacity-50 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
            {/* Caption input */}
            <div className="p-4">
              <textarea
                value={previewItems[previewIndex].caption}
                onChange={e => setPreviewItems(prev => prev.map((item, idx) => idx === previewIndex ? { ...item, caption: e.target.value } : item))}
                placeholder="Add a caption..."
                className="w-full p-2 border rounded resize-none"
                rows={2}
              />
            </div>
            {/* Actions: Discard, Share */}
            <div className="flex justify-between p-4 border-t">
              <button onClick={discardPreview} className="px-4 py-2 bg-red-500 text-white rounded">Discard</button>
              <button onClick={shareCurrentPreview} className="px-4 py-2 bg-blue-600 text-white rounded">Share to Story</button>
            </div>
            {/* Close preview */}
            <button onClick={closePreview} className="absolute top-2 right-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Story Viewer Modal */}
      {isViewerOpen && currentUserStories.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={togglePause} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Top row: progress + close */}
          <div className="absolute flex justify-between items-center top-0 left-0 w-full p-2 bg-black bg-opacity-50 flex(items-center justify-between)" onClick={e => e.stopPropagation()}>
            <div className="flex-1 mx-2 flex space-x-1">
              {currentUserStories.map((_, idx) => (
                <div key={idx} className="flex-1 h-1 bg-gray-500 rounded">
                  <div className="h-full bg-white rounded" style={{ width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' }} />
                </div>
              ))}
            </div>
            <button onClick={closeViewer} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Details & controls below progress */}
          <div className="absolute flex justify-between items-center top-8 left-0 w-full p-4 flex(items-center justify-between) text-white" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-2">
              {currentUserStories[currentIndex].avatar ? (
                <Image width={300} height={300} src={currentUserStories[currentIndex].avatar} alt={currentUserStories[currentIndex].user} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                  <span className="text-white text-sm">{currentUserStories[currentIndex].user.charAt(0)}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{currentUserStories[currentIndex].user}</span>
                <span className="text-xs">{getTimeAgo(currentUserStories[currentIndex].timestamp)}</span>
              </div>
            </div>
            <button onClick={togglePause} className="text-white">
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 19l-8-7 8-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Prev Arrow */}
            <button onClick={e => { e.stopPropagation(); handlePrevStory(); }} className="absolute left-4 text-white bg-black bg-opacity-30 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Next Arrow */}
            <button onClick={e => { e.stopPropagation(); handleNextStory(); }} className="absolute right-4 text-white bg-black bg-opacity-30 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Story Media */}
            <div className="max-w-full max-h-full flex items-center justify-center">
              {currentUserStories[currentIndex].type === 'video' ? (
                <video src={currentUserStories[currentIndex].url} autoPlay={!isPaused} muted playsInline className="max-w-full max-h-full" />
              ) : (
                <Image width={300} height={300} src={currentUserStories[currentIndex].url} alt="story" className="max-w-full max-h-full object-contain" />
              )}
            </div>

            {/* Reply Input */}
            <div className="absolute bottom-0 w-full p-4 flex items-center" onClick={e => e.stopPropagation()}>
              <input type="text" placeholder="Write a reply" className="flex-1 p-2 rounded-full bg-white bg-opacity-80 text-black placeholder-gray-600 focus:outline-none" />
              <button className="ml-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesSection;
