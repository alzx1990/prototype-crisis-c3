import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SituationMapPage from "./pages/SituationMapPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import IncidentsPage from "./pages/IncidentsPage";
import IncidentDetailPage from "./pages/IncidentDetailPage";
import ResponseTeamsPage from "./pages/ResponseTeamsPage";
import CommunicationsPage from "./pages/CommunicationsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import PlanningPage from "./pages/PlanningPage";
import TaskingPage from "./pages/TaskingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/incidents" element={<ProtectedRoute><IncidentsPage /></ProtectedRoute>} />
              <Route path="/incidents/:id" element={<ProtectedRoute><IncidentDetailPage /></ProtectedRoute>} />
              <Route path="/planning" element={<ProtectedRoute><PlanningPage /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><TaskingPage /></ProtectedRoute>} />
              <Route path="/teams" element={<ProtectedRoute><ResponseTeamsPage /></ProtectedRoute>} />
              <Route path="/comms" element={<ProtectedRoute><CommunicationsPage /></ProtectedRoute>} />
              <Route path="/map" element={<ProtectedRoute><SituationMapPage /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute requiredRoles={['admin', 'commander']}><AnalyticsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute requiredRoles={['admin']}><SettingsPage /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
