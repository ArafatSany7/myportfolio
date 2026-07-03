import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6 z-10 sticky top-0">
        <Link href="/admin/dashboard" className="text-xl font-bold text-primary">
          Admin Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            {session.user?.email}
          </div>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-xs">AD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
