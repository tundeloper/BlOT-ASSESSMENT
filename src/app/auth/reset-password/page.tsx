import ResetPasswordForm from '@/components/Auth/ResetPasswordForm'
import BgWrapper from '@/components/Layout/BgWrapper'
import AuthHeader from '@/components/Layout/AuthHeader'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Reset Password - SportLaze",
    description: "Sign in or register to access the application",
    openGraph: {
        title: "Reset Password - SportLaze",
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

export default function ResetPassword() {
    return (
        <BgWrapper>
            <AuthHeader />
            <div className="flex flex-col items-center justify-center h-full">
                <ResetPasswordForm />
            </div>
        </BgWrapper>
    )
}
