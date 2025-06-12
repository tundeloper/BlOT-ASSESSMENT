"use client";

import { useState } from "react";
import { Globe, Users, User } from "lucide-react";

type VisibilityOption = "everyone" | "followers" | "private";

const options: {
  label: string;
  value: VisibilityOption;
  icon: React.ElementType;
}[] = [
  { label: "Everyone", value: "everyone", icon: Globe },
  { label: "Your followers", value: "followers", icon: Users },
  { label: "Nobody", value: "private", icon: User },
];

export default function VisibilitySelector({type}: {type: "post" | "comment" | null}) {
  const [selectedVisibility, setSelectedVisibility] = useState<VisibilityOption>("everyone");

  const handleSelect = (value: VisibilityOption) => {
    setSelectedVisibility(value);
    // Here, you could also trigger an API call or pass this up to a parent component
    console.log("Selected visibility:", value);
  };

  return (
    <div className="bg-transparent text-inherit pl-8 mt-5 rounded-md w-full space-y-3">
      <h3 className="text-sm font-semibold">{type === "post" ? "Who can see your posts post?" : "Who can comment on this post?"}</h3>

      {options.map(({ label, value, icon: Icon }) => {
        const isSelected = selectedVisibility === value;

        return (
          <label
            key={value}
            className="flex items-center justify-between px-2 py-2 rounded cursor-pointer transition-colors"
            onClick={() => handleSelect(value)}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-gray-600 dark:text-white" />
              <span>{label}</span>
            </div>
            <input
              type="checkbox"
              checked={isSelected}
              readOnly
              className="form-checkbox h-4 w-4 accent-[#2D439B] text-[#2D439B] rounded cursor-pointer"
            />
          </label>
        );
      })}
    </div>
  );
}
