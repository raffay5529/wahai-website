import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wah AI | Undetectable AI Notetaker & Meeting Assistant",
  description:
    "Wah is an undetectable AI notetaker and meeting assistant. It never joins your calls, stays invisible on screen share, and gives you answers in real time.",
  icons: {
    icon: "/wahlogo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}