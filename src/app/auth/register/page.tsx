import Signup from '@/components/Auth/SignupForm';
import BgWrapper from '@/components/Layout/BgWrapper'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login - SportLaze",
  description: "Sign up or register to access the application",
  openGraph: {
    title: "Logup - SportLaze",
    description: "Sign up or register to access the application",
    url: "https://yourdomain.com/auth",
    siteName: "SportLaze",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  }
};


export default function RegisterForm() {
  return (
    <BgWrapper> 
      <div className="flex flex-col h-full">
        <Signup />     
      </div>
    </BgWrapper>
  );
}
