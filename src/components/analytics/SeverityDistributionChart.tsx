import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Critical', value: 12, color: 'hsl(0 72% 51%)' },
  { name: 'High', value: 28, color: 'hsl(25 95% 53%)' },
  { name: 'Medium', value: 45, color: 'hsl(48 96% 53%)' },
  { name: 'Low', value: 71, color: 'hsl(142 76% 36%)' },
];

export function SeverityDistributionChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Severity Distribution
        </CardTitle>
        <p className="text-xs text-muted-foreground">Current period incident breakdown</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 11%)',
                  border: '1px solid hsl(215 20% 20%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(210 40% 98%)' }}
                formatter={(value: number) => [`${value} incidents`, '']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(215 20% 65%)', fontSize: '12px' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
