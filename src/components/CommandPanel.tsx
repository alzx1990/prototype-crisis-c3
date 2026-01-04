import { Send, Mic, PhoneCall, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const recentComms = [
  { time: '10:42', from: 'Alpha-1', message: 'Containment team in position' },
  { time: '10:38', from: 'Control', message: 'Medical support en route to Sector A' },
  { time: '10:35', from: 'Bravo-3', message: 'Perimeter secured, awaiting orders' },
  { time: '10:31', from: 'HAZMAT', message: 'Chemical analysis complete - Class 3' },
];

export function CommandPanel() {
  return (
    <Card variant="command" className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono uppercase tracking-wider flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          Command Channel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3 mb-4 overflow-auto">
          {recentComms.map((comm, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg bg-secondary/50 border border-border animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {comm.time}
                </span>
                <span className="text-xs font-semibold text-primary">
                  {comm.from}
                </span>
              </div>
              <p className="text-sm text-foreground">{comm.message}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex gap-2 mb-3">
            <Button variant="command" size="sm" className="flex-1">
              <PhoneCall className="h-4 w-4 mr-2" />
              Dispatch
            </Button>
            <Button variant="command" size="sm" className="flex-1">
              <Mic className="h-4 w-4 mr-2" />
              Broadcast
            </Button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type command or message..."
              className="flex-1 h-10 px-4 rounded-lg bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono"
            />
            <Button variant="default" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
