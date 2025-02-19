
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import AccountsCarousel from "@/components/widgets/AccountsCarousel";
import QuickActions from "@/components/widgets/QuickActions";
import SpendingChallengeWidget from "@/components/widgets/SpendingChallengeWidget";
import SpendingChart from "@/components/widgets/SpendingChart";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import UpcomingTransactions from "@/components/transactions/UpcomingTransactions";
import PayeesCarousel from "@/components/widgets/PayeesCarousel";
import TotalWealth from "@/components/widgets/TotalWealth";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNav />
      <main className="flex-1 overflow-auto pt-20 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <AccountsCarousel />
          <QuickActions />
          <SpendingChart />
          <SpendingChallengeWidget />
          <RecentTransactions />
          <UpcomingTransactions />
          <PayeesCarousel />
          <TotalWealth />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
