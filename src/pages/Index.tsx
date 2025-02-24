
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
import OffersCarousel from "@/components/widgets/OffersCarousel";

const Index = () => {
  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNav />
      </div>
      <main className="flex-1 overflow-y-auto pt-16 pb-20 relative">
        <div className="max-w-md mx-auto px-4">
          <AccountsCarousel />
          <QuickActions />
          <SpendingChallengeWidget />
          <SpendingChart />
          <OffersCarousel />
          <RecentTransactions />
          <PayeesCarousel />
          <UpcomingTransactions />
          <TotalWealth />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
