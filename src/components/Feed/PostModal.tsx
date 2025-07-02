"use client";
import React, { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { BiBlock } from "react-icons/bi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { FiFlag } from "react-icons/fi";
import { useAuthStore } from "@/store/authstore";
import ReportUserModal from "./ReportUser";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import BlockUser from "./BlockUser";

interface PostMoreDropdownProps {
  post: Post;
  onClose?: () => void;
  handleFollow?: () => void;
  handleBookmark?: () => void;
  isBookmarked?: boolean;
  isFollowing?: boolean;
  userIsMuted: boolean
  handleMute?: () => void;

}

export const PostMoreDropdown: React.FC<PostMoreDropdownProps> = ({
  post,
  onClose,
  handleFollow,
  handleBookmark,
  isBookmarked,
  isFollowing,
  handleMute,
  userIsMuted
}) => {
  //   const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  const handleReportSubmit = async (reason: string, details?: string) => {
    // TODO: call API to submit report
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/report/post`,
        {
          post_id: post.id,
          report_type: reason,
          description: details || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        enqueueSnackbar("Successful", { variant: "success" });
        setIsModalOpen(false);
        onClose?.();
      } else {
        enqueueSnackbar("Unauthorize", { variant: "error" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        enqueueSnackbar("Unauthorize", { variant: "error" });
      }
    }
  };

  const handleBlockSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/block/user`,
        {
          user_id: post.author_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        enqueueSnackbar("Successful", { variant: "success" });
        setIsModalOpen(false);
        onClose?.();
      } else {
        enqueueSnackbar("Unauthorize", { variant: "error" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar("Unauthorize", { variant: "error" });
      }
    }
  };

  const menuItems = [
    {
      icon: <HiUserAdd className="w-4 h-4" />,
      label: isFollowing
        ? `Unfollow ${post.username}`
        : `Follow ${post.username}`,
      onClick: handleFollow,
    },
    {
      icon: <IoVolumeMuteOutline className="w-4 h-4" />,
      label: userIsMuted
        ? `Unmute ${post.username}`
        : `mute ${post.username}`,
      onClick: handleMute
    },
    {
      icon: <BiBlock className="w-4 h-4" />,
      label: "Block",
      onClick: () => {setIsBlockModalOpen(true)},
    },
    {
      icon: <FiFlag className="w-4 h-4" />,
      label: "Report",
      onClick: () => setIsModalOpen(true),
    },
    {
      icon: <BsBookmark className="w-4 h-4" />,
      label: isBookmarked ? "Remove from saved" : "Save post",
      onClick: handleBookmark,
    },
  ];

  // If the username matches the current user's username or name, remove Mute and Block options
  // This is to prevent the user from muting or blocking themselves
  //   if (post.username === user?.username || post.username === user?.name) {
  //     menuItems.splice(0, 4); // Remove Mute and Block options for the current user
  //   }

  return (
    <div className="w-[200px] bg-white rounded shadow-lg overflow-hidden absolute top-10 right-0 z-50">
      {/* Arrow at top right */}
      <div className="flex justify-end px-[22px]">
        <div className="w-3 h-1.5 overflow-hidden">
          <div className="w-3 h-3 bg-white rotate-45 transform origin-bottom-left"></div>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick?.();
              if (item.label === "Report" || item.label === "Block") {
                return;
              }
              onClose?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-[5px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
          >
            <span className="text-[#3A3D46]">{item.icon}</span>
            <span className="text-[13px] text-[#3A3D46] font-normal">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {isBlockModalOpen && (
        <BlockUser
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          onSubmit={handleBlockSubmit}
        />
      )}
      {isModalOpen && (
        <ReportUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReportSubmit}
        />
      )}
      <SnackbarProvider />
    </div>
  );
};
