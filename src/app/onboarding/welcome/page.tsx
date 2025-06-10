import BgWrapper from '@/components/Layout/BgWrapper'
import AuthHeader from '@/components/Layout/AuthHeader'
import { Metadata } from 'next';
import React from 'react'
import Welcome from '@/components/Onboarding/Welcome';

export const metadata: Metadata = {
    title: "Welcome - SportLaze",
    description: "Sign in or register to access the application",
    openGraph: {
        title: "Welcome - SportLaze",
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

export default function WelcomePage() {
    return (
        <BgWrapper>
            <AuthHeader showProgress={true} progress={95} />
            <div className="flex flex-col items-center justify-center h-screen w-[100%]">
                <Welcome />
            </div>
        </BgWrapper>
    )
}
