import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsReplyAll } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { ClickAwayListener } from "@mui/material";
import CommentPopOver from "./commentpopover";
import { likeComment, unlikeComment } from "@/api/post";
import formatTime from "@/utils/timeformater";

type CommentListProps = {
  comments: Comments;
  setComments: Dispatch<SetStateAction<Comments[]>>;
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(comments.is_liked);
  const [likeCount, setLikeCount] = useState(comments.likes_count);

  const router = useRouter();

  const handleClose = () => {
    setIsPopOverOpen(false);
  };

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      await unlikeComment({ comment_id: comments.id});
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      await likeComment({ comment_id: comments.id});
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
            <p className="text-[12px] md:text-[13px]">username or name</p>
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
                  router.push(`#`);
                }}
              >
                <IoChatbubbleOutline
                  size={20}
                  className="text-[#3A3D46] dark:text-white"
                />
                <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  {comments.id}
                </span>
              </button>

              <button
                className="flex items-end gap-0.5 cursor-pointer"
                onClick={() => {}}
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
                      <div className="absolute right- w-[140px] bg-white dark:bg-[#121212] rounded shadow-lg overflow-hidden ">
                        <CommentPopOver onClose={handleClose} />
                      </div>
                    </ClickAwayListener>
                  )}
                </div>
                {/* <span className="text-[13px] text-[#3A3D46] dark:text-white">
                  spread
                </span> */}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
