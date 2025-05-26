
import LoginForm from '@/components/Auth/LoginForm'
import BgWrapper from '@/components/Layout/BgWrapper'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login - SportLaze",
  description: "Sign in or register to access the application",
  openGraph: {
    title: "Login - SportLaze",
    description: "Sign in or register to access the application",
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

export default function Login() {
  return (
    <BgWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <LoginForm />
      </div>
    </BgWrapper>
  )
}
