import React, { Dispatch, SetStateAction } from "react";
import { X, Plus } from "lucide-react";
import Select, { GroupBase, StylesConfig } from "react-select";
import { useTheme } from "@/context/ThemeContext";

const MAX_CHOICES = 4;
const MIN_CHOICES = 2;

export type Option = { value: number; label: string };

interface Props {
  choices: string[];
  setChoices: Dispatch<SetStateAction<string[]>>;
  onchange: Dispatch<SetStateAction<boolean>>;
  pollLength: {
    days: Option;
    hours: Option;
    minutes: Option;
  };
  setPollLength: Dispatch<
    SetStateAction<{
      days: Option;
      hours: Option;
      minutes: Option;
    }>
  >;
}

const generateOptions = (max: number) =>
  Array.from({ length: max }, (_, i) => ({
    value: i,
    label: `${i + 1}`,
  }));

const dayOptions = generateOptions(8);
const hourOptions = generateOptions(24);
const minuteOptions = generateOptions(60);

const PollCreator: React.FC<Props> = ({choices, setChoices, pollLength, setPollLength, onchange}) => {
  const theme = useTheme().theme;
  const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (base) => ({
      ...base,
      height: "50px",
      borderRadius: "6px",
      borderColor: "transparent",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: theme === "dark" ? "white" : "black",
      fontSize: "16px",
      fontFamily: "switzer",
      "&:hover": {
        borderColor: "transparent", // prevents blue border on hover
      },
    }),

    option: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "switzer",
      backgroundColor: theme === "dark" ? "white" : "#7A7F8C", // force remove all background
      color: theme === "dark" ? "black" : "white",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "#2D439B !important",
      },
      "&:active": {
        backgroundColor: "transparent !important",
      },
      "&:focus": {
        backgroundColor: "transparent !important",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "transparent",
    }),

    singleValue: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: theme === "dark" ? "white" : "#7A7F8C",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: theme === "dark" ? "white" : "#7A7F8C",
      "&:hover": {
        color: theme === "dark" ? "white" : "#7A7F8C",
      },
    }),
  };

  // const [choices, setChoices] = useState(["", ""]);
  // const [pollLength, setPollLength] = useState<{
  //   days: Option;
  //   hours: Option;
  //   minutes: Option;
  // }>({
  //   days: { value: 1, label: "1" },
  //   hours: { value: 1, label: "1" },
  //   minutes: { value: 1, label: "1" },
  // });

  const handleChoiceChange = (index: number, value: string) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleAddChoice = () => {
    if (choices.length < MAX_CHOICES) {
      setChoices([...choices, ""]);
    }
  };

  const handleRemoveChoice = (index: number) => {
    if (choices.length > MIN_CHOICES) {
      const updated = [...choices];
      updated.splice(index, 1);
      setChoices(updated);
    }
  };

  //   const handleLengthChange = (field: "days" | "hours" | "minutes", value: number) => {
  //     setPollLength({ ...pollLength, [field]: value });
  //   };

  const handleRemovePoll = () => {
    onchange(false);
    // Reset choices and poll length when removing the poll
    setChoices(["", ""]);
    setPollLength({
      days: { value: 1, label: "1" },
      hours: { value: 1, label: "1" },
      minutes: { value: 1, label: "1" },
    });
  };

  return (
    <div className="p-4 w-full space-y-4">
      {choices.map((choice, index) => (
        <div key={index} className="relative flex items-center">
          <input
            type="text"
            value={choice}
            placeholder={`Choice ${index + 1}`}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="w-full p-[6px_12px] border border-[#D9D9D9] focus:outline-none text-[13px] text-[#7A7F8C] md:text-[13px] focus:ring-1 focus:ring-[black] dark:focus:ring-white"
          />
          {choices.length > 20 && ( // Show remove button only if more than 2 choices  ahould be 2 choices minimum MIN_CHOICES
            <button
              onClick={() => handleRemoveChoice(index)}
              className="ml-2 text-gray-400 hover:text-red-500"
              aria-label="Remove choice"
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}

      {choices.length < MAX_CHOICES && (
        <div className="flex justify-center">
          <button
            onClick={handleAddChoice}
            className="text-2xl text-gray-600 hover:text-blue-600"
            aria-label="Add choice"
          >
            <Plus size={24} className="text-[#3A3D46] dark:text-white hover:text-[#2D439B]" />
          </button>
        </div>
      )}

      <div>
        <label className="block font-medium text-[#3A3D46] dark:text-white mb-1">
          Poll Length
        </label>
        <div className="flex space-x-2">
          <label className="relative border-1 border-[#D9D9D9] flex w-1/3">
            <span className="absolute top-1 left-0 z-1 pl-2 text-[#7A7F8C] dark:text-[#C9CDD4]">
              Days
            </span>
            <Select
              className="flex-1 pt-4"
              styles={customStyles}
              options={dayOptions}
              value={pollLength.days}
              onChange={(selected) =>
                setPollLength((prev) => ({ ...prev, days: selected! }))
              }
            />
          </label>
          <label className="relative border-1 border-[#D9D9D9] flex w-1/3">
            <span className="absolute top-1 left-0 z-1 pl-2 text-[#7A7F8C] dark:text-[#C9CDD4]">
              Hours
            </span>
            <Select
              className="flex-1 pt-4"
              styles={customStyles}
              options={hourOptions}
              value={pollLength.hours}
              onChange={(selected) =>
                setPollLength((prev) => ({ ...prev, hours: selected! }))
              }
            />
          </label>
          <label className="relative border-[1px] border-[#D9D9D9] flex w-1/3">
            <span className="absolute top-1 left-0 z-1 pl-2 text-[#7A7F8C] dark:text-[#C9CDD4]">
              Minutes
            </span>
            <Select
              className="flex-1 pt-4"
              styles={customStyles}
              options={minuteOptions}
              value={pollLength.minutes}
              onChange={(selected) =>
                setPollLength((prev) => ({ ...prev, minutes: selected! }))
              }
            />
          </label>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleRemovePoll}
          className="text-[10px] md:text-[13px] text-[#9A1B39] hover:underline font-medium"
        >
          Remove poll
        </button>
      </div>
    </div>
  );
};

export default PollCreator;
