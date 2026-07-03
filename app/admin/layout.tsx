import { AuthProvider } from "@/components/providers/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-muted">
        {children}
      </div>
    </AuthProvider>
  );
}
