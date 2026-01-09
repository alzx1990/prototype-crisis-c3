import { useState } from 'react';
import { Plus, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IncidentCard } from '@/components/IncidentCard';
import { NewIncidentDialog } from '@/components/NewIncidentDialog';
import { useLocalDatabase } from '@/hooks/useLocalDatabase';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export function IncidentsList() {
  const { incidents, addIncident } = useLocalDatabase();
  const { notifyNewIncident } = useNotifications();
  const [showNewIncident, setShowNewIncident] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  
  const filteredIncidents = activeIncidents.filter(incident => {
    if (severityFilter && incident.severity !== severityFilter) return false;
    if (statusFilter && incident.status !== statusFilter) return false;
    return true;
  });

  const handleCreateIncident = (incident: any) => {
    const newIncident = addIncident(incident);
    notifyNewIncident(newIncident);
    setShowNewIncident(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Incident list has been updated with latest data.",
      });
    }, 1000);
  };

  const clearFilters = () => {
    setSeverityFilter(null);
    setStatusFilter(null);
  };

  const hasActiveFilters = severityFilter || statusFilter;
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Active Incidents</h2>
          <p className="text-sm text-muted-foreground">
            {filteredIncidents.length} incidents requiring attention
            {hasActiveFilters && ` (filtered from ${activeIncidents.length})`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={hasActiveFilters ? "default" : "outline"} size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {hasActiveFilters && " •"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Severity</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSeverityFilter('critical')}>
                Critical {severityFilter === 'critical' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter('high')}>
                High {severityFilter === 'high' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter('medium')}>
                Medium {severityFilter === 'medium' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter('low')}>
                Low {severityFilter === 'low' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Active {statusFilter === 'active' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Pending {statusFilter === 'pending' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('escalated')}>
                Escalated {statusFilter === 'escalated' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearFilters} className="text-muted-foreground">
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="command" size="sm" onClick={() => setShowNewIncident(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Incident
          </Button>
        </div>
      </div>

      <div className="space-y-3 overflow-auto flex-1">
        {filteredIncidents
          .sort((a, b) => {
            const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            return severityOrder[a.severity] - severityOrder[b.severity];
          })
          .map((incident, index) => (
            <div 
              key={incident.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <IncidentCard incident={incident} />
            </div>
          ))}
        {filteredIncidents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No incidents match the current filters
          </div>
        )}
      </div>

      <NewIncidentDialog 
        open={showNewIncident} 
        onOpenChange={setShowNewIncident}
        onSubmit={handleCreateIncident}
      />
    </div>
  );
}
