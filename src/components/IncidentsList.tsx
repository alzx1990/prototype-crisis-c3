import { Plus, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IncidentCard } from '@/components/IncidentCard';
import { mockIncidents } from '@/data/mockIncidents';

export function IncidentsList() {
  const activeIncidents = mockIncidents.filter(i => i.status !== 'resolved');
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Active Incidents</h2>
          <p className="text-sm text-muted-foreground">
            {activeIncidents.length} incidents requiring attention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="command" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Incident
          </Button>
        </div>
      </div>

      <div className="space-y-3 overflow-auto flex-1">
        {activeIncidents
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
      </div>
    </div>
  );
}
