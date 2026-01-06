import { useState, useEffect, useCallback } from 'react';
import { Task, PlanningObjective, OperationalPeriod } from '@/types/planning';

const TASKS_KEY = 'incident_commander_tasks';
const OBJECTIVES_KEY = 'incident_commander_objectives';
const PERIODS_KEY = 'incident_commander_periods';

// Mock data
const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    incidentId: 'INC-2024-001',
    title: 'Establish perimeter control',
    description: 'Set up security perimeter around affected area',
    status: 'completed',
    priority: 'high',
    assignee: 'Sgt. Johnson',
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(),
  },
  {
    id: 'TASK-002',
    incidentId: 'INC-2024-001',
    title: 'Coordinate with utility companies',
    description: 'Contact power and water utilities for status updates',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Lt. Garcia',
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(),
  },
  {
    id: 'TASK-003',
    incidentId: 'INC-2024-002',
    title: 'Network isolation complete',
    description: 'Isolate compromised network segments',
    status: 'pending',
    priority: 'high',
    assignee: 'Cyber Team Lead',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'TASK-004',
    title: 'Equipment inventory check',
    description: 'Complete monthly equipment status verification',
    status: 'pending',
    priority: 'medium',
    assignee: 'Supply Officer',
    dueDate: new Date(Date.now() + 86400000 * 3),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockObjectives: PlanningObjective[] = [
  {
    id: 'OBJ-001',
    incidentId: 'INC-2024-001',
    title: 'Restore power to downtown sector',
    description: 'Coordinate with power utility to restore electricity to affected buildings',
    status: 'active',
    priority: 'critical',
    resources: ['Alpha Response', 'Utility Liaison'],
    tasks: ['TASK-001', 'TASK-002'],
    createdAt: new Date(),
  },
  {
    id: 'OBJ-002',
    incidentId: 'INC-2024-002',
    title: 'Contain network breach',
    description: 'Isolate and analyze compromised systems',
    status: 'active',
    priority: 'high',
    resources: ['Cyber Response', 'IT Security'],
    tasks: ['TASK-003'],
    createdAt: new Date(),
  },
  {
    id: 'OBJ-003',
    title: 'Operational readiness assessment',
    description: 'Complete quarterly readiness evaluation for all response teams',
    status: 'planned',
    priority: 'medium',
    resources: ['All Teams'],
    tasks: ['TASK-004'],
    startTime: new Date(Date.now() + 86400000),
    createdAt: new Date(),
  },
];

const mockPeriods: OperationalPeriod[] = [
  {
    id: 'OP-001',
    name: 'Operational Period 1',
    startTime: new Date(Date.now() - 21600000),
    endTime: new Date(Date.now() + 21600000),
    objectives: ['OBJ-001', 'OBJ-002'],
    commander: 'Cpt. Sarah Chen',
    status: 'active',
  },
];

export function usePlanning() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [objectives, setObjectives] = useState<PlanningObjective[]>([]);
  const [periods, setPeriods] = useState<OperationalPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize tasks
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      setTasks(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      })));
    } else {
      localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
      setTasks(mockTasks);
    }

    // Initialize objectives
    const storedObjectives = localStorage.getItem(OBJECTIVES_KEY);
    if (storedObjectives) {
      const parsed = JSON.parse(storedObjectives);
      setObjectives(parsed.map((o: any) => ({
        ...o,
        createdAt: new Date(o.createdAt),
        startTime: o.startTime ? new Date(o.startTime) : undefined,
        endTime: o.endTime ? new Date(o.endTime) : undefined,
      })));
    } else {
      localStorage.setItem(OBJECTIVES_KEY, JSON.stringify(mockObjectives));
      setObjectives(mockObjectives);
    }

    // Initialize periods
    const storedPeriods = localStorage.getItem(PERIODS_KEY);
    if (storedPeriods) {
      const parsed = JSON.parse(storedPeriods);
      setPeriods(parsed.map((p: any) => ({
        ...p,
        startTime: new Date(p.startTime),
        endTime: new Date(p.endTime),
      })));
    } else {
      localStorage.setItem(PERIODS_KEY, JSON.stringify(mockPeriods));
      setPeriods(mockPeriods);
    }

    setIsLoading(false);
  }, []);

  // Task operations
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: `TASK-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [newTask, ...tasks];
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    setTasks(updated);
    return newTask;
  }, [tasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const updated = tasks.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    setTasks(updated);
  }, [tasks]);

  const deleteTask = useCallback((id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    setTasks(updated);
  }, [tasks]);

  // Objective operations
  const addObjective = useCallback((objective: Omit<PlanningObjective, 'id' | 'createdAt'>) => {
    const newObjective: PlanningObjective = {
      ...objective,
      id: `OBJ-${Date.now()}`,
      createdAt: new Date(),
    };
    const updated = [newObjective, ...objectives];
    localStorage.setItem(OBJECTIVES_KEY, JSON.stringify(updated));
    setObjectives(updated);
    return newObjective;
  }, [objectives]);

  const updateObjective = useCallback((id: string, updates: Partial<PlanningObjective>) => {
    const updated = objectives.map(o => 
      o.id === id ? { ...o, ...updates } : o
    );
    localStorage.setItem(OBJECTIVES_KEY, JSON.stringify(updated));
    setObjectives(updated);
  }, [objectives]);

  // Get tasks for incident
  const getTasksForIncident = useCallback((incidentId: string) => {
    return tasks.filter(t => t.incidentId === incidentId);
  }, [tasks]);

  // Get objectives for incident
  const getObjectivesForIncident = useCallback((incidentId: string) => {
    return objectives.filter(o => o.incidentId === incidentId);
  }, [objectives]);

  return {
    tasks,
    objectives,
    periods,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    addObjective,
    updateObjective,
    getTasksForIncident,
    getObjectivesForIncident,
  };
}
