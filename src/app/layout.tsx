import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { ThemeProvider } from "@/provider";
import { Navbar } from "@/components";

const manrope = Manrope({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sweet Notes - Capture Your Ideas, Organize Your Thoughts",
    template: "%s | Sweet Notes",
  },
  description:
    "A beautiful and simple way to take notes, organize your thoughts, and keep track of your ideas. Write, edit and keep track of your notes with ease.",
  generator: "Next.js",
  applicationName: "Sweet Note",
  referrer: "origin-when-cross-origin",
  keywords: ["Sweet Note", "Note Taking", "Productivity", "React", "Next.js"],
  authors: [{ name: "Balikis" }],
  creator: "Balikis",
  publisher: "Balikis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sweet Notes",
    description:
      "A beautiful and simple way to take notes, organize your thoughts, and keep track of your ideas. Write, edit, and access your notes",
    url: "https://sweet-notes.vercel.app",
    siteName: "Sweet Notes",
    images: [
      {
        url: "https://sweet-notes.vercel.app/assets/preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Sweet Notes Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Notes",
    description:
      "A beautiful and simple way to take notes, organize your thoughts, and keep track of your ideas.",
    creator: "@balikis_oyeleye", // optional
    images: ["https://sweet-notes.vercel.app/assets/preview.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
