import { PlusCircle, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNav from "@/components/navigation/BottomNav"; // Verify this path

// --- Interface Definition (Keep as is) ---
interface Account {
  id: string; // Simplified to string as only strings are used in data
  logo: string; // Path to the logo image
  title: string;
  amount: number;
  symbol: string;
  accountType?: "checking" | "savings" | "credit";
  institution?: string;
  accountNumber?: string;
}

// --- Updated Mock Data with Specific Logos ---
const accountsData: Account[] = [
  // Assuming mapping: SABB=1, Al Rajhi=2, Riyad Bank=3, SNB=4
  { id: "acc1", logo: "/bank-logos/1.png", title: "SAB Current Account", amount: 45000, symbol: "SAR", accountType: 'checking', institution: 'SABB', accountNumber: '****1234' },
  { id: "acc2", logo: "/bank-logos/2.png", title: "Al Rajhi Current Account", amount: 12500, symbol: "SAR", accountType: 'checking', institution: 'Al Rajhi Bank', accountNumber: '****4321' },
  { id: "acc3", logo: "/bank-logos/3.png", title: "Riyad Bank Current Account", amount: 25000, symbol: "SAR", accountType: 'checking', institution: 'Riyad Bank', accountNumber: '****1122' },
  { id: "acc4", logo: "/bank-logos/4.png", title: "SNB Savings Account", amount: 78000, symbol: "SAR", accountType: 'savings', institution: 'Saudi National Bank', accountNumber: '****9870' },
];

// --- Helper Functions (Keep as is) ---
const getTypeIcon = (type?: Account["accountType"]) => {
  switch (type) {
    case "checking": return "💳";
    case "savings": return "💰";
    case "credit": return "💸";
    default: return "💵";
  }
};

// --- Accounts Component ---
const Accounts = () => {
  const navigate = useNavigate();

  const totalAssets = accountsData.reduce((sum, account) => sum + account.amount, 0);

  const formatCurrency = useCallback((amount: number, currency: string) => {
     const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency', currency: currency,
     });
     return formatter.format(amount);
  }, []);

  // --- FIXED NAVIGATION FUNCTION ---
  const navigateToAccountDetail = (accountId: string) => { // Use string for id based on data
    console.log("Navigate to details/transactions for account:", accountId);
    // Construct the dynamic route using the accountId
    navigate(`/accounts/${accountId}/transactions`); // <-- FIX: Use the accountId in the path
  };

  const navigateToLinkAccount = () => {
      navigate('/link-bank');
  };

  const navigateHome = () => {
      navigate('/dashboard');
  };


  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">

       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-16 px-4">
           <Button variant="ghost" size="icon" onClick={navigateHome} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" />
             <span className="sr-only">Back to Home</span>
           </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2">Accounts</h1>
           <div className="flex gap-2 shrink-0">
                {/* --- ADDED onClick HANDLER --- */}
                <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1 h-8 text-primary px-2"
                    onClick={navigateToLinkAccount} // <-- FIX: Added onClick
                >
                      <PlusCircle className="h-4 w-4" />
                      <span>Link Account</span>
                </Button>
            </div>
         </div>
       </header>

       <ScrollArea className="flex-1 w-full max-w-md">
          <main className="px-4 py-6 space-y-6 pb-24">

            {/* Total Assets Summary */}
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total Assets</span>
                  <span className="text-2xl font-semibold">
                    {formatCurrency(totalAssets, "SAR")}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* List of Accounts */}
            <div className="space-y-3">
              {accountsData.map((account) => (
                <Card key={account.id} className="overflow-hidden hover:bg-accent/50 transition-colors">
                  <CardContent className="p-0">
                    <button
                      className="w-full flex items-center p-4 text-left"
                      onClick={() => navigateToAccountDetail(account.id)} // Passes correct id
                      aria-label={`View details for ${account.title}`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-lg mr-4 overflow-hidden">
                         <img src={account.logo} alt={`${account.institution || 'Bank'} logo`} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{account.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {account.institution || 'Bank'} • {account.accountNumber || '****'}
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="font-medium">
                          {formatCurrency(account.amount, account.symbol)}
                        </div>
                        <div className="text-xs capitalize text-muted-foreground">
                          {account.accountType || 'Account'}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-2 shrink-0" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
       </ScrollArea>

        <div className="w-full max-w-md sticky bottom-0 z-10">
            <BottomNav />
        </div>

    </div>
  );
};

export default Accounts;