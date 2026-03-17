import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Psyche | ゲームの選択に、お前の人生が出る",
  description:
    "FPS・アクションゲームのプレイスタイルから、あなたの深層心理を哲学的に分析する。32タイプ診断。",
  openGraph: {
    title: "Gaming Psyche",
    description: "ゲームの選択に、お前の人生が出る",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="dawn-bg fixed inset-0 z-0" />
        <ParticleBackground />
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
