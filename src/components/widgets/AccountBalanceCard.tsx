import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom"; // Added for button navigation

interface AccountBalanceCardProps {
  name: string;
  balance: number;
  currency: string;
  changePercent: string; // Expects prop for percentage string like "+2.3%"
  accountType: "checking" | "savings" | "credit";
  bankLogo?: string;
  className?: string;
  // Add accountId if needed for navigation
  accountId?: string | number;
}

const AccountBalanceCard = ({
  name,
  balance,
  currency,
  changePercent, // Use changePercent
  accountType,
  bankLogo,
  className,
  accountId, // Destructure accountId if added
}: AccountBalanceCardProps) => {
  const navigate = useNavigate(); // Initialize navigate

  // Determine positive/negative from the changePercent string
  const isPositive = changePercent ? changePercent.startsWith('+') : true;
  const displayChange = changePercent || ""; // Display the string directly

  // Use consistent locale for formatting
  const formattedBalance = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(balance);

  const handleViewTransactions = () => {
      // Navigate to the transactions page (potentially filtered by account later)
      // If you pass accountId, you can use it like: navigate(`/transactions?accountId=${accountId}`);
      navigate('/transactions');
  };


  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col", className)}> {/* Added flex flex-col */}
      {/* Main content div with p-8 padding - Added flex-grow */}
      <div className="flex flex-col p-8 flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* Bank logo and name */}
          <div className="flex items-center gap-2">
            {bankLogo && (
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/30 flex items-center justify-center shrink-0"> {/* Added shrink-0 */}
                    <img src={bankLogo} alt={`${name} logo`} className="w-full h-full object-contain" /> {/* Adjusted img classes */}
                </div>
            )}
            {/* Allow name to wrap if long */}
            <span className="text-sm font-medium break-words">{name}</span>
          </div>
          {/* Percentage Change Display */}
          {displayChange && (
             <div className="flex items-center text-xs shrink-0 ml-2"> {/* Added shrink-0 and ml-2 */}
               <div
                 className={cn(
                   "flex items-center rounded-full px-2 py-1 whitespace-nowrap", // Added whitespace-nowrap
                   isPositive ? "bg-emerald-400/30 text-emerald-50" : "bg-red-400/30 text-red-50"
                 )}
               >
                 {isPositive ? (
                   <ArrowUpRight className="h-3 w-3 mr-1 shrink-0" /> // Added shrink-0
                 ) : (
                   <ArrowDownRight className="h-3 w-3 mr-1 shrink-0" /> // Added shrink-0
                 )}
                 {displayChange}
               </div>
             </div>
          )}
        </div>
        {/* Balance Display */}
        <div className="flex items-baseline mt-auto pt-2"> {/* Push balance towards bottom */}
          <span className="text-2xl font-semibold">{formattedBalance}</span>
        </div>
      </div>
      {/* View Transactions Button - Kept padding */}
      <button
         className="w-full flex items-center justify-between px-8 py-3 bg-black/10 hover:bg-black/20 transition-colors text-sm shrink-0" // Added shrink-0
         onClick={handleViewTransactions}
      >
        <span>View transactions</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </Card>
  );
};

export default AccountBalanceCard;