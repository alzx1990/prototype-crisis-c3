import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  Radio, 
  Map, 
  FileText, 
  Settings,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: AlertTriangle, label: 'Incidents', badge: 4 },
  { icon: Users, label: 'Response Teams' },
  { icon: Radio, label: 'Communications' },
  { icon: Map, label: 'Situation Map' },
  { icon: FileText, label: 'Reports' },
  { icon: Activity, label: 'Analytics' },
];

const bottomItems: NavItem[] = [
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto h-5 min-w-5 px-1.5 rounded-full bg-severity-critical text-[10px] font-bold flex items-center justify-center text-white">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs font-mono text-muted-foreground">SYSTEM TIME</p>
          <p className="text-lg font-mono font-bold text-primary">
            {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            }).toUpperCase()}
          </p>
        </div>
      </div>
    </aside>
  );
}
