import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import TargetCursor from "@/components/react-bits/TargetCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdulrahman Nahhas | Portfolio",
  description: "Abdulrahman Nahhas | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased relative`}>
        {/* <TargetCursor spinDuration={2} hideDefaultCursor={true} /> */}

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
