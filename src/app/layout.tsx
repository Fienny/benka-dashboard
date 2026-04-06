import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benka's Workbench — Engineering Dashboard",
  description: "Project management and file workbench for engineering teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
