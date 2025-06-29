import React, { useEffect, useRef, useState } from 'react';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageDetail } from 'react-icons/bi';
import Image from 'next/image';
import logo from '@/assets/logo2.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTheme } from '@/context/ThemeContext';
import { getAuthTokensFromLocalStorage, useAuthStore } from '@/store/authstore';
import Link from 'next/link';
import axios from 'axios';
import { socketUrl } from '@/utils/notification';
import BackIcons from '@/assets/svg/backIcon';
import SportlazeSearchIcon from '@/assets/svg/sportlaze_search_icon';
import { User } from '@/types/auth';
import Post from '../Feed/Post';
import { CircularProgress } from '@mui/material';
import { handleSocketMessage } from '@/utils/socketsSwitch';

const Header: React.FC<{ onSidebarOpen: () => void }> = ({ onSidebarOpen }) => {
  const {theme} = useTheme()
  const {user} = useAuthStore()
  const {token} = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [search, setSearch] = useState<{users: User[], hashtag_posts: Post[], lounges: [], channels: []}>({users: [], hashtag_posts: [], lounges: [], channels: []})

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  const [searching, setSearching] = useState(false)


  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  // const [unreaMesaagecount, setUnreaMesaagecount] = useState<number>(0);
  
  useEffect(() => {
  socketRef.current = new WebSocket(socketUrl());

  socketRef.current.onopen = (event) => {
    console.log("Socket ID:", event.currentTarget);
    setIsConnected(true);
  };

  socketRef.current.onmessage = (event) => {
    //set the setters here 
    handleSocketMessage(event.data, {
      setNotifications,
      setUnreadCount,
    });
  };

  socketRef.current.onerror = (error) => {
    console.warn("WebSocket error:", error);
  };

  socketRef.current.onclose = (event) => {
    console.warn("WebSocket closed:", event.reason);
    setIsConnected(false);
  };

  return () => {
    socketRef.current?.close();
  };
}, []);


  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL as string}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data) setNotifications([...data]);
      } catch (error) {
        console.log(error, "unable to read unread message count");
      }
    };

    fetchNotification();
  }, [])  

  useEffect(() => {
    (async () => {
      console.log('notifications', notifications)
      setSearching(true)
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL as string}/search/all`, {
        headers: {
          Authorization: `Bearer ${getAuthTokensFromLocalStorage()}`,
        },
        params: {
          query: value,
          limit: 10,
        },
      });
      console.log(data)
      setSearch(data)
      setSearching(false)
      } catch (error) {
        setSearching(false)
        if (axios.isAxiosError(error)) {
          console.warn("Search error")
        }
      }
    })()
  }, [value])

  const handleBlur = () => {
    if (value.trim() === '') setIsActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setIsActive(val.trim() !== '');
  };

  return (
    <>
    <header className="bg-white h-[72px] dark:bg-[#121212] px-4 md:px-8 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <GiHamburgerMenu color={theme === "dark" ? "white" : "#3A3D46"} onClick={onSidebarOpen} className='cursor-pointer w-6 h-6 md:w-8 md:h-8' />
        <Link href="/feed" className="w-8 h-6 md:w-12 md:h-8">
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={value}
              // onFocus={() => setIsActive(true)}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Search sportlaze"
              className="w-[201px] md:w-[282px] h-[36px] px-2 md:px-4 py-1 border border-[#F9FAFB] rounded-[4px] text-sm placeholder-[#7A7F8C] text-[#7A7F8C] focus:outline-none focus:border-blue-500"
            />
            <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A7F8C] text-lg" />
          </div>
        </div>
        <div className="relative p-1 cursor-pointer">
          <BiMessageDetail size={24} className="text-[#3A3D46] dark:text-white" />
        </div>

        <div className="relative p-1 cursor-pointer">
          <IoMdNotificationsOutline size={24} className="text-[#3A3D46] dark:text-white" />
          {isConnected && unreadCount > 0 && <span className="absolute -top-2 -right-2 bg-[#FF4D4F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>}
        </div>

        <div className="p-1 cursor-pointer hidden md:block">
          <IoSettingsOutline size={24} className="text-[#3A3D46] dark:text-white" />
        </div>

        <div className="hidden md:block w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
          <Image src={user?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.trim() || 'Anonymous')}`} alt="profile" width={40} height={40} />
        </div>
      </div>
    </header>
    {isActive && <div className='absolute top-[5rem] md:top-[6rem] flex justify-center w-full items-center z-1000' onClick={(e) => {e.stopPropagation(); setIsActive(false)}}>
        <div className='relative w-[100%] md:w-[56%] h-[86vh] px-0 md:px-[1.5rem] overflow-y-auto scrollbar-hide'>
          <div className='w-full h-full rounded-0 md:rounded-md bg-[#FFFFFF] dark:bg-[#121212] p-4 md:mr-[2rem] overflow-y-auto scrollbar-hide'>
            <div className='flex gap-2 cursor-pointer' onClick={() => setIsActive(false)}><BackIcons fill={`${theme === "dark" ? "#FFFFFF" : "#3A3D46"}`} /> <span className='text-[#1E1E1E] dark:text-[#FFFFFF]'>Back</span></div>

            {/* searches  user */}
            {search.users.length > 0 && !searching && <div>{search.users.map((user, i) => <div key={i} className='w-full'>
              <div
              key={i}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-md"
              onClick={() => {}}
            >
              <div className="hidden md:block w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
                <Image src={user?.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.trim() || 'Anonymous')}`} alt="profile" width={40} height={40} />
              </div>
              <div>
                <p className="font-medium dark:text-white text-[13px] md:text-[16px]">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">
                  {user.username}
                  {/* {user.isFollowing && (
                    <span className="ml-1">• Following</span>
                  )} */}
                </p>
              </div>
            </div>
            </div>)}</div>}

            {search.hashtag_posts.length > 0 && !searching && <div className='my-4'>{search.hashtag_posts.map((post, i) => <div key={i} className='w-full bg-[#FFFFFF] dark:bg-[#121212]'>
              <Post
               post={post}
               isMuted={true}
               isFollowing={true}
                fetchMutedUser={() => {}}
                fetchFollowing={() => {}}
                setOpenAuthModal={() => {}} 
              />
            </div>)}</div>}
            

            {/* when no result found */}
            {searching ? 
            <div className='basolute top-0 flex items-center justify-center h-full w-full bg-transparent'>
              <div className='flex items-center flex-col'>
                <CircularProgress size={40} sx={{ color: '#2D439B' }} /> 
              </div>
            </div>
            :
            search.users.length === 0  && search.hashtag_posts.length === 0 && search.channels.length === 0 && <div className='basolute flex items-center justify-center h-full w-full'>
              <div className='flex items-center flex-col'>
                <SportlazeSearchIcon  fill={`${theme === "dark" ? "#FFFFFF" : "#3A3D46"}`} />
                <p className='font-semibold text-[#3A3D46] text-[20px] text-center md:text-[25px] dark:text-[#FFFFFF] italic'>We searched high and low, but no match!</p>
              </div>
            </div>
            }
          </div>
        </div>
    </div>}
      </>
  );
};

export default Header;