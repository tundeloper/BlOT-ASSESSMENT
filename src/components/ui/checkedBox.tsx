// components/CustomCheckbox.tsx
import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div className={`
        w-[16px] h-[16px] border-[1px] border-[#7A7F8C] 
        flex items-center justify-center
      `}>
        {checked && (
          <svg
            className="w-3 h-3 text-[#7A7F8C]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
