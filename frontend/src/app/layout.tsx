import type { Metadata } from "next";
import { Footer } from "@/components/shared/Footer";
import Header from "@/components/Header";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


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
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster/>
      </body>
    </html>
  );
}
