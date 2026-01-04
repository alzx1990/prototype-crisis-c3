import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { StatsGrid } from '@/components/StatsGrid';
import { IncidentsList } from '@/components/IncidentsList';
import { CommandPanel } from '@/components/CommandPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
            
            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none overflow-hidden" />
            
            <div className="relative z-10 space-y-6">
              {/* Stats Overview */}
              <StatsGrid />
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6" style={{ height: 'calc(100vh - 280px)' }}>
                {/* Incidents List - Takes 2 columns */}
                <div className="col-span-2">
                  <IncidentsList />
                </div>
                
                {/* Command Panel */}
                <div className="col-span-1">
                  <CommandPanel />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
