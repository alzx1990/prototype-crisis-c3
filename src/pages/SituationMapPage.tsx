import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { SituationMap } from '@/components/SituationMap';

const SituationMapPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden">
          <SituationMap />
        </main>
      </div>
    </div>
  );
};

export default SituationMapPage;
