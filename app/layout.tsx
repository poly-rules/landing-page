import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poly — Business logic your team can build and own",
  description:
    "A visual workflow editor that lets business teams build, validate, and publish their own rules — without writing code or waiting on engineering.",
  openGraph: {
    title: "Poly — Business logic your team can build and own",
    description:
      "A visual workflow editor that lets business teams build, validate, and publish their own rules — without writing code or waiting on engineering.",
    images: ["/poly-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0D0F14] text-gray-100 font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
