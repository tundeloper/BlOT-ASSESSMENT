import React, { useEffect, useRef, useState } from 'react';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageDetail } from 'react-icons/bi';
import Image from 'next/image';
import logo from '@/assets/logo2.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authstore';
import Link from 'next/link';
import axios from 'axios';
import { socketUrl } from '@/utils/notification';

const Header: React.FC<{ onSidebarOpen: () => void }> = ({ onSidebarOpen }) => {
  const {theme} = useTheme()
  const {user} = useAuthStore()
  const {token} = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  // const [unreaMesaagecount, setUnreaMesaagecount] = useState<number>(0);
  
  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl());

    socketRef.current.onopen = (event) => {
      // console.log("✅ WebSocket connected");
      console.log("Socket ID:", event.currentTarget);
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        const eventType = message.event;
        const payload = message.data;

        switch (eventType) {
          case "notification":
            // console.log("🔔 Notification received:", payload);
            setNotifications((prev) => [payload, ...prev,]);
            break;
          case "unread_notifications":
            // console.log("Unread notifications count:", payload);
            setUnreadCount(payload.count);
            // if(payload.count > 0) sound.play(); 
            break;

          case "direct_message":
            // console.log("📨 Direct message:", payload);
            // setMessages((prev) => [...prev, payload]);
            // if (payload.sender !== 'userId') sound.play();
            // if (payload.sender !== 'userId') sound.play();
            break;

          case "direct_message_sent":
            console.log("✅ Message sent:", payload);
            break;

          case "unread_messages":
            // console.log("📥 Unread messages count:", payload);
            // setUnreaMesaagecount(payload.count);
            // if(payload.count > 0) sound.play();
            break;

          default:
            console.warn("⚠️ Unknown event type:", eventType, payload);
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", err);
      }
    };

    // socketRef.current.onmessage = (event) => {
    //   console.log('📨 Message:', event);
    //   setMessages(prev => [...prev, event.data]);
    // };

    socketRef.current.onerror = (error) => {
      console.warn("❌ WebSocket error:", error);
    };

    socketRef.current.onclose = (event) => {
      console.warn("🔌 WebSocket closed:", event.reason);
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

  return (
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
              placeholder="Search sportlaze"
              className="hidden md:block w-[282px] h-[36px] px-4 py-1 border border-[#F9FAFB] rounded-[4px] text-sm placeholder-[#7A7F8C] text-[#7A7F8C] focus:outline-none focus:border-blue-500"
            />
            <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A7F8C] text-lg" />
          </div>
        </div>
        <div className="relative p-1 cursor-pointer">
          <BiMessageDetail size={24} className="text-[#3A3D46] dark:text-white" />
        </div>

        <div className="relative p-1 cursor-pointer">
          <IoMdNotificationsOutline size={24} className="text-[#3A3D46] dark:text-white" />
          {isConnected && notifications.length > 0 && <span className="absolute -top-2 -right-2 bg-[#FF4D4F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
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
  );
};

export default Header;