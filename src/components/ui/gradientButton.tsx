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
        `inline-block px-4 py-3 rounded-md font-medium text-white
         bg-primary text-sm shadow-md
         hover:bg-gradient-to-b hover:from-[#463a85] hover:to-[#9a1b39]
         transition-all duration-300 ease-in-out`,
        className
      )}
    >
      {children}
    </button>
  );
}
