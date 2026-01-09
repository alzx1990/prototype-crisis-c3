import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockIncidents } from '@/data/mockIncidents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  AlertTriangle, 
  Users, 
  MapPin, 
  ExternalLink, 
  MessageSquare, 
  Phone,
  X,
  Send
} from 'lucide-react';

// Singapore incident locations
const incidentLocations = [
  { id: 'INC-2024-001', lat: 1.3006, lng: 103.8559, type: 'incident' },
  { id: 'INC-2024-002', lat: 1.2789, lng: 103.8536, type: 'incident' },
  { id: 'INC-2024-003', lat: 1.2667, lng: 103.6833, type: 'incident' },
  { id: 'INC-2024-004', lat: 1.3547, lng: 103.7760, type: 'incident' },
  { id: 'INC-2024-005', lat: 1.3644, lng: 103.9915, type: 'incident' },
];

// Singapore response units
const responseUnits = [
  { id: 'SCDF-001', name: 'SCDF Central Fire Station', lat: 1.2930, lng: 103.8490, status: 'responding', frequency: '155.475 MHz' },
  { id: 'SCDF-002', name: 'SCDF HAZMAT Unit', lat: 1.3400, lng: 103.7060, status: 'on-scene', frequency: '154.280 MHz' },
  { id: 'SPF-001', name: 'SPF Tanglin Division', lat: 1.3050, lng: 103.8200, status: 'available', frequency: '460.025 MHz' },
  { id: 'SAF-001', name: 'SAF Chemical Defence', lat: 1.4100, lng: 103.8100, status: 'available', frequency: '462.500 MHz' },
  { id: 'PUB-001', name: 'PUB Emergency Response', lat: 1.3350, lng: 103.7430, status: 'responding', frequency: '155.340 MHz' },
  { id: 'CSA-001', name: 'CSA Cyber Response', lat: 1.2760, lng: 103.8450, status: 'on-scene', frequency: '468.200 MHz' },
  { id: 'NEA-001', name: 'NEA Environmental Response', lat: 1.3100, lng: 103.8360, status: 'available', frequency: '156.800 MHz' },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return '#ef4444';
    case 'high': return '#f97316';
    case 'medium': return '#eab308';
    case 'low': return '#22c55e';
    default: return '#6b7280';
  }
};

const getUnitStatusColor = (status: string) => {
  switch (status) {
    case 'responding': return '#3b82f6';
    case 'on-scene': return '#22c55e';
    case 'available': return '#6b7280';
    default: return '#6b7280';
  }
};

interface ChatMessage {
  id: string;
  from: string;
  message: string;
  timestamp: Date;
  isUser: boolean;
}

export function SituationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<typeof responseUnits[0] | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [103.8198, 1.3521],
      zoom: 11,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);

      // Add incident markers with link to details
      incidentLocations.forEach((location) => {
        const incident = mockIncidents.find(inc => inc.id === location.id);
        if (!incident || !map.current) return;

        const el = document.createElement('div');
        el.className = 'incident-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background: ${getSeverityColor(incident.severity)};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px ${getSeverityColor(incident.severity)}80;
          animation: ${incident.severity === 'critical' ? 'pulse 1.5s infinite' : 'none'};
        `;

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, className: 'incident-popup' })
          .setHTML(`
            <div style="background: #1a1a2e; color: white; padding: 12px; border-radius: 8px; min-width: 220px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${incident.title}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 8px;">${incident.id}</div>
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <span style="background: ${getSeverityColor(incident.severity)}; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">${incident.severity}</span>
                <span style="background: #3b82f6; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">${incident.status}</span>
              </div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 4px;">📍 ${incident.location}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 12px;">👥 ${incident.assignedTeam}</div>
              <button id="view-incident-${incident.id}" style="width: 100%; background: #3b82f6; color: white; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                View Details
              </button>
            </div>
          `);

        popup.on('open', () => {
          setTimeout(() => {
            const btn = document.getElementById(`view-incident-${incident.id}`);
            if (btn) {
              btn.onclick = () => navigate(`/incidents/${incident.id}`);
            }
          }, 0);
        });

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add response unit markers with communication options
      responseUnits.forEach((unit) => {
        if (!map.current) return;

        const el = document.createElement('div');
        el.className = 'unit-marker';
        el.style.cssText = `
          width: 24px;
          height: 24px;
          background: ${getUnitStatusColor(unit.status)};
          border: 2px solid white;
          border-radius: 4px;
          cursor: pointer;
          transform: rotate(45deg);
          box-shadow: 0 0 10px ${getUnitStatusColor(unit.status)}80;
        `;

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, className: 'unit-popup' })
          .setHTML(`
            <div style="background: #1a1a2e; color: white; padding: 12px; border-radius: 8px; min-width: 200px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${unit.name}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 4px;">${unit.id}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 8px;">📻 ${unit.frequency}</div>
              <span style="background: ${getUnitStatusColor(unit.status)}; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase; display: inline-block; margin-bottom: 12px;">${unit.status}</span>
              <div style="display: flex; gap: 8px;">
                <button id="chat-unit-${unit.id}" style="flex: 1; background: #22c55e; color: white; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Chat
                </button>
                <button id="call-unit-${unit.id}" style="flex: 1; background: #3b82f6; color: white; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Call
                </button>
              </div>
            </div>
          `);

        popup.on('open', () => {
          setTimeout(() => {
            const chatBtn = document.getElementById(`chat-unit-${unit.id}`);
            const callBtn = document.getElementById(`call-unit-${unit.id}`);
            if (chatBtn) {
              chatBtn.onclick = () => {
                setSelectedUnit(unit);
                setChatMessages([
                  {
                    id: '1',
                    from: unit.name,
                    message: `${unit.name} reporting. Ready for communication.`,
                    timestamp: new Date(),
                    isUser: false
                  }
                ]);
                setChatOpen(true);
              };
            }
            if (callBtn) {
              callBtn.onclick = () => {
                alert(`Initiating voice call to ${unit.name} on ${unit.frequency}...`);
              };
            }
          }, 0);
        });

        new mapboxgl.Marker(el)
          .setLngLat([unit.lng, unit.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add 3D buildings
      const layers = map.current?.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
      )?.id;

      map.current?.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#1a1a2e',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });

    return () => {
      map.current?.remove();
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUnit) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      from: 'Command',
      message: newMessage,
      timestamp: new Date(),
      isUser: true
    };

    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Simulate response
    setTimeout(() => {
      const responses = [
        'Roger that, Command. Acknowledged.',
        'Copy. Proceeding as instructed.',
        'Understood. Will update status shortly.',
        'Affirmative. Team is in position.',
        'Message received. Standing by for further orders.',
      ];
      const responseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        from: selectedUnit.name,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isUser: false
      };
      setChatMessages(prev => [...prev, responseMsg]);
    }, 1000 + Math.random() * 1000);
  };

  if (!mapboxToken) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <Card className="p-8 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Mapbox API Token Required</h2>
            <p className="text-muted-foreground text-sm">
              Enter your Mapbox public token to enable the situation map. 
              Get your token at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci10b2tlbi1oZXJlIi4uLg=="
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={() => mapboxToken && initializeMap()} 
              className="w-full"
              disabled={!mapboxToken}
            >
              Initialize Map
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-4 bg-background/90 backdrop-blur-sm border-border space-y-4">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            MAP LEGEND
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <AlertTriangle className="h-3 w-3" />
                INCIDENTS
              </p>
              <div className="space-y-1">
                {['critical', 'high', 'medium', 'low'].map((severity) => (
                  <div key={severity} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white"
                      style={{ background: getSeverityColor(severity) }}
                    />
                    <span className="text-xs capitalize">{severity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <Users className="h-3 w-3" />
                RESPONSE UNITS
              </p>
              <div className="space-y-1">
                {['responding', 'on-scene', 'available'].map((status) => (
                  <div key={status} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 border-2 border-white rotate-45"
                      style={{ background: getUnitStatusColor(status) }}
                    />
                    <span className="text-xs capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Panel */}
      {chatOpen && selectedUnit && (
        <div className="absolute top-4 right-16 z-20 w-80">
          <Card className="bg-background/95 backdrop-blur-sm border-border overflow-hidden">
            <div className="p-3 bg-primary/10 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">{selectedUnit.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedUnit.frequency}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => alert(`Calling ${selectedUnit.name}...`)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-64 overflow-y-auto p-3 space-y-2">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-2 rounded-lg text-sm ${
                    msg.isUser 
                      ? 'bg-primary/20 ml-6' 
                      : 'bg-secondary/50 mr-6'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-xs">{msg.from}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Type message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="text-sm h-9"
              />
              <Button size="icon" className="h-9 w-9" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Stats Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <Card className="p-4 bg-background/90 backdrop-blur-sm border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-severity-critical" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Incidents</p>
                  <p className="text-xl font-bold">{mockIncidents.filter(i => i.status === 'active').length}</p>
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Response Units</p>
                  <p className="text-xl font-bold">{responseUnits.length}</p>
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-severity-critical animate-pulse" />
                <span className="text-sm">
                  {mockIncidents.filter(i => i.severity === 'critical').length} Critical
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-severity-high" />
                <span className="text-sm">
                  {mockIncidents.filter(i => i.severity === 'high').length} High
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {mockIncidents.slice(0, 3).map((incident) => (
                <Badge 
                  key={incident.id} 
                  variant={incident.severity} 
                  className="text-xs cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/incidents/${incident.id}`)}
                >
                  {incident.id}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}