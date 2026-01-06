import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { IncidentCard } from '@/components/IncidentCard';
import { mockIncidents } from '@/data/mockIncidents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { Incident, Severity, IncidentStatus } from '@/types/incident';

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'all'>('all');

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const severityOrder: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedIncidents = [...filteredIncidents].sort((a, b) => 
    severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Incident Management
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track, manage, and resolve all active and historical incidents
              </p>
            </div>
            <Button variant="critical" className="gap-2">
              <Plus className="h-4 w-4" />
              New Incident
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search incidents..." 
                className="pl-10 bg-secondary/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as Severity | 'all')}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select 
                className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as IncidentStatus | 'all')}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="responding">Responding</option>
                <option value="contained">Contained</option>
                <option value="resolved">Resolved</option>
              </select>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {(['critical', 'high', 'medium', 'low'] as Severity[]).map(severity => {
              const count = mockIncidents.filter(i => i.severity === severity).length;
              return (
                <div key={severity} className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center justify-between">
                    <Badge variant={severity}>{severity}</Badge>
                    <span className="text-2xl font-bold text-foreground">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Incidents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedIncidents.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>

          {sortedIncidents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No incidents match your filters
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
