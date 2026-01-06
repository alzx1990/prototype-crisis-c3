import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { usePlanning } from '@/hooks/usePlanning';
import { 
  ListTodo, 
  Plus, 
  Clock, 
  User,
  AlertCircle,
  CheckCircle2,
  Circle,
  Loader2,
  Filter
} from 'lucide-react';
import { useState } from 'react';
import { NewTaskDialog } from '@/components/NewTaskDialog';
import { Task } from '@/types/planning';
import { toast } from 'sonner';

export default function TaskingPage() {
  const { tasks, updateTask, isLoading } = usePlanning();
  const [showNewTask, setShowNewTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>('all');

  const filteredTasks = tasks.filter(task => 
    statusFilter === 'all' || task.status === statusFilter
  );

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'blocked': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return <Badge className="bg-destructive/20 text-destructive">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500/20 text-yellow-600">Medium</Badge>;
      case 'low': return <Badge className="bg-green-500/20 text-green-600">Low</Badge>;
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
    toast.success(`Task marked as ${newStatus.replace('_', ' ')}`);
  };

  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
                <ListTodo className="h-6 w-6 text-primary" />
                Task Management
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Assign, track, and manage operational tasks
              </p>
            </div>
            <Button variant="critical" className="gap-2" onClick={() => setShowNewTask(true)}>
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {(['pending', 'in_progress', 'completed', 'blocked'] as Task['status'][]).map(status => {
              const count = tasks.filter(t => t.status === status).length;
              return (
                <Card 
                  key={status} 
                  className={`border-border cursor-pointer transition-colors ${statusFilter === status ? 'border-primary' : 'hover:border-primary/50'}`}
                  onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground capitalize">{status.replace('_', ' ')}</p>
                        <p className="text-2xl font-bold text-foreground">{count}</p>
                      </div>
                      {getStatusIcon(status)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
            <Button 
              variant={statusFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={statusFilter === 'pending' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={statusFilter === 'in_progress' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setStatusFilter('in_progress')}
            >
              In Progress
            </Button>
            <Button 
              variant={statusFilter === 'blocked' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setStatusFilter('blocked')}
            >
              Blocked
            </Button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <Card key={task.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={(checked) => 
                        handleStatusChange(task.id, checked ? 'completed' : 'pending')
                      }
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(task.status)}
                        <span className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </span>
                        {getPriorityBadge(task.priority)}
                        {task.incidentId && (
                          <Badge variant="outline" className="font-mono text-xs">
                            {task.incidentId}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                        )}
                        <span className="font-mono">{task.id}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {task.status !== 'in_progress' && task.status !== 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(task.id, 'in_progress')}
                        >
                          Start
                        </Button>
                      )}
                      {task.status === 'in_progress' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-500 border-green-500/50"
                          onClick={() => handleStatusChange(task.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No tasks match your filter
            </div>
          )}
        </main>
      </div>
      
      <NewTaskDialog 
        open={showNewTask} 
        onOpenChange={setShowNewTask}
      />
    </div>
  );
}
