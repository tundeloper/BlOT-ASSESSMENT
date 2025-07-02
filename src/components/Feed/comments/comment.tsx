"use client";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { getComment } from "@/api/post";

const Comment = ({ post_id }: { post_id: number }) => {
  const [comments, setComments] = useState<Comments[]>([]);
  
  useEffect(() => {
    (async () => {
      const response = await getComment(post_id);
      if (response.data) setComments(response.data)
    })();
  }, []);

  return (
    <div className="w-full text-[#1E1E1E] dark:text-[#FFFFFF]">
      <div className="flex justify-between py-[14px] md:py-[16px]">
        <p className="text-[16px]">Comments</p>
        <div>
          <span className="text-[13px] cursor-pointer">Most Recent</span>
        </div>
      </div>
      {comments.map((comments) => (
        <CommentList comments={comments} setComments={setComments} key={comments.id} />
      ))}
    </div>
  );
};

export default Comment;
