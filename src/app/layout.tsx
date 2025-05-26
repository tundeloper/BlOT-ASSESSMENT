import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Sportlaze",
  description: "Experience Sports Like Never Before",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <ThemeProvider>
        <body>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
