import type { Metadata } from "next";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Tierra y Alma",
  description: "by c21-43-t-node-react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
