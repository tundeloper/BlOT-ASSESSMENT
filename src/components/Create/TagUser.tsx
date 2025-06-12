import { Dispatch, SetStateAction } from "react";

interface Props {
  onChange: Dispatch<SetStateAction<boolean>>;
}

export default function TagUser({onChange}: Props) {
    return <div className="absolute top-0 right-0 p-2 text-[13px] md:text-[16px] md:p-4 text-[#1E1E1E] h-full w-full bg-white dark:bg-[#121212]">
        <div className="flex justify-between">
            <div>
                <span className="text-[13px] md:text-[16px] text-[#1E1E1E] dark:text-white">Tag People</span>
            </div>
            <button className="text[#2D439B] dark:text-[#2D439B] cursor-pointer" onClick={() => {onChange(false)}}>Next</button>
        </div>
    </div>
}
