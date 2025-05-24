import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verification - sportlaze",
  description: "Sign in or register to access the application",
  openGraph: {
    title: "Verification - sportlaze",
    description: "Sign in or register to access the application",
    url: "https://yourdomain.com/auth",
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
    <html lang="en">
    <ThemeProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb] transition-all duration-500 ease-in-out`}
      >
        {children}
      </body>
      </ThemeProvider>
    </html>
  );
}
