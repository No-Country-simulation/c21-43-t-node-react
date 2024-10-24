import type { Metadata } from "next";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'], });


export const metadata: Metadata = {
  title: "Ecommerce",
  description: "by c21-43-t-node-react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} flex flex-col min-h-screen`}>
        <Header/>
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
