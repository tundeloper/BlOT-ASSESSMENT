// components/LandingCard.tsx
'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  children?: ReactNode;
}

export default function AuthCard({ children }: CardProps) {
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-sm px-6 p-[3rem]">
        <Image
          src="/svg/logo_gradient.svg"
          alt="Sportlaze Logo"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        {children}
      </div>
    // </div>
  );
}
