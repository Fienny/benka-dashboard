import { Sidebar } from "@/components/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
