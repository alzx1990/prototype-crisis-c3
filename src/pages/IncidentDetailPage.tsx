import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalDatabase } from '@/hooks/useLocalDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle,
  Activity,
  User,
  MessageSquare,
  FileText,
  CheckCircle,
  XCircle,
  Timer
} from 'lucide-react';
import { Severity, IncidentStatus } from '@/types/incident';
import { useState } from 'react';
import { toast } from 'sonner';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'status_change' | 'update' | 'assignment' | 'note';
  title: string;
  description: string;
  user: string;
}

export default function IncidentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIncidentById, updateIncident } = useLocalDatabase();
  const { user } = useAuth();
  const incident = getIncidentById(id || '');

  const [newNote, setNewNote] = useState('');

  // Mock timeline - in production this would come from the database
  const [timeline] = useState<TimelineEvent[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 3600000),
      type: 'status_change',
      title: 'Status Updated',
      description: 'Incident status changed to Active',
      user: 'System',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 7200000),
      type: 'assignment',
      title: 'Team Assigned',
      description: 'Alpha Response team assigned to incident',
      user: 'Cpt. Sarah Chen',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 10800000),
      type: 'update',
      title: 'Incident Created',
      description: 'New incident reported and logged in system',
      user: 'System',
    },
  ]);

  if (!incident) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">Incident Not Found</h2>
              <p className="text-muted-foreground mb-4">The requested incident could not be found.</p>
              <Button onClick={() => navigate('/incidents')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Incidents
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: IncidentStatus) => {
    updateIncident(incident.id, { status: newStatus });
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    toast.success('Note added to incident');
    setNewNote('');
  };

  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'status_change': return <Activity className="h-4 w-4" />;
      case 'assignment': return <Users className="h-4 w-4" />;
      case 'update': return <FileText className="h-4 w-4" />;
      case 'note': return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {/* Back Button & Header */}
          <div className="mb-6">
            <Button variant="ghost" className="mb-4" onClick={() => navigate('/incidents')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Incidents
            </Button>
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={incident.severity}>{incident.severity}</Badge>
                  <Badge variant={incident.status === 'active' ? 'default' : 'secondary'}>
                    {incident.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-mono">{incident.id}</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">{incident.title}</h1>
              </div>
              
              {(user?.role === 'admin' || user?.role === 'commander') && (
                <div className="flex gap-2">
                  {incident.status !== 'resolved' && (
                    <Button 
                      variant="outline" 
                      className="text-green-500 border-green-500/50 hover:bg-green-500/10"
                      onClick={() => handleStatusChange('resolved')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                  )}
                  {incident.status !== 'escalated' && incident.status !== 'resolved' && (
                    <Button 
                      variant="critical"
                      onClick={() => handleStatusChange('escalated')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Escalate
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{incident.description}</p>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index < timeline.length - 1 && (
                            <div className="w-px h-full bg-border flex-1 my-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-foreground">{event.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(event.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">by {event.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Note */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Add Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground resize-none"
                      rows={3}
                      placeholder="Enter a note or update..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm text-foreground">{incident.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Assigned Team</p>
                      <p className="text-sm text-foreground">{incident.assignedTeam}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Incident Commander</p>
                      <p className="text-sm text-foreground">{incident.commander}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm text-foreground">
                        {incident.createdAt.toLocaleDateString()} {incident.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="text-sm text-foreground">
                        {incident.updatedAt.toLocaleDateString()} {incident.updatedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Response Units</span>
                    <span className="text-lg font-bold text-foreground">{incident.responseUnits}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Affected Assets</span>
                    <span className="text-lg font-bold text-foreground">{incident.affectedAssets}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Request Additional Units
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Commander
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
