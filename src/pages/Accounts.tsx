import { PlusCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNav from "@/components/navigation/BottomNav"; // Verify this path

// --- Interface Definition ---
interface Account {
  id: string;
  logo: string;
  title: string;
  amount: number;
  symbol: string;
  accountType?: "checking" | "savings" | "credit"; // Keep in interface for potential future use
  institution?: string;
  accountNumber?: string;
}

// --- Mock Data ---
const accountsData: Account[] = [
  { id: "acc1", logo: "/bank-logos/1.png", title: "SAB Current Account", amount: 45000, symbol: "SAR", accountType: 'checking', institution: 'SABB', accountNumber: '****1234' },
  { id: "acc2", logo: "/bank-logos/2.png", title: "Al Rajhi Current Account", amount: 12500, symbol: "SAR", accountType: 'checking', institution: 'Al Rajhi Bank', accountNumber: '****4321' },
  { id: "acc3", logo: "/bank-logos/3.png", title: "Riyad Bank Current Account", amount: 25000, symbol: "SAR", accountType: 'checking', institution: 'Riyad Bank', accountNumber: '****1122' },
  { id: "acc4", logo: "/bank-logos/4.png", title: "SNB Savings Account", amount: 78000, symbol: "SAR", accountType: 'savings', institution: 'Saudi National Bank', accountNumber: '****9870' },
];


// --- Accounts Component ---
const Accounts = () => {
  const navigate = useNavigate();

  const totalAssets = accountsData.reduce((sum, account) => sum + account.amount, 0);

  // Currency Formatter
  const formatCurrency = useCallback((amount: number, currency: string) => {
     const formatter = new Intl.NumberFormat('en-SA', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
     });
     const numAmount = Number(amount);
     if (isNaN(numAmount)) return `0.00 ${currency}`;
     return `${formatter.format(numAmount)} ${currency}`;
  }, []);

  // Navigation Functions
  const navigateToAccountDetail = (accountId: string) => {
    navigate(`/accounts/${accountId}/transactions`);
  };
  const navigateToLinkAccount = () => { navigate('/link-bank'); };
  const navigateHome = () => { navigate('/dashboard'); };


  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">

       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-16 px-4">
           <Button variant="ghost" size="icon" onClick={navigateHome} className="mr-2 shrink-0" aria-label="Back to Home"> <ChevronLeft className="h-5 w-5" /> </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2">Accounts</h1>
           <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="ghost" className="flex items-center gap-1 h-8 text-primary px-2" onClick={navigateToLinkAccount} >
                      <PlusCircle className="h-4 w-4" />
                      <span className="text-sm sm:inline">Link Account</span>
                </Button>
            </div>
         </div>
       </header>

       {/* Scrollable Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md">
          <main className="px-4 py-6 space-y-6 pb-24">

            {/* Total Assets Summary */}
            <Card className="bg-white border-primary/10"> <CardContent className="p-4"> <div className="flex flex-col"> <span className="text-sm text-muted-foreground">Total Assets</span> <span className="text-2xl font-semibold"> {formatCurrency(totalAssets, "SAR")} </span> </div> </CardContent> </Card>

            {/* List of Accounts - REDESIGNED CARDS v2 */}
            <div className="space-y-3">
              {accountsData.map((account) => (
                <Card key={account.id} className="overflow-hidden hover:bg-accent/50 transition-colors">
                  <CardContent className="p-0 bg-white">
                    {/* Button wrapper for the entire card content */}
                    <button
                      className="w-full flex flex-col p-4 text-left" // Use flex-col, standard padding
                      onClick={() => navigateToAccountDetail(account.id)}
                      aria-label={`View account details for ${account.title}`}
                    >
                      {/* --- TOP ROW (Logo, Title, Subtitle) --- */}
                      <div className="flex items-center w-full mb-2"> {/* Spacing below top row */}
                        {/* Logo */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border mr-3 overflow-hidden">
                           <img src={account.logo} alt={`${account.institution || 'Bank'} logo`} className="w-full h-full object-contain p-1" loading="lazy"/>
                        </div>
                        {/* Account Info (Title & Subtitle) */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-sm">{account.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {account.institution || 'Bank'} • {account.accountNumber || '****'}
                          </div>
                        </div>
                        {/* Chevron Removed from Top Row */}
                      </div>

                      {/* --- BOTTOM ROW (Amount & Chevron) --- */}
                      <div className="w-full pl-[52px] flex justify-between items-center mt-1"> {/* Indent content, align items center */}
                         {/* Account Amount (Aligned Left within this container) */}
                         <div className="font-semibold text-base whitespace-nowrap">
                            {formatCurrency(account.amount, account.symbol)}
                         </div>
                         {/* Chevron (Aligned Right within this container) */}
                         <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                      </div>
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
       </ScrollArea>

       {/* Sticky Bottom Navigation */}
        <div className="w-full max-w-md sticky bottom-0 z-10">
            <BottomNav />
        </div>

    </div>
  );
};

export default Accounts;