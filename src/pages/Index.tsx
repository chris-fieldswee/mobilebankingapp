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
import { BalanceNotice } from "@/components/insights/cashflow/BalanceNotice";
// --- Use the IMPORTED AccountV1 type and mock data ---
import { AccountV1, mockAccountsV1 } from '@/data/goalsBudgetsData'; // Adjust path if needed

const Index = () => {
  // Calculate total balance from the IMPORTED mockAccountsV1 data
  const totalBalance = mockAccountsV1.reduce((sum, account) => sum + account.balance, 0);
  const tagline = "Your finances, all in one place.";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-0 flex flex-col min-h-screen">
        <TopNav />
         <main className="px-4 py-6 bg-white space-y-6 flex-1">
           {/* Greeting and Tagline */}
           <div>
             <h1 className="text-3xl"> Hello, <span className="font-semibold">Ahmed!</span> </h1>
             <p className="text-muted-foreground mt-1">{tagline}</p>
           </div>

          {/* Accounts Section */}
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">My Accounts</h2>
                  <Button size="sm" variant="ghost" className="flex items-center gap-1 h-8 text-primary px-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>Link Account</span>
                  </Button>
              </div>
              {/* --- Pass mockAccountsV1 directly --- */}
              {/* Assuming AccountsCarousel now expects AccountV1[] */}
              <AccountsCarousel accounts={mockAccountsV1} />
          </div>

          {/* Other Widgets */}
           <BalanceNotice />
           <RecentTransactions />
           <SpendingChart />
           <OffersCarousel />
           <SpendingChallengeWidget />
           <UpcomingTransactions />
           <TotalWealth totalAggregatedBalance={totalBalance} />

        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;