import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsEmojiSmile, BsReplyAll } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { CircularProgress, ClickAwayListener } from "@mui/material";
import CommentPopOver from "./commentpopover";
import {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from "@/api/post";
import formatTime from "@/utils/timeformater";
import { useTheme } from "@/context/ThemeContext";
import { enqueueSnackbar } from "notistack";
import { HiOutlineGif } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";
import { GiCancel } from "react-icons/gi";
import insertReply, { removeComment, toggleLike } from "@/utils/comment_helper";

type CommentListProps = {
  comments: Comments;
  setComments: Dispatch<SetStateAction<Comments[]>>;
};

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
  // const { user, isAuthenticated } = useAuthStore();

  const [isPopOverOpen, setIsPopOverOpen] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showNextComment, setShowNextComment] = useState(false);
  const [comment, setComment] = useState("");
  // const [isLiked, setIsLiked] = useState(comments.is_liked);
  // const [likeCount, setLikeCount] = useState(comments.likes_count);

  const { theme } = useTheme();

  const handleClose = () => {
    setIsPopOverOpen(false);
  };

  const handleLike = async () => {
    if (comments.is_liked) {
      await unlikeComment({ comment_id: comments.id });
      setComments((prev) => toggleLike(prev, comments.id));
    } else {
      await likeComment({ comment_id: comments.id });
      setComments((prev) => toggleLike(prev, comments.id));
    }
  };

  const handleDelete = async () => {
    const res = await deleteComment(comments.id);
    console.log(res);
    setComments((prev) => removeComment(prev, comments.id));
  };

  const handleComment = async () => {
    // if (!isAuthenticated) {
    //   setOpenAuthModal(true);
    //   return;
    // }
    if (comment.trim() === "") return;
    setIsCommenting(true);
    const res = await createComment({
      post_id: comments.post_id,
      parent_id: comments.id,
      content: comment,
    });
    if (res.success) {
      setComment("");
      setIsCommentFocused(false);
      setIsCommenting(false);
      console.log(res);
      setComments((prev) => {
        if (res.data === null) return [];
        return insertReply(prev, res.data);
      });
    } else {
      enqueueSnackbar("Failed to comment", { variant: "error" });
      setIsCommenting(false);
    }
  };

  return (
    <div>
      <div className="flex start gap-2 mt-1">
        <div className="w-8 h-8 rounded-[20px] overflow-hidden">
          <Image
            src={
              comments?.author_profile_picture ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                comments?.author_name?.trim() || ""
              )}&format=png`
            }
            alt={comments?.author_name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <p className="text-[12px] md:text-[13px]">{comments.author_name}</p>
            <p className="text-[8px]">{formatTime(comments.created_at)}</p>
          </div>

          <p className="mt-1 text-[12px] md:text-[13px]">{comments.content}</p>

          <div className="mt-3" id="interaction">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-end gap-0.5 cursor-pointer"
              >
                {comments.is_liked ? (
                  <AiFillHeart size={20} className="text-[#9A1B39]" />
                ) : (
                  <AiOutlineHeart
                    size={20}
                    className="text-[#3A3D46] dark:text-white"
                  />
                )}
                <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  {comments.likes_count}
                </span>
              </button>

              <button
                className="flex items-end gap-0.5 cursor-pointer"
                onClick={() => {
                  setShowNextComment((prev) => !prev);
                }}
              >
                <IoChatbubbleOutline
                  size={20}
                  className="text-[#3A3D46] dark:text-white"
                />
                <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  {comments.replies.length}
                </span>
              </button>

              <button
                className="flex items-end gap-0.5 cursor-pointer"
                onClick={() => {
                  setReplying((prev) => !prev);
                }}
              >
                <BsReplyAll
                  size={20}
                  className="text-[#3A3D46] dark:text-white"
                />
                {/* <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  {post?.reposts_count}
                </span> */}
              </button>

              <label
                className="flex items-end gap-0.5 cursor-pointer"
                onClick={() => {
                  setIsPopOverOpen(true);
                }}
              >
                <div className="relative">
                  <HiDotsHorizontal
                    size={20}
                    className="text-[#3A3D46] dark:text-white"
                  />

                  {isPopOverOpen && (
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsPopOverOpen(false);
                      }}
                    >
                      <div className="absolute right- w-[140px] bg-white rounded shadow-lg overflow-hidden z-50">
                        <CommentPopOver
                          onClose={handleClose}
                          handleDelete={handleDelete}
                        />
                      </div>
                    </ClickAwayListener>
                  )}
                </div>
                {/* <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  spread
                </span> */}
              </label>
            </div>
            {replying && (
              <ClickAwayListener
                onClickAway={() => {
                  setReplying(false);
                }}
              >
                <>
                  <div className="w-full mt-1">
                    <div className="flex justify-between w-full bg-[#E4E6EC] dark:bg-[#1A1C20] rounded-sm px-3 py-2 ">
                      <p className="text-[12px] mdtext-[13px]">
                        Replying to {comments.author_name}
                      </p>
                      <GiCancel
                        className="text-[#3A3D46] dark:text-white cursor-pointer"
                        onClick={() => {
                          setReplying(false);
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-[11px] md:text-[13px] ">
                          @{comments.author_username}
                        </span>
                        <input
                          type="text"
                          placeholder="Write a comment"
                          className="flex-1 bg-transparent text-[12px] text-[#3A3D46] dark:text-white outline-none placeholder:text-[#3A3D46] dark:placeholder:text-white h-[30px]"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          onFocus={() => setIsCommentFocused(true)}
                        />
                      </div>
                      {isCommentFocused && (
                        <button
                          onClick={handleComment}
                          className="cursor-pointer"
                        >
                          {isCommenting ? (
                            <CircularProgress
                              size={20}
                              sx={{
                                color: theme === "dark" ? "#fff" : "#3A3D46",
                              }}
                            />
                          ) : (
                            <AiOutlineSend
                              size={20}
                              className="text-[#3A3D46] dark:text-white"
                            />
                          )}
                        </button>
                      )}
                    </div>
                    {isCommentFocused && (
                      <div className="flex justify-between w-full items-center">
                        <div className="flex gap-4 items-center">
                          <label htmlFor="image" className="cursor-pointer">
                            <CiImageOn
                              size={20}
                              className="text-[#3A3D46] dark:text-white"
                            />
                          </label>
                          <input type="file" id="image" className="hidden" />
                          <button className="cursor-pointer">
                            <HiOutlineGif
                              size={20}
                              className="text-[#3A3D46] dark:text-white"
                            />
                          </button>
                          <button className="cursor-pointer">
                            <BsEmojiSmile
                              size={18}
                              className="text-[#3A3D46] dark:text-white"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
      {/* <CommentList comments={comments.replies} setComments={setComments} /> */}
      {showNextComment &&
        comments.replies.map((comments) => (
          <CommentList
            key={comments.id}
            comments={comments}
            setComments={setComments}
          />
        ))}
    </div>
  );
};

export default CommentList;
