// components/CustomLink.tsx
'use client';

import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type CustomLinkProps = LinkProps & ComponentPropsWithoutRef<'a'>;

export default function CustomLink({ className, children, ...props }: CustomLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        `inline-block px-4 py-2 rounded-md font-medium text-white 
         bg-primary text-sm shadow-md 
         hover:bg-gradient-to-b hover:from-[#463a85] hover:to-[#9a1b39] 
         transition-all duration-300 ease-in-out`,
        className
      )}
    >
      {children}
    </Link>
  );
}


