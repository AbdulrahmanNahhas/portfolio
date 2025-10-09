import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

// English fonts
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

const plein = localFont({
  src: [
    {
      path: "./fonts/plein/fonts/Plein-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/plein/fonts/Plein-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/plein/fonts/Plein-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/plein/fonts/Plein-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/plein/fonts/Plein-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/plein/fonts/Plein-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/plein/fonts/Plein-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/plein/fonts/Plein-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/plein/fonts/Plein-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/plein/fonts/Plein-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-plein",
  display: "swap",
});

// Arabic fonts
const lyonArabic = localFont({
  src: [
    {
      path: "./fonts/Lyon_Arabic_Display/Lyon_Arabic_Display_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Lyon_Arabic_Display/Lyon_Arabic_Display_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lyon_Arabic_Display/Lyon_Arabic_Display_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Lyon_Arabic_Display/Lyon_Arabic_Display_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lyon_Arabic_Display/Lyon_Arabic_Display_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-lyon-arabic",
  display: "swap",
});

const rubik = localFont({
  src: [
    {
      path: "./fonts/Rubik-Variables.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdulrahman Nahhas | Portfolio",
  description: "Abdulrahman Nahhas | Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Font classes based on locale
  const fontClasses = isRTL
    ? `${rubik.variable} ${lyonArabic.variable}`
    : `${switzer.variable} ${plein.variable}`;

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={`${fontClasses} antialiased relative`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
