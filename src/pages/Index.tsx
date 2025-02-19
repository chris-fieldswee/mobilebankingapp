
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountsCarousel from "@/components/widgets/AccountsCarousel";
import QuickActions from "@/components/widgets/QuickActions";
import SpendingChallengeWidget from "@/components/widgets/SpendingChallengeWidget";
import SpendingChart from "@/components/widgets/SpendingChart";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import UpcomingTransactions from "@/components/transactions/UpcomingTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <TopNav />
      
      <ScrollArea className="h-[calc(100vh-120px)] mt-14">
        <main className="max-w-md mx-auto px-4 py-6">
          <AccountsCarousel />
          <QuickActions />
          <SpendingChallengeWidget />
          <SpendingChart />
          <RecentTransactions />
          <UpcomingTransactions />
        </main>
      </ScrollArea>
      
      <BottomNav />
    </div>
  );
};

export default Index;
