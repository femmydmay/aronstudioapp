import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
import ClientAuthGuard from "@/components/ClientAuthGuard";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aron Studio",
  description: "Aron Studio App - Effecient studio booking web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} ${geistMono.className} font-sans antialiased bg-background text-foreground`}
      >
        <ClientAuthGuard>
          {children}
        </ClientAuthGuard>

        {/* <Analytics /> */}
      </body>
    </html>
  );
}