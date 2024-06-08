import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "01-Graph",
  description: "Created by akhaled01",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
