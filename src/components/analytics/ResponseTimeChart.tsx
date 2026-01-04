import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { name: 'Mon', time: 3.2, target: 5 },
  { name: 'Tue', time: 4.8, target: 5 },
  { name: 'Wed', time: 3.9, target: 5 },
  { name: 'Thu', time: 5.2, target: 5 },
  { name: 'Fri', time: 4.1, target: 5 },
  { name: 'Sat', time: 2.8, target: 5 },
  { name: 'Sun', time: 3.5, target: 5 },
];

export function ResponseTimeChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Response Time
        </CardTitle>
        <p className="text-xs text-muted-foreground">Average response time in minutes (target: 5 min)</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" vertical={false} />
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
                tickFormatter={(value) => `${value}m`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 11%)',
                  border: '1px solid hsl(215 20% 20%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(210 40% 98%)' }}
                formatter={(value: number) => [`${value} min`, 'Response Time']}
              />
              <ReferenceLine
                y={5}
                stroke="hsl(0 72% 51%)"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              <Bar
                dataKey="time"
                fill="hsl(217 91% 60%)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 p-3 rounded-lg bg-secondary/30">
          <div>
            <p className="text-xs text-muted-foreground">Weekly Average</p>
            <p className="text-lg font-bold text-foreground">3.9 min</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-lg font-bold text-severity-low">5.0 min</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-lg font-bold text-severity-low">On Track</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
