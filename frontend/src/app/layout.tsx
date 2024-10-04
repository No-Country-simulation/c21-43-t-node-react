import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
