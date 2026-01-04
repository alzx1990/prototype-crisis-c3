import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Alpha Response', incidents: 42, resolved: 40, efficiency: 95 },
  { name: 'Cyber Response', incidents: 38, resolved: 35, efficiency: 92 },
  { name: 'HAZMAT Unit', incidents: 28, resolved: 27, efficiency: 96 },
  { name: 'Tech Response', incidents: 25, resolved: 22, efficiency: 88 },
  { name: 'Facility Ops', incidents: 23, resolved: 21, efficiency: 91 },
];

const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 95) return 'hsl(142 76% 36%)';
  if (efficiency >= 90) return 'hsl(48 96% 53%)';
  return 'hsl(25 95% 53%)';
};

export function TeamPerformanceChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Team Performance
        </CardTitle>
        <p className="text-xs text-muted-foreground">Incidents handled and resolution efficiency</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" horizontal={false} />
              <XAxis
                type="number"
                stroke="hsl(215 20% 45%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(215 20% 45%)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 11%)',
                  border: '1px solid hsl(215 20% 20%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(210 40% 98%)' }}
                formatter={(value: number, name: string) => {
                  if (name === 'incidents') return [value, 'Total Incidents'];
                  if (name === 'resolved') return [value, 'Resolved'];
                  return [value, name];
                }}
              />
              <Bar dataKey="incidents" fill="hsl(215 20% 30%)" radius={[0, 4, 4, 0]} maxBarSize={20} />
              <Bar dataKey="resolved" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getEfficiencyColor(entry.efficiency)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {data.slice(0, 3).map((team) => (
            <div key={team.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
              <span className="text-xs font-medium text-foreground">{team.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {team.resolved}/{team.incidents} resolved
                </span>
                <span 
                  className="text-xs font-bold"
                  style={{ color: getEfficiencyColor(team.efficiency) }}
                >
                  {team.efficiency}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
