import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Enjoy your news here ",
  description: "Experience News Like Never Before",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
        <body>
          {/* <ThemeToggleButton /> */}
          {children}
        </body>
    </html>
  );
}
