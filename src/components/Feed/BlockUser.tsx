import { X } from 'lucide-react';
import React, { FC, FormEvent } from 'react';
import { SnackbarProvider } from "notistack";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}


const BlockUser: FC<BlockUserModalProps> = ({ isOpen, onClose, onSubmit }) => {

  if (!isOpen) return null;


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call parent onSubmit
    onSubmit();

    onClose();
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      {/* Modal Container */}
      <div className="relative bg-[#FFFFFF] dark:bg-[#1A1C20] shadow-2xl w-full max-w-[550px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[13px] md:text-[16px] text-dark dark:text-[#FFFFFF] font-semibold">Block User</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X className="text-xl font-bold" />
          </button>
        </div>

        <h2 className='text-center text-[10px] md:text-[13px] text-[#1E1E1E] dark:text-[#FFFFFF]'>Are you sure you want to block this user? Once blocked:</h2>

        {/* Body: Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <ul className='list-disc px-6'>
            {["They won’t be able to message you.", "They won’t see your posts or comment on your content.", "You won’t see their content across the app.", "You can unblock them later from your settings."].map((item) => {
                return <li key={item} className='text-[#1E1E1E] dark:text-[#FFFFFF] text-[10px] md:text-[13px]'>{item}</li>
            })}
            <span className='text-[#1E1E1E] dark:text-[#FFFFFF] text-[10px] md:text-[13px]'>This action does not report the user to moderators.</span>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={() => {
                // Reset state on cancel
                onClose();
              }}
              className="flex-1 text-[#FFFFFF] text-[13px] px-4 cursor-pointer py-2 bg-[#2A2D34] hover:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 text-[#FFFFFF] text-[13px] px-4 cursor-pointer py-2 bg-[#9A1B39] rounded"
            >
              Block
            </button>
          </div>
        </form>
      </div>
      <SnackbarProvider />
    </div>
  );
};

export default BlockUser;
