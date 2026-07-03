import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-border gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
