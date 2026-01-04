import { Bell, Radio, Shield, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-status-active rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">C3 COMMAND</h1>
            <p className="text-xs text-muted-foreground font-mono">CRISIS MANAGEMENT SYSTEM</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-sm font-mono">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-status-active" />
            <span className="text-muted-foreground">NETWORK</span>
            <Badge variant="active" className="text-[10px]">ONLINE</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-status-active" />
            <span className="text-muted-foreground">COMMS</span>
            <Badge variant="active" className="text-[10px]">ACTIVE</Badge>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-severity-critical text-[10px] rounded-full flex items-center justify-center font-bold blink-critical">
              3
            </span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">OP</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Operator</p>
              <p className="text-xs text-muted-foreground font-mono">SHIFT-A</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
