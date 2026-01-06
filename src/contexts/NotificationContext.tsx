import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { Incident } from '@/types/incident';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationContextType {
  notifyNewIncident: (incident: Incident) => void;
  notifyStatusChange: (incident: Incident, oldStatus: string) => void;
  notifyEscalation: (incident: Incident) => void;
  notifyCriticalAlert: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifyNewIncident = (incident: Incident) => {
    const isCritical = incident.severity === 'critical';
    
    toast(
      <div className="flex items-start gap-3">
        <AlertTriangle className={`h-5 w-5 ${isCritical ? 'text-destructive' : 'text-primary'}`} />
        <div>
          <p className="font-semibold">New Incident Reported</p>
          <p className="text-sm text-muted-foreground">{incident.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{incident.location}</p>
        </div>
      </div>,
      {
        duration: isCritical ? 10000 : 5000,
        className: isCritical ? 'border-destructive' : '',
      }
    );
    
    // Play sound for critical incidents
    if (isCritical) {
      playAlertSound();
    }
  };

  const notifyStatusChange = (incident: Incident, oldStatus: string) => {
    const isResolved = incident.status === 'resolved';
    
    toast(
      <div className="flex items-start gap-3">
        {isResolved ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <Info className="h-5 w-5 text-primary" />
        )}
        <div>
          <p className="font-semibold">Status Updated</p>
          <p className="text-sm text-muted-foreground">
            {incident.title}: {oldStatus} → {incident.status}
          </p>
        </div>
      </div>,
      { duration: 4000 }
    );
  };

  const notifyEscalation = (incident: Incident) => {
    toast(
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
        <div>
          <p className="font-semibold text-destructive">Incident Escalated</p>
          <p className="text-sm text-muted-foreground">{incident.title}</p>
          <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
        </div>
      </div>,
      { 
        duration: 10000,
        className: 'border-destructive',
      }
    );
    
    playAlertSound();
  };

  const notifyCriticalAlert = (message: string) => {
    toast(
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
        <div>
          <p className="font-semibold text-destructive">Critical Alert</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>,
      { 
        duration: 10000,
        className: 'border-destructive',
      }
    );
    
    playAlertSound();
  };

  const playAlertSound = () => {
    // Create a simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 880;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Audio not supported or blocked
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifyNewIncident,
      notifyStatusChange,
      notifyEscalation,
      notifyCriticalAlert,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
