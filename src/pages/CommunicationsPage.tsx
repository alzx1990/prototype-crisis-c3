import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Radio, 
  Send, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  Phone,
  PhoneCall,
  MessageSquare,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Channel {
  id: string;
  name: string;
  frequency: string;
  status: 'active' | 'standby' | 'emergency';
  participants: number;
  lastActivity: string;
}

interface Message {
  id: string;
  channel: string;
  from: string;
  message: string;
  timestamp: string;
  priority: 'normal' | 'urgent' | 'emergency';
  isUser?: boolean;
}

const channels: Channel[] = [
  { id: 'CH-1', name: 'Command Net', frequency: '155.475 MHz', status: 'active', participants: 12, lastActivity: '10s ago' },
  { id: 'CH-2', name: 'SCDF Tactical', frequency: '154.280 MHz', status: 'active', participants: 8, lastActivity: '25s ago' },
  { id: 'CH-3', name: 'Medical', frequency: '155.340 MHz', status: 'standby', participants: 4, lastActivity: '2m ago' },
  { id: 'CH-4', name: 'SPF Dispatch', frequency: '460.025 MHz', status: 'active', participants: 6, lastActivity: '45s ago' },
  { id: 'CH-5', name: 'Emergency Broadcast', frequency: '156.800 MHz', status: 'emergency', participants: 24, lastActivity: '5s ago' },
];

const initialMessages: Message[] = [
  { id: '1', channel: 'CH-1', from: 'Command', message: 'All units, be advised: industrial fire at Jurong Island now classified CRITICAL. Additional resources en route.', timestamp: '14:32:15', priority: 'emergency' },
  { id: '2', channel: 'CH-2', from: 'SCDF Central', message: 'Command, SCDF Central on scene. Establishing perimeter. Requesting HAZMAT support.', timestamp: '14:31:42', priority: 'urgent' },
  { id: '3', channel: 'CH-1', from: 'Dispatch', message: 'HAZMAT Unit en route, ETA 8 minutes.', timestamp: '14:31:20', priority: 'normal' },
  { id: '4', channel: 'CH-4', from: 'SPF Tanglin', message: 'Traffic control established at Pioneer Road. Diverting civilian traffic.', timestamp: '14:30:55', priority: 'normal' },
  { id: '5', channel: 'CH-2', from: 'SCDF Central', message: 'Confirmed chemical storage facility. Unknown substances involved.', timestamp: '14:30:10', priority: 'urgent' },
  { id: '6', channel: 'CH-3', from: 'Medical Team', message: 'Medical team standing by at staging area. Ready for casualties.', timestamp: '14:29:30', priority: 'normal' },
  { id: '7', channel: 'CH-1', from: 'Command', message: 'All units maintain radio discipline. Priority traffic only on Command Net.', timestamp: '14:28:45', priority: 'normal' },
  { id: '8', channel: 'CH-5', from: 'EOC', message: 'EMERGENCY BROADCAST: Shelter in place order for Jurong Island workers. Avoid outdoor exposure.', timestamp: '14:27:00', priority: 'emergency' },
];

const statusColors: Record<Channel['status'], string> = {
  active: 'bg-status-online/20 text-status-online border-status-online/30',
  standby: 'bg-muted/50 text-muted-foreground border-border',
  emergency: 'bg-severity-critical/20 text-severity-critical border-severity-critical/30 animate-pulse',
};

const priorityColors: Record<Message['priority'], string> = {
  normal: 'border-l-muted-foreground',
  urgent: 'border-l-status-warning',
  emergency: 'border-l-severity-critical',
};

const autoResponses: Record<string, string[]> = {
  'CH-1': [
    'Command acknowledges. Continue to monitor.',
    'Roger that. Updating situation board.',
    'Copy. All units be advised of updated status.',
    'Acknowledged. Maintain current positions.',
  ],
  'CH-2': [
    'SCDF copies. Proceeding as instructed.',
    'Roger, SCDF team in position.',
    'Affirmative. Fire suppression ongoing.',
    'Copy that. Requesting additional resources.',
  ],
  'CH-3': [
    'Medical team standing by.',
    'Acknowledged. Preparing for casualties.',
    'Copy. Ambulances on standby.',
    'Roger. Medical supplies ready.',
  ],
  'CH-4': [
    'SPF confirms. Traffic control in effect.',
    'Roger that. Perimeter secure.',
    'Copy. Officers in position.',
    'Acknowledged. Area cleared of civilians.',
  ],
  'CH-5': [
    'Emergency broadcast acknowledged by all stations.',
    'All units confirm receipt of emergency message.',
    'EOC monitoring all channels.',
    'National emergency protocols activated.',
  ],
};

export default function CommunicationsPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>('CH-1');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredMessages = messages.filter(m => 
    selectedChannel === 'all' || m.channel === selectedChannel
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || selectedChannel === 'all') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      channel: selectedChannel,
      from: 'You (Command)',
      message: inputMessage,
      timestamp: getCurrentTime(),
      priority: 'normal',
      isUser: true,
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate response from the channel
    const channelResponses = autoResponses[selectedChannel] || autoResponses['CH-1'];
    const randomResponse = channelResponses[Math.floor(Math.random() * channelResponses.length)];
    
    const respondingUnits: Record<string, string[]> = {
      'CH-1': ['Dispatch', 'Command Post', 'EOC'],
      'CH-2': ['SCDF Central', 'SCDF HAZMAT', 'SCDF Rescue'],
      'CH-3': ['Medical Team Alpha', 'Ambulance 7', 'Medical Coordinator'],
      'CH-4': ['SPF Tanglin', 'SPF Traffic', 'SPF Command'],
      'CH-5': ['EOC', 'SCDF HQ', 'National Command'],
    };

    const units = respondingUnits[selectedChannel] || respondingUnits['CH-1'];
    const randomUnit = units[Math.floor(Math.random() * units.length)];

    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        channel: selectedChannel,
        from: randomUnit,
        message: randomResponse,
        timestamp: getCurrentTime(),
        priority: 'normal',
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 1000 + Math.random() * 2000);
  };

  const handleBroadcastAll = () => {
    if (!inputMessage.trim()) return;

    channels.forEach((channel, index) => {
      setTimeout(() => {
        const broadcastMsg: Message = {
          id: `${Date.now()}-${channel.id}`,
          channel: channel.id,
          from: 'Command (Broadcast)',
          message: inputMessage,
          timestamp: getCurrentTime(),
          priority: 'urgent',
          isUser: true,
        };
        setMessages(prev => [...prev, broadcastMsg]);
      }, index * 200);
    });

    setInputMessage('');
  };

  const handleEmergencyBroadcast = () => {
    const emergencyMsg: Message = {
      id: Date.now().toString(),
      channel: 'CH-5',
      from: 'EMERGENCY BROADCAST',
      message: 'This is an emergency broadcast from Command. All units acknowledge.',
      timestamp: getCurrentTime(),
      priority: 'emergency',
      isUser: true,
    };
    setMessages(prev => [...prev, emergencyMsg]);
    setSelectedChannel('CH-5');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Radio className="h-6 w-6 text-primary" />
                Communications Center
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Multi-channel radio communications and dispatch
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isMicOn ? "command" : "outline"} 
                size="icon"
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button 
                variant={isMuted ? "outline" : "command"} 
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button variant="critical" className="gap-2" onClick={handleEmergencyBroadcast}>
                <PhoneCall className="h-4 w-4" />
                Emergency Call
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Channels Panel */}
            <Card variant="command">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Radio Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedChannel('all')}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedChannel === 'all' 
                        ? 'bg-primary/20 border border-primary/30' 
                        : 'bg-secondary/30 hover:bg-secondary/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">All Channels</span>
                      <Badge variant="outline" className="text-xs">
                        {channels.reduce((acc, c) => acc + c.participants, 0)}
                      </Badge>
                    </div>
                  </button>
                  {channels.map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedChannel === channel.id 
                          ? 'bg-primary/20 border border-primary/30' 
                          : 'bg-secondary/30 hover:bg-secondary/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{channel.name}</span>
                        <Badge className={statusColors[channel.status]}>
                          {channel.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-mono">{channel.frequency}</span>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{channel.participants}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Messages Panel */}
            <Card variant="default" className="lg:col-span-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Communications Log
                  <Badge variant="outline" className="ml-auto">
                    {filteredMessages.length} messages
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-3 max-h-[400px] overflow-y-auto mb-4">
                  {filteredMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`p-3 rounded-lg border-l-4 ${priorityColors[msg.priority]} ${
                        msg.isUser ? 'bg-primary/10 ml-8' : 'bg-secondary/30 mr-8'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-mono">{msg.channel}</Badge>
                          <span className={`font-medium ${msg.isUser ? 'text-primary' : 'text-foreground'}`}>
                            {msg.from}
                          </span>
                          {msg.priority === 'emergency' && (
                            <AlertTriangle className="h-4 w-4 text-severity-critical animate-pulse" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className="font-mono">{msg.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90">{msg.message}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Input 
                    placeholder={selectedChannel === 'all' ? 'Select a channel to send messages...' : 'Type message...'} 
                    className="flex-1 bg-secondary/50 border-border"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={selectedChannel === 'all'}
                  />
                  <Button 
                    variant="command" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={selectedChannel === 'all' || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={handleBroadcastAll}
              disabled={!inputMessage.trim()}
            >
              <Radio className="h-6 w-6" />
              <span>Broadcast All</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Phone className="h-6 w-6" />
              <span>Conference Call</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span>Send Alert</span>
            </Button>
            <Button 
              variant="critical" 
              className="h-20 flex-col gap-2"
              onClick={handleEmergencyBroadcast}
            >
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Broadcast</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}