import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockIncidents } from '@/data/mockIncidents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, AlertTriangle, Users, MapPin } from 'lucide-react';

// Mock locations for incidents and response units
const incidentLocations = [
  { id: 'INC-2024-001', lat: 40.7128, lng: -74.006, type: 'incident' },
  { id: 'INC-2024-002', lat: 40.7589, lng: -73.9851, type: 'incident' },
  { id: 'INC-2024-003', lat: 40.7282, lng: -73.7949, type: 'incident' },
  { id: 'INC-2024-004', lat: 40.6892, lng: -74.0445, type: 'incident' },
  { id: 'INC-2024-005', lat: 40.7484, lng: -73.9857, type: 'incident' },
];

const responseUnits = [
  { id: 'UNIT-001', name: 'Alpha Response', lat: 40.7200, lng: -74.010, status: 'responding' },
  { id: 'UNIT-002', name: 'Cyber Response', lat: 40.7550, lng: -73.990, status: 'on-scene' },
  { id: 'UNIT-003', name: 'HAZMAT Unit', lat: 40.7300, lng: -73.800, status: 'responding' },
  { id: 'UNIT-004', name: 'Tech Response', lat: 40.6850, lng: -74.050, status: 'available' },
  { id: 'UNIT-005', name: 'Facility Ops', lat: 40.7450, lng: -73.980, status: 'on-scene' },
  { id: 'UNIT-006', name: 'Medical Team', lat: 40.7350, lng: -74.000, status: 'available' },
  { id: 'UNIT-007', name: 'Fire Response', lat: 40.7100, lng: -73.995, status: 'responding' },
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

export function SituationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.006, 40.7128],
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

      // Add incident markers
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

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`
            <div style="background: #1a1a2e; color: white; padding: 12px; border-radius: 8px; min-width: 200px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${incident.title}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 8px;">${incident.id}</div>
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <span style="background: ${getSeverityColor(incident.severity)}; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">${incident.severity}</span>
                <span style="background: #3b82f6; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">${incident.status}</span>
              </div>
              <div style="font-size: 12px; color: #a0a0a0;">📍 ${incident.location}</div>
              <div style="font-size: 12px; color: #a0a0a0;">👥 ${incident.assignedTeam}</div>
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add response unit markers
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

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`
            <div style="background: #1a1a2e; color: white; padding: 12px; border-radius: 8px; min-width: 150px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${unit.name}</div>
              <div style="font-size: 12px; color: #a0a0a0; margin-bottom: 8px;">${unit.id}</div>
              <span style="background: ${getUnitStatusColor(unit.status)}; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">${unit.status}</span>
            </div>
          `);

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
                <Badge key={incident.id} variant={incident.severity} className="text-xs">
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
