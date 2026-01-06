import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Radio,
  Plus
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'deployed' | 'off-duty';
  contact: string;
}

interface ResponseTeam {
  id: string;
  name: string;
  type: 'fire' | 'medical' | 'police' | 'hazmat' | 'search-rescue';
  status: 'available' | 'deployed' | 'standby';
  location: string;
  members: TeamMember[];
  currentAssignment?: string;
  responseTime: string;
}

const mockTeams: ResponseTeam[] = [
  {
    id: 'TEAM-001',
    name: 'Alpha Fire Unit',
    type: 'fire',
    status: 'deployed',
    location: 'Grid Reference: 34.0522, -118.2437',
    currentAssignment: 'INC-001 - Industrial Fire',
    responseTime: '4 min',
    members: [
      { id: 'm1', name: 'Capt. John Torres', role: 'Team Lead', status: 'deployed', contact: 'CH-1' },
      { id: 'm2', name: 'Lt. Sarah Chen', role: 'Engineer', status: 'deployed', contact: 'CH-1' },
      { id: 'm3', name: 'FF Mike Johnson', role: 'Firefighter', status: 'deployed', contact: 'CH-1' },
      { id: 'm4', name: 'FF Lisa Park', role: 'Firefighter', status: 'deployed', contact: 'CH-1' },
    ]
  },
  {
    id: 'TEAM-002',
    name: 'Bravo Medical Unit',
    type: 'medical',
    status: 'available',
    location: 'Station 12 - Central',
    responseTime: '6 min',
    members: [
      { id: 'm5', name: 'Dr. Emily Watson', role: 'Medical Officer', status: 'available', contact: 'CH-2' },
      { id: 'm6', name: 'Para. James Lee', role: 'Paramedic', status: 'available', contact: 'CH-2' },
      { id: 'm7', name: 'EMT Alex Rivera', role: 'EMT', status: 'available', contact: 'CH-2' },
    ]
  },
  {
    id: 'TEAM-003',
    name: 'Charlie HAZMAT',
    type: 'hazmat',
    status: 'standby',
    location: 'Station 5 - Industrial',
    responseTime: '8 min',
    members: [
      { id: 'm8', name: 'Sgt. Robert Kim', role: 'HAZMAT Lead', status: 'available', contact: 'CH-3' },
      { id: 'm9', name: 'Spec. Anna Moore', role: 'Specialist', status: 'available', contact: 'CH-3' },
      { id: 'm10', name: 'Tech. David Brown', role: 'Technician', status: 'off-duty', contact: 'CH-3' },
    ]
  },
  {
    id: 'TEAM-004',
    name: 'Delta Police Unit',
    type: 'police',
    status: 'deployed',
    location: 'Grid Reference: 34.0195, -118.4912',
    currentAssignment: 'INC-003 - Traffic Collision',
    responseTime: '3 min',
    members: [
      { id: 'm11', name: 'Sgt. Maria Garcia', role: 'Sergeant', status: 'deployed', contact: 'CH-4' },
      { id: 'm12', name: 'Off. Chris Taylor', role: 'Officer', status: 'deployed', contact: 'CH-4' },
    ]
  },
  {
    id: 'TEAM-005',
    name: 'Echo Search & Rescue',
    type: 'search-rescue',
    status: 'available',
    location: 'Station 8 - Mountain',
    responseTime: '12 min',
    members: [
      { id: 'm13', name: 'Lead. Tom Wilson', role: 'SAR Lead', status: 'available', contact: 'CH-5' },
      { id: 'm14', name: 'Spec. Kate Adams', role: 'K9 Handler', status: 'available', contact: 'CH-5' },
      { id: 'm15', name: 'Tech. Ryan Scott', role: 'Technical Rescue', status: 'available', contact: 'CH-5' },
      { id: 'm16', name: 'Med. Nina Patel', role: 'Field Medic', status: 'off-duty', contact: 'CH-5' },
    ]
  },
];

const typeColors: Record<ResponseTeam['type'], string> = {
  fire: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medical: 'bg-green-500/20 text-green-400 border-green-500/30',
  police: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  hazmat: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'search-rescue': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const statusColors: Record<ResponseTeam['status'], string> = {
  available: 'bg-status-online/20 text-status-online border-status-online/30',
  deployed: 'bg-severity-high/20 text-severity-high border-severity-high/30',
  standby: 'bg-status-warning/20 text-status-warning border-status-warning/30',
};

export default function ResponseTeamsPage() {
  const deployedCount = mockTeams.filter(t => t.status === 'deployed').length;
  const availableCount = mockTeams.filter(t => t.status === 'available').length;
  const totalMembers = mockTeams.reduce((acc, t) => acc + t.members.length, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Response Teams
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and deploy response teams across incidents
              </p>
            </div>
            <Button variant="command" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Team
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Teams</p>
                    <p className="text-2xl font-bold text-foreground">{mockTeams.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Deployed</p>
                    <p className="text-2xl font-bold text-severity-high">{deployedCount}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-severity-high opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Available</p>
                    <p className="text-2xl font-bold text-status-online">{availableCount}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-status-online opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Personnel</p>
                    <p className="text-2xl font-bold text-foreground">{totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockTeams.map(team => (
              <Card key={team.id} variant={team.status === 'deployed' ? 'active' : 'default'}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <p className="text-xs font-mono text-muted-foreground">{team.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={typeColors[team.type]}>
                        {team.type.toUpperCase()}
                      </Badge>
                      <Badge className={statusColors[team.status]}>
                        {team.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{team.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Avg Response: {team.responseTime}</span>
                    </div>
                    {team.currentAssignment && (
                      <div className="flex items-center gap-2 text-sm text-severity-high">
                        <Radio className="h-4 w-4 animate-pulse" />
                        <span>{team.currentAssignment}</span>
                      </div>
                    )}
                    
                    {/* Team Members */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Team Members</p>
                      <div className="space-y-2">
                        {team.members.map(member => (
                          <div key={member.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                member.status === 'available' ? 'bg-status-online' :
                                member.status === 'deployed' ? 'bg-severity-high' :
                                'bg-muted-foreground'
                              }`} />
                              <span className="text-foreground">{member.name}</span>
                              <span className="text-muted-foreground">- {member.role}</span>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">{member.contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
