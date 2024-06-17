import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/logic/context/redux";
import { ThemeProvider } from "@/components/theme-provider";

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
    <Providers>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
