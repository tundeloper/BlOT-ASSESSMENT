'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function GradientButton({
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        `py-3 rounded-md font-medium text-white
         bg-[#2D439B] text-sm shadow-md font-switzer
         hover:bg-gradient-to-b hover:from-[#2D439B] hover:to-[#9A1B39]
         transition-all duration-300 ease-in-out`,
        className
      )}
    >
      {children}
    </button>
  );
}
