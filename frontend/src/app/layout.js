import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ClientFooterWrapper from "../components/ClientFooterWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EL KAID",
  description: "The next evolution of financial intelligence.",
};

import AnnouncementBar from "../components/AnnouncementBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-12`}
        suppressHydrationWarning
      >
        <AnnouncementBar />
        {children}
        <ClientFooterWrapper />
      </body>
    </html>
  );
}
