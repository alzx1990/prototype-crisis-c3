import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { IncidentTrendsChart } from '@/components/analytics/IncidentTrendsChart';
import { SeverityDistributionChart } from '@/components/analytics/SeverityDistributionChart';
import { ResponseTimeChart } from '@/components/analytics/ResponseTimeChart';
import { TeamPerformanceChart } from '@/components/analytics/TeamPerformanceChart';
import { AnalyticsStats } from '@/components/analytics/AnalyticsStats';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Incident trends, response metrics, and team performance
            </p>
          </div>

          <AnalyticsStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <IncidentTrendsChart />
            <SeverityDistributionChart />
            <ResponseTimeChart />
            <TeamPerformanceChart />
          </div>
        </main>
      </div>
    </div>
  );
}
