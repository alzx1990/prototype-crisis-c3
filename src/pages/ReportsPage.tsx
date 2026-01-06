import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar,
  Clock,
  Filter,
  Plus,
  Eye,
  Printer,
  Share2,
  CheckCircle2,
  AlertCircle,
  FileWarning
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'incident' | 'daily' | 'weekly' | 'after-action' | 'safety';
  status: 'draft' | 'pending' | 'approved' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  incidentRef?: string;
}

const mockReports: Report[] = [
  {
    id: 'RPT-2024-001',
    title: 'Industrial Fire Incident Report - Sector 7',
    type: 'incident',
    status: 'pending',
    author: 'Capt. John Torres',
    createdAt: '2024-01-15 14:30',
    updatedAt: '2024-01-15 16:45',
    incidentRef: 'INC-001'
  },
  {
    id: 'RPT-2024-002',
    title: 'Weekly Operations Summary - Week 3',
    type: 'weekly',
    status: 'approved',
    author: 'Cmdr. Sarah Mitchell',
    createdAt: '2024-01-14 09:00',
    updatedAt: '2024-01-14 17:30',
  },
  {
    id: 'RPT-2024-003',
    title: 'Chemical Spill After-Action Review',
    type: 'after-action',
    status: 'draft',
    author: 'Lt. Mike Chen',
    createdAt: '2024-01-13 11:15',
    updatedAt: '2024-01-15 10:20',
    incidentRef: 'INC-002'
  },
  {
    id: 'RPT-2024-004',
    title: 'Daily Situation Report - Jan 15',
    type: 'daily',
    status: 'approved',
    author: 'Dispatch Center',
    createdAt: '2024-01-15 06:00',
    updatedAt: '2024-01-15 06:00',
  },
  {
    id: 'RPT-2024-005',
    title: 'Safety Audit - Station 12',
    type: 'safety',
    status: 'pending',
    author: 'Safety Officer Davis',
    createdAt: '2024-01-12 14:00',
    updatedAt: '2024-01-14 09:30',
  },
  {
    id: 'RPT-2024-006',
    title: 'Multi-Vehicle Collision Analysis',
    type: 'incident',
    status: 'approved',
    author: 'Sgt. Maria Garcia',
    createdAt: '2024-01-10 16:20',
    updatedAt: '2024-01-11 14:15',
    incidentRef: 'INC-003'
  },
  {
    id: 'RPT-2024-007',
    title: 'Emergency Response Drill Report',
    type: 'after-action',
    status: 'archived',
    author: 'Training Division',
    createdAt: '2024-01-08 08:00',
    updatedAt: '2024-01-09 12:00',
  },
];

const typeColors: Record<Report['type'], string> = {
  incident: 'bg-severity-high/20 text-severity-high border-severity-high/30',
  daily: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  weekly: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'after-action': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  safety: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const statusIcons: Record<Report['status'], React.ReactNode> = {
  draft: <FileWarning className="h-4 w-4 text-muted-foreground" />,
  pending: <AlertCircle className="h-4 w-4 text-status-warning" />,
  approved: <CheckCircle2 className="h-4 w-4 text-status-online" />,
  archived: <FileText className="h-4 w-4 text-muted-foreground" />,
};

const statusColors: Record<Report['status'], string> = {
  draft: 'text-muted-foreground',
  pending: 'text-status-warning',
  approved: 'text-status-online',
  archived: 'text-muted-foreground',
};

export default function ReportsPage() {
  const reportsByStatus = {
    draft: mockReports.filter(r => r.status === 'draft').length,
    pending: mockReports.filter(r => r.status === 'pending').length,
    approved: mockReports.filter(r => r.status === 'approved').length,
    archived: mockReports.filter(r => r.status === 'archived').length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Reports Center
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Generate, review, and manage incident and operational reports
              </p>
            </div>
            <Button variant="command" className="gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Drafts</p>
                    <p className="text-2xl font-bold text-muted-foreground">{reportsByStatus.draft}</p>
                  </div>
                  <FileWarning className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending Review</p>
                    <p className="text-2xl font-bold text-status-warning">{reportsByStatus.pending}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-status-warning opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Approved</p>
                    <p className="text-2xl font-bold text-status-online">{reportsByStatus.approved}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-status-online opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card variant="default">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Reports</p>
                    <p className="text-2xl font-bold text-foreground">{mockReports.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>

          {/* Reports List */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-sm">All Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReports.map(report => (
                  <div 
                    key={report.id}
                    className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {statusIcons[report.status]}
                          <h3 className="font-medium text-foreground">{report.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-mono">{report.id}</span>
                          <Badge className={typeColors[report.type]}>
                            {report.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {report.incidentRef && (
                            <Badge variant="outline" className="font-mono">
                              {report.incidentRef}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>By: {report.author}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated: {report.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs uppercase font-medium ${statusColors[report.status]}`}>
                          {report.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
