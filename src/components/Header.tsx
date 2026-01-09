import { useState } from 'react';
import { Bell, Radio, Shield, Wifi, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockIncidents } from '@/data/mockIncidents';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Generate notifications from recent incidents
  const notifications = [
    {
      id: '1',
      type: 'critical',
      title: 'Critical Incident Reported',
      message: 'MRT Tunnel Flooding - Bugis MRT Station',
      time: '10 mins ago',
    },
    {
      id: '2',
      type: 'escalation',
      title: 'Incident Escalated',
      message: 'Cyber Attack on Banking System escalated to high priority',
      time: '25 mins ago',
    },
    {
      id: '3',
      type: 'update',
      title: 'Status Update',
      message: 'Chemical Spill containment 60% complete',
      time: '1 hour ago',
    },
  ];

  const criticalCount = mockIncidents.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-4 border-l-severity-critical bg-severity-critical/10';
      case 'escalation':
        return 'border-l-4 border-l-severity-high bg-severity-high/10';
      default:
        return 'border-l-4 border-l-primary bg-primary/10';
    }
  };

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
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-severity-critical text-[10px] rounded-full flex items-center justify-center font-bold blink-critical">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="outline" className="text-xs">
                  {criticalCount} Critical
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-72">
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${getNotificationStyle(notification.type)}`}
                  >
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.message}</div>
                    <div className="text-xs text-muted-foreground/70">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'OP'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name || 'Operator'}</p>
                  <p className="text-xs text-muted-foreground font-mono">{user?.role?.toUpperCase() || 'OPERATOR'}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
