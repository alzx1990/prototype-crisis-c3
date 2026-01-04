export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'active' | 'pending' | 'escalated' | 'resolved';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  location: string;
  assignedTeam: string;
  commander: string;
  createdAt: Date;
  updatedAt: Date;
  affectedAssets: number;
  responseUnits: number;
}

export interface SystemStats {
  activeIncidents: number;
  criticalAlerts: number;
  respondingUnits: number;
  avgResponseTime: string;
}
