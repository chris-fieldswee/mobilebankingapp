import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom"; // Keep these imports

// Page Imports
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
import SplashScreen from "./pages/SplashScreen";
import Accounts from "./pages/Accounts";
import GoalsAndBudgets from './pages/GoalsAndBudgets';
import GoalDetail from './pages/GoalDetail'; // <-- Import GoalDetail
import BudgetDetail from './pages/BudgetDetail'; // <-- Import BudgetDetail

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Routes are defined here, BrowserRouter is in main.tsx */}
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/transactions" element={<Transactions />} />
        {/* Note: Using :id consistent with transactions route */}
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/upcoming-payments" element={<UpcomingPayments />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/search" element={<Search />} />
        <Route path="/platinum-card-offer" element={<PlatinumCardOffer />} />

        {/* Goals & Budgets Routes */}
        <Route path="/goals-budgets" element={<GoalsAndBudgets />} />
        {/* --- UPDATED ROUTES --- */}
        {/* Using :id for consistency */}
        <Route path="/goals/:id" element={<GoalDetail />} />
        <Route path="/budgets/:id" element={<BudgetDetail />} />
        {/* --- END UPDATED ROUTES --- */}
        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;