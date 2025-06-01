"use client"
import Verify from '@/components/Auth/Verify';
import BgWrapper from '@/components/Layout/BgWrapper'
import React from 'react'


export default function RegisterForm() {
  return (
    <BgWrapper> 
      <div className="flex flex-col items-center justify-center h-full">
        <Verify />     
      </div>
    </BgWrapper>
  );
}
