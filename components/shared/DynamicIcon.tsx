import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  if (!name) return <FaIcons.FaCode className={className} />;

  
  if (name.startsWith("Fa")) {
    const Icon = (FaIcons as any)[name];
    if (Icon) return <Icon className={className} />;
  }

  
  if (name.startsWith("Si")) {
    const Icon = (SiIcons as any)[name];
    if (Icon) return <Icon className={className} />;
  }

  
  return <FaIcons.FaCode className={className} />;
}
