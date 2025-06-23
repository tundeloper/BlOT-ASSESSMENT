import BackIcons from "@/assets/svg/backIcon";
import { useTheme } from "@/context/ThemeContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { Avatar } from "@mui/material";
import { User } from "@/types/auth";
import axios from "axios";

interface Props {
  onChange: Dispatch<SetStateAction<boolean>>;
  tags: User[];
  setTags: Dispatch<SetStateAction<User[]>>;
}

// interface User {
//   name: string;
//   username: string;
//   isFollowing?: boolean;
//   avatar: string;
// }

// const users = [
//   {
//     name: "Marvin McKinney",
//     username: "@marvins1",
//     isFollowing: true,
//     avatar: "/avatars/avatar1.jpg",
//   },
//   {
//     name: "Albert Flores",
//     username: "@marvins2",
//     isFollowing: true,
//     avatar: "/avatars/avatar2.jpg",
//   },
//   {
//     name: "Jenny Wilson",
//     username: "@marvins3",
//     isFollowing: true,
//     avatar: "/avatars/avatar3.jpg",
//   },
//   {
//     name: "Courtney Henry",
//     username: "@marvins4",
//     avatar: "/avatars/avatar4.jpg",
//   },
//   {
//     name: "Theresa Webb",
//     username: "@marvins5",
//     isFollowing: true,
//     avatar: "/avatars/avatar5.jpg",
//   },
// ];

export default function TagUser({ onChange, tags, setTags }: Props) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User[]>([]);

  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(" ")
    .filter(Boolean); // remove empty strings from extra spaces
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";
  return (first + second).toUpperCase();
};

  useEffect(() => {
    try {
      const fetchUser = async () => {
        if (searchTerm.trim() === "") return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/search/users`,
          {
            params: {
              query: searchTerm,
            },
          }
        );
        setUser(data);
      };
      fetchUser();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [searchTerm]);

  const handleTag = (user: User) => {
    if (!tags.find((t) => t.username === user.username)) {
      setTags([...tags, user]);
    }
  };

  const removeTag = (username: string) => {
    setTags(tags.filter((tag) => tag.username !== username));
  };
  return (
    <div className="absolute top-0 right-0 p-2 text-[13px] md:text-[16px] md:p-4 text-[#1E1E1E] h-full w-full bg-white dark:bg-[#121212] z-1">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div onClick={() => onChange(false)} className="cursor-pointer">
            <BackIcons fill={theme === "dark" ? "white" : "#1E1E1E"} />
          </div>
          <span className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">
            Tag people
          </span>
        </div>
        <button
          className="text-[#2D439B] cursor-pointer"
          onClick={() => {
            onChange(false);
          }}
        >
          Next
        </button>
      </div>
      <div className="p-4 w-full pb-6 md:p-4 bg-inherit text-inherit h-[98%] overflow-scroll scrollbar-hide">
        <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="search people"
            className="bg-[#F9FAFB] dark:bg-black dark:text-[#C9CDD4] w-full px-4 py-2 bg:text-white focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="bg-[#2D439B] p-2">
            <Search className="text-white" size={23} />
          </div>
        </div>

        <div className="mt-2 space-y-2">
          {user.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-md"
              onClick={() => handleTag(user)}
            >
              <Avatar
                src={user.profile_picture}
                alt={user.name}
                className="w-10 h-10 rounded-full"
                // width={20}
                // height={20}
                sx={{ bgcolor: "#2D439B" }}
              >{getInitials(user.name)}</Avatar>
              <div>
                <p className="font-medium dark:text-white text-[13px] md:text-[16px]">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">
                  {user.username}
                  {/* {user.isFollowing && (
                    <span className="ml-1">• Following</span>
                  )} */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-2">Tags</p>
            <div className="space-y-2">
              {tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={tag.profile_picture}
                      alt={tag.name}
                      className="w-8 h-8 rounded-full"
                      sx={{ bgcolor: "#2D439B" }}
                    >
                      {getInitials(tag.name)}
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium dark:text-white">
                        {tag.name}
                      </p>
                      <p className="text-xs text-gray-400">{tag.username}</p>
                    </div>
                  </div>
                  <button onClick={() => removeTag(tag.username)}>
                    <X size={16} className="dark:text-white cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
