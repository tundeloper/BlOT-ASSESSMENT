import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Onboarding",
    description: "Sign in or register to access the application",
    openGraph: {
        title: "Onboarding",
        description: "Sign in or register to access the application",
        url: "https://yourdomain.com/onboarding",
        siteName: "spotlaze",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <main>{children}</main>
        </div>
    );
}
