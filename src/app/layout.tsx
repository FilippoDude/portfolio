import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Raleway} from "next/font/google";
import "./globals.css";
import NavigationButton from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const raleywaySans = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"]
})

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filippo's Portfolio",
  description: "A website containing most of the info about me!",
  openGraph: {
    title: "Filippo's Portfolio",
    description: "A website containing most of the info about me!",
    url: "https://filippodude.cc/",
    siteName: "Filippo's Portfolio",
    images: [
      {
        url: "https://filippodude.cc/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Filippo's Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${manropeSans.variable} ${raleywaySans.variable} antialiased`}>
        <NavigationButton/>
        {children}
      </body>
    </html>
  );
}
