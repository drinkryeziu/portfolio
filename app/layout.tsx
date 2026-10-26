import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drin Kryeziu — Designer & developer",
  description:
    "Graphic designer, UX designer and developer. I design brands and apps, then build them. Dev projects, logos, posters, book covers and watches.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Special+Elite&family=DotGothic16&family=Caveat:wght@500;600&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
