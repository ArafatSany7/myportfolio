import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arafat Sany",
  description: "Portfolio of Arafat Sany, a Full Stack Developer specializing in React, Next.js, and modern web applications.",
  keywords: ["Arafat Sany", "Full Stack Developer", "Web Developer", "React", "Next.js", "Portfolio"],
  openGraph: {
    title: "Arafat Sany | Full Stack Developer",
    description: "Portfolio of Arafat Sany, a Full Stack Developer specializing in React, Next.js, and modern web applications.",
    type: "website",
    url: "",
    siteName: "Arafat Sany Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arafat Sany | Full Stack Developer",
    description: "Portfolio of Arafat Sany, a Full Stack Developer specializing in React, Next.js, and modern web applications.",
  }
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
