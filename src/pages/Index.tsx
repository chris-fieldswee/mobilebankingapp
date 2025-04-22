import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import AccountsCarousel from "@/components/widgets/AccountsCarousel";
import QuickActions from "@/components/widgets/QuickActions";
import SpendingChallengeWidget from "@/components/widgets/SpendingChallengeWidget";
import SpendingChart from "@/components/widgets/SpendingChart";
import OffersCarousel from "@/components/widgets/OffersCarousel";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import UpcomingTransactions from "@/components/transactions/UpcomingTransactions";
import TotalWealth from "@/components/widgets/TotalWealth";
import { BalanceNotice } from "@/components/insights/cashflow/BalanceNotice"; // Assuming path

// Define an interface for the account data structure
interface Account {
  id: number;
  logo: string; // Path to placeholder or actual logo
  title: string; // e.g., "SAB Current Account"
  amount: number; // Store as number for calculations
  symbol: string; // e.g., "SAR"
}

// Define the account data for the 4 banks
// Using balances from spec where available, placeholder for Riyad Bank
const accountsData: Account[] = [
  { id: 1, logo: "/bank-logos/1.png", title: "SAB Current Account", amount: 45000, symbol: "SAR" }, // Primary
  { id: 2, logo: "/bank-logos/4.png", title: "Al Rajhi Current Account", amount: 12500, symbol: "SAR" },
  { id: 3, logo: "/bank-logos/3.png", title: "Riyad Bank Current Account", amount: 25000, symbol: "SAR" }, // Placeholder balance
  { id: 4, logo: "/bank-logos/2.png", title: "SNB Savings Account", amount: 78000, symbol: "SAR" },
];

const Index = () => {
  // Calculate total balance from the accountsData
  const totalBalance = accountsData.reduce((sum, account) => sum + account.amount, 0);

  // Choose a tagline
  const tagline = "Your finances, all in one place.";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-0">
        <TopNav />
        <main className="px-4 py-8 bg-white space-y-6">
           {/* Greeting and Tagline */}
           <div>
             <h1 className="text-3xl">
               Hello, <span className="font-semibold">Ahmed!</span>
             </h1>
             <p className="text-muted-foreground mt-1">{tagline}</p>
           </div>

          {/* Accounts Section */}
          <div className="space-y-3">
              {/* Header for Accounts section */}
              <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">My Accounts</h2>
                  {/* Link Account Button */}
                  <Button size="sm" variant="ghost" className="flex items-center gap-1 h-8 text-primary px-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>Link Account</span>
                  </Button>
              </div>
              {/* Pass accounts data to the Carousel/Scroller */}
              <AccountsCarousel accounts={accountsData} />
          </div>

          {/* Other Widgets */}
          <BalanceNotice />
          <RecentTransactions />
          <SpendingChart />
          <OffersCarousel />
          <SpendingChallengeWidget />
          <UpcomingTransactions />
          {/* Pass calculated total balance to the TotalWealth component */}
          <TotalWealth totalAggregatedBalance={totalBalance} />

        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;