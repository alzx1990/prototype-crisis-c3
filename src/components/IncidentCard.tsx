import { MapPin, Users, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Incident } from '@/types/incident';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const navigate = useNavigate();
  
  const timeSince = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const handleClick = () => {
    navigate(`/incidents/${incident.id}`);
  };

  return (
    <Card 
      variant={incident.severity === 'critical' ? 'critical' : 'default'}
      className={cn(
        "transition-all duration-200 hover:border-primary/50 cursor-pointer group",
        incident.severity === 'critical' && "blink-critical"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={incident.severity} className="text-[10px]">
                {incident.severity}
              </Badge>
              <Badge variant={incident.status} className="text-[10px]">
                {incident.status}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">
                {incident.id}
              </span>
            </div>
            
            <h3 className="font-semibold text-sm mb-1 truncate group-hover:text-primary transition-colors">
              {incident.title}
            </h3>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {incident.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{incident.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{incident.responseUnits} units</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{timeSince(incident.createdAt)}</span>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
