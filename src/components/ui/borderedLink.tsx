'use client';

import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type CustomLinkProps = LinkProps & ComponentPropsWithoutRef<'a'>;

export default function BordredLink({ className, children, ...props }: CustomLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        `inline-block px-4 py-3 rounded-md font-medium text-[#111827] dark:text-[white]
         border-2 border-gray-200 dark:border-gray-700
         text-sm
         transition-all duration-300 ease-in-out
         bg-clip-text
         hover:text-transparent
         hover:border-transparent
         relative
         before:absolute before:-inset-1 before:rounded-md before:bg-gradient-to-r before:from-[#463a85] before:to-[#9a1b39] before:bg-[length:200%_100%] before:bg-left before:transition-all before:duration-300 hover:before:bg-right before:z-[-1]
         `,
        className
      )}
    >
      <span
        className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>
    </Link>
  );
}

