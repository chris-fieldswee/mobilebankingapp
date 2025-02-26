
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Stories from "./pages/Stories";
import Advisor from "./pages/Advisor";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import UpcomingPayments from "./pages/UpcomingPayments";
import Insights from "./pages/Insights";
import Search from "./pages/Search";
import PlatinumCardOffer from "./pages/PlatinumCardOffer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/upcoming-payments" element={<UpcomingPayments />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/search" element={<Search />} />
        <Route path="/platinum-card-offer" element={<PlatinumCardOffer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
