import { useState, useRef, useEffect } from 'react';
import { Send, Mic, PhoneCall, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommMessage {
  time: string;
  from: string;
  message: string;
  isUser?: boolean;
}

const initialComms: CommMessage[] = [
  { time: '10:42', from: 'SCDF Central', message: 'Containment team in position' },
  { time: '10:38', from: 'Command', message: 'Medical support en route to Sector A' },
  { time: '10:35', from: 'SPF Tanglin', message: 'Perimeter secured, awaiting orders' },
  { time: '10:31', from: 'HAZMAT Unit', message: 'Chemical analysis complete - Class 3' },
];

const autoResponses = [
  'Roger that, Command. Acknowledged.',
  'Copy. Team in position.',
  'Understood. Proceeding as directed.',
  'Affirmative. Standing by.',
  'Message received. Will update status.',
];

export function CommandPanel() {
  const [messages, setMessages] = useState<CommMessage[]>(initialComms);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: CommMessage = {
      time: getCurrentTime(),
      from: 'You',
      message: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate response
    const responders = ['SCDF Central', 'SPF Tanglin', 'HAZMAT Unit', 'Command Post', 'Medical Team'];
    const randomResponder = responders[Math.floor(Math.random() * responders.length)];
    const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];

    setTimeout(() => {
      const response: CommMessage = {
        time: getCurrentTime(),
        from: randomResponder,
        message: randomResponse,
      };
      setMessages(prev => [...prev, response]);
    }, 800 + Math.random() * 1200);
  };

  return (
    <Card variant="command" className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono uppercase tracking-wider flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          Command Channel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3 mb-4 overflow-auto max-h-[300px]">
          {messages.map((comm, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border border-border animate-slide-in-right ${
                comm.isUser ? 'bg-primary/10 ml-4' : 'bg-secondary/50 mr-4'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {comm.time}
                </span>
                <span className={`text-xs font-semibold ${comm.isUser ? 'text-primary' : 'text-primary'}`}>
                  {comm.from}
                </span>
              </div>
              <p className="text-sm text-foreground">{comm.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
            <Input
              type="text"
              placeholder="Type command or message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-10 font-mono text-sm"
            />
            <Button variant="default" size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
