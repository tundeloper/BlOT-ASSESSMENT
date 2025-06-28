import { X } from 'lucide-react';
import React, { useState, FC, FormEvent } from 'react';

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details?: string) => void;
}

const reasons = [
  { value: 'harassment', label: 'Harassment or Bullying' },
  { value: 'spam', label: 'Spam or Scams' },
  { value: 'hate_speech', label: 'Hate Speech or Offensive Content' },
  { value: 'nudity', label: 'Sexual or Inappropriate Content' },
  { value: 'false_information', label: 'False Information' },
  { value: 'intellectual_property', label: 'Impersonation or Fake Account' },
  { value: 'other', label: 'Other (Please specify below)' },
];

const ReportUserModal: FC<ReportUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [otherDetails, setOtherDetails] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
    // Clear otherDetails if reason changes away from 'other'
    if (e.target.value !== 'other') {
      setOtherDetails('');
    }
    setError('');
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOtherDetails(e.target.value);
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedReason) {
      setError('Please select a reason before submitting.');
      return;
    }
    if (selectedReason === 'other' && otherDetails.trim() === '') {
      setError('Please provide reason.');
      return;
    }
    // Call parent onSubmit
    onSubmit(selectedReason, selectedReason === 'other' ? otherDetails.trim() : undefined);
    // Reset state
    setSelectedReason('');
    setOtherDetails('');
    setError('');
    onClose();
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      {/* Modal Container */}
      <div className="relative bg-[#FFFFFF] dark:bg-[#1A1C20] shadow-2xl w-full max-w-[550px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[13px] md:text-[16px] text-dark dark:text-[#FFFFFF] font-semibold">Report User</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X className="text-xl font-bold" />
          </button>
        </div>

        {/* Body: Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <fieldset>
            <legend className="sr-only">Select reason for reporting</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <label
                  key={reason.value}
                  className="flex items-center text-[13px] space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={handleReasonChange}
                    className="form-radio h-4 w-4 text-[#2D439B]"
                  />
                  <span className="text-[#1E1E1E] dark:text-[#FFFFFF]">{reason.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Other details input if 'other' selected */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add more details"
              value={otherDetails}
              onChange={handleDetailsChange}
              disabled={selectedReason !== 'other'}
              className={`w-full border text-[#7A7F8C] h-[27px] text-[13px] font-switzer rounded px-2 py-2 focus:outline-none focus:ring focus:border-[#2D439B] placeholder-gray-400"
                ${selectedReason !== 'other' ? 'bg-gray-100 cursor-not-allowed' : 'bg-[#FFFFFF]'}`}
            />
          </div>

          {error && <p className="mt-2 text-[13px] text-[red]">{error}</p>}

          {/* Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={() => {
                // Reset state on cancel
                setSelectedReason('');
                setOtherDetails('');
                setError('');
                onClose();
              }}
              className="flex-1 text-[#FFFFFF] text-[13px] px-4 cursor-pointer py-2 bg-[#2A2D34] hover:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 text-[#FFFFFF] text-[13px] px-4 cursor-pointer py-2 bg-[#2D439B] hover:bg-blue-700 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUserModal;
