import { useState, useEffect, useCallback } from 'react';
import { Incident } from '@/types/incident';
import { mockIncidents } from '@/data/mockIncidents';

const INCIDENTS_KEY = 'incident_commander_incidents';

export function useLocalDatabase() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const storedIncidents = localStorage.getItem(INCIDENTS_KEY);
    if (storedIncidents) {
      const parsed = JSON.parse(storedIncidents);
      // Convert date strings back to Date objects
      const incidentsWithDates = parsed.map((inc: any) => ({
        ...inc,
        createdAt: new Date(inc.createdAt),
        updatedAt: new Date(inc.updatedAt),
      }));
      setIncidents(incidentsWithDates);
    } else {
      // Initialize with mock data
      localStorage.setItem(INCIDENTS_KEY, JSON.stringify(mockIncidents));
      setIncidents(mockIncidents);
    }
    setIsLoading(false);
  }, []);

  const saveIncidents = useCallback((newIncidents: Incident[]) => {
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(newIncidents));
    setIncidents(newIncidents);
  }, []);

  const addIncident = useCallback((incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncident: Incident = {
      ...incident,
      id: `INC-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [newIncident, ...incidents];
    saveIncidents(updated);
    return newIncident;
  }, [incidents, saveIncidents]);

  const updateIncident = useCallback((id: string, updates: Partial<Incident>) => {
    const updated = incidents.map(inc => 
      inc.id === id ? { ...inc, ...updates, updatedAt: new Date() } : inc
    );
    saveIncidents(updated);
  }, [incidents, saveIncidents]);

  const deleteIncident = useCallback((id: string) => {
    const updated = incidents.filter(inc => inc.id !== id);
    saveIncidents(updated);
  }, [incidents, saveIncidents]);

  const getIncidentById = useCallback((id: string) => {
    return incidents.find(inc => inc.id === id);
  }, [incidents]);

  return {
    incidents,
    isLoading,
    addIncident,
    updateIncident,
    deleteIncident,
    getIncidentById,
  };
}
