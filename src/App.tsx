
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import Demo from "./pages/Demo";
import Templates from "./pages/Templates";
import Build from "./pages/Build";
import ReactAppBuilder from "./pages/ReactAppBuilder";
import LandingPageBuilder from "./pages/LandingPageBuilder";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import DashboardBuilder from "./pages/DashboardBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SubscriptionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/build" element={<Build />} />
              <Route path="/build/react-app" element={<ReactAppBuilder />} />
              <Route path="/build/landing-page" element={<LandingPageBuilder />} />
              <Route path="/build/portfolio" element={<PortfolioBuilder />} />
              <Route path="/build/dashboard" element={<DashboardBuilder />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SubscriptionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
