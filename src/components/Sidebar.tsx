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
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  badge?: number;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: AlertTriangle, label: 'Incidents', badge: 4, path: '/incidents' },
  { icon: Users, label: 'Response Teams', path: '/teams' },
  { icon: Radio, label: 'Communications', path: '/comms' },
  { icon: Map, label: 'Situation Map', path: '/map' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Activity, label: 'Analytics', path: '/analytics' },
];

const bottomItems: NavItem[] = [
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
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
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs font-mono text-muted-foreground">SYSTEM TIME</p>
          <p className="text-lg font-mono font-bold text-primary">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            {currentTime.toLocaleDateString('en-US', { 
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
