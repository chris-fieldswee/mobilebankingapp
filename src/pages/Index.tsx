
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import AccountsCarousel from "@/components/widgets/AccountsCarousel";
import QuickActions from "@/components/widgets/QuickActions";
import SpendingChallengeWidget from "@/components/widgets/SpendingChallengeWidget";
import SpendingChart from "@/components/widgets/SpendingChart";
import OffersCarousel from "@/components/widgets/OffersCarousel";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import PayeesCarousel from "@/components/widgets/PayeesCarousel";
import UpcomingTransactions from "@/components/transactions/UpcomingTransactions";
import TotalWealth from "@/components/widgets/TotalWealth";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container max-w-md mx-auto px-4 pb-20 pt-4">
        <AccountsCarousel />
        <QuickActions />
        <SpendingChallengeWidget />
        <SpendingChart />
        <OffersCarousel />
        <RecentTransactions />
        <PayeesCarousel />
        <UpcomingTransactions />
        <TotalWealth />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
