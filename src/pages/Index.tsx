
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
    <div className="flex flex-col h-full bg-background">
      <TopNav />
      <main className="flex-1 overflow-auto">
        <div className="max-w-md mx-auto px-4 py-6">
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
      <BottomNav />
    </div>
  );
};

export default Index;
