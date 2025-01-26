import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals";

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio auf Next.js",
  description: "geschrieben von Ubaid Basnukaev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={varelaRound.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
