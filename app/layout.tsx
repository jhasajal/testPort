import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrolling  from "./utils/smoothscroll"

const geistSans = localFont({
  src: "./fonts/AVGARDN_2.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/AVGARDD_2.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sajal Jha",
  description: "My Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./mainlogo.ico" type="image/x-icon" />
        <link rel="icon" href="./mainlogo.ico" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SmoothScrolling > {children}</SmoothScrolling>
       
      </body>
    </html>
  );
}
