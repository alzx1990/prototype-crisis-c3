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
    id: 'SCDF-001',
    name: 'SCDF Central Fire Station',
    type: 'fire',
    status: 'deployed',
    location: 'Central Fire Station, Hill Street',
    currentAssignment: 'INC-2024-001 - MRT Tunnel Flooding',
    responseTime: '4 min',
    members: [
      { id: 'm1', name: 'Lim Wei Ming', role: 'Station Commander', status: 'deployed', contact: 'CH-1' },
      { id: 'm2', name: 'Ahmad Razali', role: 'Section Leader', status: 'deployed', contact: 'CH-1' },
      { id: 'm3', name: 'David Koh', role: 'Firefighter', status: 'deployed', contact: 'CH-1' },
      { id: 'm4', name: 'Priya Nair', role: 'Firefighter', status: 'deployed', contact: 'CH-1' },
    ]
  },
  {
    id: 'SCDF-002',
    name: 'SCDF HAZMAT Unit',
    type: 'hazmat',
    status: 'deployed',
    location: 'Jurong Fire Station, Jurong West',
    currentAssignment: 'INC-2024-003 - Chemical Spill at Jurong Island',
    responseTime: '8 min',
    members: [
      { id: 'm5', name: 'Tan Jia Hui', role: 'HAZMAT Commander', status: 'deployed', contact: 'CH-3' },
      { id: 'm6', name: 'Ravi Kumar', role: 'HAZMAT Specialist', status: 'deployed', contact: 'CH-3' },
      { id: 'm7', name: 'Michelle Wong', role: 'Decon Officer', status: 'deployed', contact: 'CH-3' },
    ]
  },
  {
    id: 'SPF-001',
    name: 'SPF Tanglin Division',
    type: 'police',
    status: 'available',
    location: 'Tanglin Police Division HQ',
    responseTime: '5 min',
    members: [
      { id: 'm8', name: 'Jason Lim', role: 'Duty Officer', status: 'available', contact: 'CH-4' },
      { id: 'm9', name: 'Nurul Aisyah', role: 'Investigation Officer', status: 'available', contact: 'CH-4' },
      { id: 'm10', name: 'Marcus Tan', role: 'Patrol Officer', status: 'off-duty', contact: 'CH-4' },
    ]
  },
  {
    id: 'SPF-002',
    name: 'SPF Special Operations Command',
    type: 'police',
    status: 'standby',
    location: 'Police Cantonment Complex',
    responseTime: '10 min',
    members: [
      { id: 'm11', name: 'Vincent Ng', role: 'SOC Commander', status: 'available', contact: 'CH-5' },
      { id: 'm12', name: 'Rachel Goh', role: 'Tactical Leader', status: 'available', contact: 'CH-5' },
      { id: 'm13', name: 'Farhan Ibrahim', role: 'Specialist', status: 'available', contact: 'CH-5' },
    ]
  },
  {
    id: 'SAF-001',
    name: 'SAF Chemical Defence Group',
    type: 'hazmat',
    status: 'standby',
    location: 'Nee Soon Camp',
    responseTime: '15 min',
    members: [
      { id: 'm14', name: 'Kenneth Ong', role: 'CDG Commander', status: 'available', contact: 'CH-6' },
      { id: 'm15', name: 'Siti Aminah', role: 'NBC Specialist', status: 'available', contact: 'CH-6' },
      { id: 'm16', name: 'Benjamin Lee', role: 'Decon Officer', status: 'available', contact: 'CH-6' },
      { id: 'm17', name: 'Muthu Rajan', role: 'Specialist', status: 'off-duty', contact: 'CH-6' },
    ]
  },
  {
    id: 'SAF-002',
    name: 'SAF Medical Response Force',
    type: 'medical',
    status: 'available',
    location: 'Kranji Camp',
    responseTime: '12 min',
    members: [
      { id: 'm18', name: 'Sarah Tan', role: 'Medical Officer', status: 'available', contact: 'CH-7' },
      { id: 'm19', name: 'Alvin Chua', role: 'Paramedic', status: 'available', contact: 'CH-7' },
      { id: 'm20', name: 'Jenny Ong', role: 'Combat Medic', status: 'available', contact: 'CH-7' },
    ]
  },
  {
    id: 'NEA-001',
    name: 'NEA Environmental Response',
    type: 'hazmat',
    status: 'available',
    location: 'NEA Environment Building, Scotts Road',
    responseTime: '20 min',
    members: [
      { id: 'm21', name: 'Wong Mei Ling', role: 'Environmental Officer', status: 'available', contact: 'CH-8' },
      { id: 'm22', name: 'Rizwan Shah', role: 'Pollution Control', status: 'available', contact: 'CH-8' },
    ]
  },
  {
    id: 'PUB-001',
    name: 'PUB Emergency Response',
    type: 'search-rescue',
    status: 'deployed',
    location: 'PUB WaterHub, Toh Guan',
    currentAssignment: 'INC-2024-001 - MRT Tunnel Flooding',
    responseTime: '10 min',
    members: [
      { id: 'm23', name: 'Danny Lim', role: 'Emergency Engineer', status: 'deployed', contact: 'CH-9' },
      { id: 'm24', name: 'Hafiz Abdullah', role: 'Water Systems Tech', status: 'deployed', contact: 'CH-9' },
      { id: 'm25', name: 'Grace Chen', role: 'Drainage Specialist', status: 'deployed', contact: 'CH-9' },
    ]
  },
  {
    id: 'CSA-001',
    name: 'CSA Cyber Response Team',
    type: 'police',
    status: 'deployed',
    location: 'CSA Headquarters, Maxwell Road',
    currentAssignment: 'INC-2024-002 - Cyber Attack on Banking System',
    responseTime: '5 min',
    members: [
      { id: 'm26', name: 'Kelvin Yeo', role: 'Incident Commander', status: 'deployed', contact: 'CH-10' },
      { id: 'm27', name: 'Vanessa Loh', role: 'Threat Analyst', status: 'deployed', contact: 'CH-10' },
      { id: 'm28', name: 'Arjun Menon', role: 'Security Engineer', status: 'deployed', contact: 'CH-10' },
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
