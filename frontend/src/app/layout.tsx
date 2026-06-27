import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerraLattice Mission Control",
  description: "Planetary Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-300">
        {children}
      </body>
    </html>
  );
}
