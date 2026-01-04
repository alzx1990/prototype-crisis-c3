import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  {
    label: 'Total Incidents',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: AlertTriangle,
    period: 'vs last month',
  },
  {
    label: 'Resolved',
    value: '142',
    change: '+8%',
    trend: 'up',
    icon: CheckCircle,
    period: 'vs last month',
  },
  {
    label: 'Avg Response Time',
    value: '4.2 min',
    change: '-15%',
    trend: 'down',
    icon: Clock,
    period: 'vs last month',
  },
  {
    label: 'Active Teams',
    value: '8',
    change: '0%',
    trend: 'neutral',
    icon: Users,
    period: 'this period',
  },
];

export function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' && (
                  <TrendingUp className="h-3 w-3 text-severity-low" />
                )}
                {stat.trend === 'down' && (
                  <TrendingDown className="h-3 w-3 text-severity-low" />
                )}
                <span className={`text-xs ${stat.trend === 'neutral' ? 'text-muted-foreground' : 'text-severity-low'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">{stat.period}</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
