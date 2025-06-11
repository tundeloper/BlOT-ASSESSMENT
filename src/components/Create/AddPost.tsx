"use client";
import { Avatar } from "@mui/material";
import Image from "next/image";
import GradientButton from "../ui/gradientButton";
import ImageIcon from "@/assets/svg/image";
import GifIcon from "@/assets/svg/gif";
import EmojiIcons from "@/assets/svg/emoji_Icon";
import PollIcon from "@/assets/svg/poll";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

const AddPost = () => {
  const { theme } = useTheme();

  const MAX_CHARS = 200;

  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setText(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      // TODO: Add your API submission logic here
      console.log("Submitted:", text);
      setText("");
    }
  };

  return (
    <div
      className="bg-inherit md:bg-white rounded p-0 md:p-4 flex flex-col gap-2.5 dark:bg-inherit dark:md:bg-[#121212]"
      id="create-post"
    >
      {/* user details  */}
      <div className="flex gap-2">
        <Avatar
          src="/image/user.png"
          className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
          sx={{ width: 50, height: 50 }}
        />
        <div>
          <p className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">
            Chinagozie Anyanwu
          </p>
          <button className="flex gap-2 cursor-pointer">
            <Image
              src="/image/globe.png"
              height={16}
              width={16}
              alt="globe image"
            />
            <span className="text-[10px] md:text-[13px] font-switzer dark:text-[#C9CDD4]">
              Post to everyone
            </span>
          </button>
        </div>
      </div>

      {/* post field  */}
      <div>
        <textarea
          className="w-full bg-[#F9FAFB] p text-gray-400 dark:text-white border-gray-400 border-1 text-[13px] md:text-[13px]  rounded-sm placeholder-gray-400 resize-none focus:outline-none dark:bg-[#35383F]"
          rows={5}
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
        />
        <div className="flex justify-between items-center mt-2">
          <div />
          {/* <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
              text.trim()
                ? "bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Post
          </button> */}
          <span className="text-sm text-gray-500">
            {text.length} / {MAX_CHARS}
          </span>
        </div>
      </div>

      {/* post content  */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <button>
            <ImageIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </button>
          <button>
            <GifIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </button>
          <button>
            <EmojiIcons fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </button>
          <button>
            <PollIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </button>
        </div>
        <div className="w-[177px] md:w-[270px] gap-3 flex text-white text-[10px] md:text-[13px]">
          <button className="flex-1 bg-[#7A7F8C] rounded-sm py-1 md:py-2 cursor-pointer">
            Save to drafts
          </button>
          <GradientButton
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="flex-1 py-1 md:py-2  text-[10px] md:text-[13px] cursor-pointer"
          >
            Post
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
