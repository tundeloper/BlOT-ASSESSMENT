// components/LandingCard.tsx
'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  children?: ReactNode;
}

export default function AuthCard({ children }: CardProps) {
  const {theme} = useTheme()
  return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-lg p-[3rem]">
       <Image
          src={`${theme === 'light' ? '/svg/logo_gradient.svg' : '/svg/logo_white.svg'}`}
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
