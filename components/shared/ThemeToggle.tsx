"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[104px] h-9" />;
  }

  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border">
      <div className="tooltip tooltip-bottom" data-tip="Light">
        <button
          onClick={() => setTheme("light")}
          className={`p-1.5 rounded-md transition-all duration-200 ${theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Dark">
        <button
          onClick={() => setTheme("dark")}
          className={`p-1.5 rounded-md transition-all duration-200 ${theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
