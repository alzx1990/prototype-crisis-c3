import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', critical: 4, high: 8, medium: 12, low: 6 },
  { name: 'Feb', critical: 3, high: 10, medium: 15, low: 8 },
  { name: 'Mar', critical: 5, high: 7, medium: 10, low: 5 },
  { name: 'Apr', critical: 2, high: 12, medium: 18, low: 10 },
  { name: 'May', critical: 6, high: 9, medium: 14, low: 7 },
  { name: 'Jun', critical: 4, high: 11, medium: 16, low: 9 },
  { name: 'Jul', critical: 3, high: 8, medium: 13, low: 6 },
];

export function IncidentTrendsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Incident Trends
        </CardTitle>
        <p className="text-xs text-muted-foreground">Monthly incident distribution by severity</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 72% 51%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0 72% 51%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25 95% 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25 95% 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(48 96% 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(48 96% 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(215 20% 45%)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(215 20% 45%)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 11%)',
                  border: '1px solid hsl(215 20% 20%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(210 40% 98%)' }}
              />
              <Area
                type="monotone"
                dataKey="critical"
                stackId="1"
                stroke="hsl(0 72% 51%)"
                fill="url(#colorCritical)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="high"
                stackId="1"
                stroke="hsl(25 95% 53%)"
                fill="url(#colorHigh)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="medium"
                stackId="1"
                stroke="hsl(48 96% 53%)"
                fill="url(#colorMedium)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="low"
                stackId="1"
                stroke="hsl(142 76% 36%)"
                fill="url(#colorLow)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-severity-critical" />
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-severity-high" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-severity-medium" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-severity-low" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
