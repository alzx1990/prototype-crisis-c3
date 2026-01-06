export interface Task {
  id: string;
  incidentId?: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanningObjective {
  id: string;
  incidentId?: string;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  resources: string[];
  tasks: string[]; // Task IDs
  startTime?: Date;
  endTime?: Date;
  createdAt: Date;
}

export interface OperationalPeriod {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  objectives: string[]; // Objective IDs
  commander: string;
  status: 'planning' | 'active' | 'completed';
}
