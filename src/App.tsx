import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import CareerConsultation from "./pages/CareerConsultation";
import RoadmapGeneration from "./pages/RoadmapGeneration";
import ScheduleIntegration from "./pages/ScheduleIntegration";
import ResourceLibrary from "./pages/ResourceLibrary";
import AITutorChat from "./pages/AITutorChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/career-consultation" element={<CareerConsultation />} />
          <Route path="/roadmap" element={<RoadmapGeneration />} />
          <Route path="/schedule" element={<ScheduleIntegration />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/ai-tutor" element={<AITutorChat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
