
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Stories from "./pages/Stories";
import Advisor from "./pages/Advisor";
import Transactions from "./pages/Transactions";
import UpcomingPayments from "./pages/UpcomingPayments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/upcoming-payments" element={<UpcomingPayments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
