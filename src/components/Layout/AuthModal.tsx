'use client'
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
    const router = useRouter()
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" PaperProps={{
            sx: {
                borderRadius: 1,
                p: 0,
                width: 500,
                boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            }
        }}>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[16px] font-medium text-[#3A3D46]">Sign in to Continue</span>
                    <button onClick={onClose} className="w-6 h-6 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100 transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#3A3D46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#3A3D46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="text-[13px] text-[#3A3D46] text-center mb-2">
                    You need to be signed in to like, comment, or interact with posts.<br />
                    Join the conversation, follow your favorite teams, and unlock the full Sportlaze experience.
                </div>

                <div className="flex gap-4 w-full">
                    <button
                        className="flex-1 py-2 rounded-[4px] bg-[#7A7F8C] text-white text-[13px] font-normal shadow-sm hover:bg-[#6A6F7C] transition cursor-pointer"
                        onClick={() => router.push('/auth/register')}
                    >
                        Create Account
                    </button>
                    <button
                        className="flex-1 py-2 rounded-[4px] bg-[#2D439B] text-white text-[13px] font-normal shadow-sm hover:bg-[#22337a] transition cursor-pointer"
                        onClick={() => router.push('/auth/login')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default AuthModal;