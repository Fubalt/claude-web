import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bareface - Leading Model, Talent & Entertainment Agency in Dubai, UAE",
  description:
    "Based in Dubai since 2001, Bareface connects brands with models, talent, actors, stylists, influencers & performers across UAE, KSA, Qatar, Bahrain, Oman, Kuwait & MENA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#181a1b] text-[#e8e6e3]">
        {children}
      </body>
    </html>
  );
}
