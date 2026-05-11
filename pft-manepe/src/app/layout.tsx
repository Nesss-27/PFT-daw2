import type { Metadata } from "next";
// Elimina la importación directa de SessionProvider de next-auth
import { Providers } from "@/components/ui/providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const starFont = localFont({
  src: "../../public/fonts/Syndra-SemiBold.otf",
  variable: "--font-starjedi",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manepe",
  description: "Backtest & Screener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${starFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Usa el componente Providers aquí */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}