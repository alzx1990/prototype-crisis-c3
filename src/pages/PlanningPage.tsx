import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePlanning } from '@/hooks/usePlanning';
import { 
  Target, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Calendar,
  ListTodo,
  Flag
} from 'lucide-react';
import { useState } from 'react';
import { NewObjectiveDialog } from '@/components/NewObjectiveDialog';

export default function PlanningPage() {
  const { objectives, periods, tasks, isLoading } = usePlanning();
  const [showNewObjective, setShowNewObjective] = useState(false);

  const activePeriod = periods.find(p => p.status === 'active');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500/20 text-green-500">Active</Badge>;
      case 'planned': return <Badge className="bg-blue-500/20 text-blue-500">Planned</Badge>;
      case 'completed': return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Operational Planning
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Define objectives, allocate resources, and track operational goals
              </p>
            </div>
            <Button variant="critical" className="gap-2" onClick={() => setShowNewObjective(true)}>
              <Plus className="h-4 w-4" />
              New Objective
            </Button>
          </div>

          {/* Active Operational Period */}
          {activePeriod && (
            <Card className="border-primary/50 bg-primary/5 mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {activePeriod.name}
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Start Time</p>
                    <p className="text-sm font-medium">{formatTime(activePeriod.startTime)}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">End Time</p>
                    <p className="text-sm font-medium">{formatTime(activePeriod.endTime)}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Commander</p>
                    <p className="text-sm font-medium">{activePeriod.commander}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Objectives</p>
                    <p className="text-sm font-medium">{activePeriod.objectives.length} active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Objectives</p>
                    <p className="text-2xl font-bold text-foreground">
                      {objectives.filter(o => o.status === 'active').length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Pending Tasks</p>
                    <p className="text-2xl font-bold text-foreground">
                      {tasks.filter(t => t.status === 'pending').length}
                    </p>
                  </div>
                  <ListTodo className="h-8 w-8 text-orange-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-foreground">
                      {tasks.filter(t => t.status === 'in_progress').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {tasks.filter(t => t.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objectives Grid */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              Strategic Objectives
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {objectives.map(objective => (
                <Card key={objective.id} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(objective.status)}
                          <span className={`text-xs font-medium ${getPriorityColor(objective.priority)}`}>
                            {objective.priority.toUpperCase()}
                          </span>
                        </div>
                        <CardTitle className="text-base">{objective.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{objective.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{objective.resources.length} resources</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ListTodo className="h-3 w-3" />
                        <span>{objective.tasks.length} tasks</span>
                      </div>
                      {objective.incidentId && (
                        <span className="font-mono text-primary">{objective.incidentId}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {objective.resources.map((resource, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <NewObjectiveDialog 
        open={showNewObjective} 
        onOpenChange={setShowNewObjective}
      />
    </div>
  );
}
