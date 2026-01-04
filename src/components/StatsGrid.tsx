import { AlertTriangle, Activity, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { systemStats } from '@/data/mockIncidents';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'critical' | 'warning';
}

function StatCard({ icon: Icon, label, value, trend, variant = 'default' }: StatCardProps) {
  return (
    <Card 
      variant={variant === 'critical' ? 'critical' : 'default'}
      className="relative overflow-hidden"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className={`text-3xl font-bold font-mono ${
              variant === 'critical' ? 'text-severity-critical' : 'text-foreground'
            }`}>
              {value}
            </p>
            {trend && (
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${
            variant === 'critical' 
              ? 'bg-severity-critical/20 text-severity-critical' 
              : 'bg-primary/10 text-primary'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        
        {variant === 'critical' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-severity-critical/50">
            <div className="h-full w-1/3 bg-severity-critical animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        icon={AlertTriangle}
        label="Active Incidents"
        value={systemStats.activeIncidents}
        trend="+2 since last shift"
        variant="warning"
      />
      <StatCard
        icon={Activity}
        label="Critical Alerts"
        value={systemStats.criticalAlerts}
        variant="critical"
      />
      <StatCard
        icon={Users}
        label="Responding Units"
        value={systemStats.respondingUnits}
        trend="8 available"
      />
      <StatCard
        icon={Clock}
        label="Avg Response Time"
        value={systemStats.avgResponseTime}
        trend="Target: 5 min"
      />
    </div>
  );
}
