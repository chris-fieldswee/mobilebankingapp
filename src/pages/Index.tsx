
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import AccountsCarousel from "@/components/widgets/AccountsCarousel";
import QuickActions from "@/components/widgets/QuickActions";
import SpendingChart from "@/components/widgets/SpendingChart";
import SpendingChallengeWidget from "@/components/widgets/SpendingChallengeWidget";
import TotalWealth from "@/components/widgets/TotalWealth";
import OffersCarousel from "@/components/widgets/OffersCarousel";
import PayeesCarousel from "@/components/widgets/PayeesCarousel";
import RecentTransactions from "@/components/transactions/RecentTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container max-w-md mx-auto px-4 pb-20 pt-4">
        <AccountsCarousel />
        <QuickActions />
        <RecentTransactions />
        <SpendingChart />
        <SpendingChallengeWidget />
        <PayeesCarousel />
        <OffersCarousel />
        <TotalWealth />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
