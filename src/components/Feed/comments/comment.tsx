"use client";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { getComment } from "@/api/post";
import { IoChevronDown } from "react-icons/io5";
import { ClickAwayListener } from "@mui/material";
import { BiSort } from "react-icons/bi";

const Comment = ({
  post_id,
  isCommenting,
}: {
  post_id: number;
  isCommenting: boolean;
}) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState('Most Recent');

  useEffect(() => {
    (async () => {
      const response = await getComment(post_id);
      if (response.data) setComments(response.data);
    })();
  }, [post_id, isCommenting]);

  const handleSort = (option: string) => {
    setSelectedSort(option);
    setShowDropdown(false);
  };

  return (
    <div className="w-full text-[#1E1E1E] dark:text-[#FFFFFF]">
      <div className="flex justify-between py-[14px] md:py-[16px]">
        <p className="text-[16px]">Comments</p>
        <div className="relative">
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-[#3A3D46] dark:text-white text-sm font-normal cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <BiSort className="w-4 h-4" />
            <p className="text-[13px] text-nowrap">{selectedSort}</p>
            <IoChevronDown className="w-4 h-4" />
          </button>
          <div className="relative">
            {showDropdown && <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
              <div className="absolute right-0 mt-2 w-[150px] bg-white dark:bg-[#23262F] rounded shadow-lg border border-[#F0F0F0] dark:border-[#23262F] z-50">
                {[
                  "Most Recent",
                  "Most Relevant",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSort(option)}
                    className={`w-full cursor-pointer text-left px-4 py-2 text-[13px] text-[#3A3D46] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#121212] ${
                      selectedSort === option ? "font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </ClickAwayListener>}
          </div>
        </div>
      </div>
      {comments.map((comments) => (
        <CommentList
          comments={comments}
          setComments={setComments}
          key={comments.id}
        />
      ))}
    </div>
  );
};

export default Comment;
