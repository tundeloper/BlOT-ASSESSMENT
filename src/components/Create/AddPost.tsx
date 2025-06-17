"use client";
import { Avatar, ClickAwayListener } from "@mui/material";
import Image from "next/image";
import GradientButton from "../ui/gradientButton";
import ImageIcon from "@/assets/svg/image";
import GifIcon from "@/assets/svg/gif";
import EmojiIcons from "@/assets/svg/emoji_Icon";
import PollIcon from "@/assets/svg/poll";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import globe from "../../assets/globe.png";
import PostSettings from "./PostSettings";
import { X } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import axios from "axios";
import { useAuthStore } from "@/store/authstore";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import PollCreator from "./PollCreator";

// import user from "../../assets/user.png"s

type FilePreview = {
  file: File;
  previewUrl: string;
  type: "image" | "video";
};

const AddPost = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [togglePoll, setTogglePoll] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { theme } = useTheme();
  const state = useAuthStore();

  const MAX_CHARS = 200;

  const [text, setText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newPreviews: FilePreview[] = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      const type: "image" | "video" = file.type.startsWith("video")
        ? "video"
        : "image";
      return { file, previewUrl: url, type };
    });

    setFiles((prev) => [...prev, ...newPreviews]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async () => {
      // TODO: Add your API submission logic here
      const formData = new FormData();
      formData.append("content", text);
      files.forEach((item) => {
        formData.append("media", item.file);
      });
      try {
        setLoading(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/posts`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (response.data) {
          enqueueSnackbar("Successful", { variant: "success" });
          setText("");
          setFiles([])
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          enqueueSnackbar("Unauthorize", { variant: "error" });
        }
      }
    //   setText("");
  };

  return (
    <div
      className="bg-inherit md:bg-white h-fit rounded p-0 md:p-4 flex flex-col gap-2.5 dark:bg-inherit dark:md:bg-[#121212] transition-colors duration-300"
      id="create-post"
    >
      {/* user details  */}
      <div className="flex gap-2">
        <Avatar
          src={"/image/user.png"}
          className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
          sx={{ width: 50, height: 50 }}
        />
        <div>
          <p className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">
            Chinagozie Anyanwu
          </p>
          <button className="flex gap-2 cursor-pointer">
            <Image src={globe} height={16} width={16} alt="globe" />
            <span className="text-[10px] md:text-[13px] font-switzer dark:text-[#C9CDD4]">
              Post to everyone
            </span>
          </button>
        </div>
      </div>

      {/* post field  */}
      <div>
        {togglePoll ? <PollCreator /> : <textarea
          className="w-full bg-[#F9FAFB] p text-gray-400 p-[8px_16px] dark:text-white border-gray-400 border-1 text-[13px] md:text-[13px]  rounded-sm placeholder-gray-400 resize-none focus:outline-none scrollbar-hide dark:bg-[#35383F] transition-colors duration-300"
          rows={5}
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
        />}
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
          {!togglePoll && <span className="text-sm text-gray-500">
            {text.length} / {MAX_CHARS}
          </span>}
        </div>
      </div>

      {/* post preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {files.map((item, index) => (
            <div key={index} className="relative group">
              {item.type === "image" ? (
                <Image
                  src={item.previewUrl}
                  className="w-full h-40 object-cover rounded-md"
                  alt="preview"
                  width={20}
                  height={20}
                />
              ) : (
                <video
                  src={item.previewUrl}
                  className="w-full h-40 object-cover rounded-md"
                  controls
                />
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-[#9A1B39]"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* post content  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <label className="cursor-pointer">
            <ImageIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              disabled={files.length > 4}
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Gif */}
          <label>
            <GifIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </label>

          {/* emoji */}
          <label className="realative cursor-pointer">
            <div onClick={() => setShowEmojiPicker(true)}>
              <EmojiIcons fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
            </div>
            {showEmojiPicker && (
              <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
                <div className="absolute top-6 scrollbar-hide">
                  {showEmojiPicker && (
                    <EmojiPicker
                      onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                      width="auto"
                      autoFocusSearch
                      skinTonesDisabled
                      style={{ scrollbarColor: "red" }}
                      theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                    />
                  )}
                </div>
              </ClickAwayListener>
            )}
          </label>
          {/* pol */}
          <label onClick={() => {setTogglePoll((prev) => !prev)}} className="cursor-pointer">
            <PollIcon fill={theme === "dark" ? "#FFFFFF" : "#3A3D46"} />
          </label>
        </div>
        <div className="w-[177px] md:w-[270px] gap-3 flex text-white text-[10px] md:text-[13px]">
          <button className="flex-1 bg-[#7A7F8C] rounded-sm py-1 md:py-2 cursor-pointer">
            Save to drafts
          </button>
          <GradientButton
            onClick={handleSubmit}
            disabled={!text.trim() && files.length === 0 || loading}
            className="flex-1 py-1 md:py-2  text-[10px] md:text-[13px] cursor-pointer"
          >
            {loading ? "Posting" : "Post"}
          </GradientButton>
        </div>
      </div>
      <PostSettings />
      <SnackbarProvider />
    </div>
  );
};

export default AddPost;
