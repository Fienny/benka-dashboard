import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

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
      <body className="min-h-full flex font-sans">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
