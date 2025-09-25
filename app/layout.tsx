import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer/Switzer-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-ExtraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/Switzer/Switzer-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Switzer/Switzer-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const gulax = localFont({
  src: [
    {
      path: "./fonts/Gulax/Gulax-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gulax",
  display: "swap",
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
      <body
        className={`${switzer.variable} ${gulax.variable} antialiased relative`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
