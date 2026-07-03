"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Code, 
  Briefcase, 
  Award, 
  Layers, 
  Route, 
  User, 
  Phone, 
  LogOut 
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Skills", href: "/admin/dashboard/skills", icon: <Code size={20} /> },
  { name: "Projects", href: "/admin/dashboard/projects", icon: <Briefcase size={20} /> },
  { name: "Certificates", href: "/admin/dashboard/certificates", icon: <Award size={20} /> },
  { name: "Services", href: "/admin/dashboard/services", icon: <Layers size={20} /> },
  { name: "Journey", href: "/admin/dashboard/journey", icon: <Route size={20} /> }, 
  { name: "About", href: "/admin/dashboard/about", icon: <User size={20} /> },
  { name: "Contact Info", href: "/admin/dashboard/contact", icon: <Phone size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-primary text-primary-content font-medium" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
