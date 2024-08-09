import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import DotPattern from "@/components/magicui/dot-pattern";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Linkly",
  description: "Created by NNeshz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-[#030303] font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>
          <Navbar />
          {children}
          <Toaster />
          <DotPattern
            className={cn(
              "-z-50 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            )}
          />
        </main>
      </body>
    </html>
  );
}
