"use client";

import { useState } from "react";
import { ChevronUp, MapPin, Settings, Users } from "lucide-react";
import VisibilitySelector from "./Visibility";
import TagUser from "./TagUser";

export default function PostSettings() {
  const [openSection, setOpenSection] = useState<"post" | "comment" | null>(
    null
  );

  const [tag, setTag] = useState<boolean>(false)
  const [addLocation, setAddLocation] = useState<boolean>(false)

  const [postVisibility, setPostVisibility] = useState<
    "everyone" | "followers" | "private"
  >("everyone");

  const [commentVisibility, setCommentVisibility] = useState<
    "everyone" | "followers" | "private"
  >("followers");

  const toggleSection = (section: "post" | "comment") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const rotateClass = (section: "post" | "comment") =>
    openSection === section
      ? "rotate-180 transition-transform duration-300"
      : "rotate-0 transition-transform duration-300";

  return (
    <div className="w-full bg-inherit rounded-md shado space-y-2 text-sm text-gray-800 dark:text-white transition-colors duration-300">
      {/* Tag people */}
      <div className="flex items-center justify-between cursor-pointer px-2 py-2 rounded" onClick={() => setTag(prev => !prev)}>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-white" />
          <span className="text-[13px] md:text-[16px]">Tag people</span>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-white" />
      </div>
      {tag && <TagUser onChange={setTag} />}

      {/* Add location */}
      <div className="flex items-center justify-between cursor-pointer px-2 py-2 rounded" onClick={() => setAddLocation(prev => !prev)}>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600 dark:text-white" />
          <span className="text-[13px] md:text-[16px]">Add location</span>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-white" />
      </div>
      {addLocation && <TagUser onChange={setAddLocation} />}

      {/* Post settings */}
      <div>
        <div
          onClick={() => toggleSection("post")}
          className="flex items-center justify-between cursor-pointer px-2 py-2 rounded"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600 dark:text-white" />
            <span className="text-[13px] md:text-[16px]">Post settings</span>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-gray-500 ${rotateClass(
              "post"
            )} dark:text-white`}
          />
        </div>
        {openSection === "post" && (
          <VisibilitySelector
            type={openSection}
            value={postVisibility}
            onChange={setPostVisibility}
          />
        )}
      </div>

      {/* Comment settings */}
      <div>
        <div
          onClick={() => toggleSection("comment")}
          className="flex items-center justify-between cursor-pointer px-2 py-2 rounded"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600 dark:text-white" />
            <span className="text-[13px] md:text-[16px]">Comment settings</span>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-gray-500 ${rotateClass(
              "comment"
            )} dark:text-white`}
          />
        </div>
        {openSection === "comment" && (
          <VisibilitySelector
            type={openSection}
            value={commentVisibility}
            onChange={setCommentVisibility}
          />
        )}
      </div>
    </div>
  );
}
