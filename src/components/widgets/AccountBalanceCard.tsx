// src/components/widgets/AccountBalanceCard.tsx

import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface AccountBalanceCardProps {
  name: string;
  balance: number;
  currency: string; // Still expect string, but might receive invalid one
  changePercent: string;
  accountType: "checking" | "savings" | "credit";
  bankLogo?: string;
  className?: string;
  accountId?: string | number;
}

const AccountBalanceCard = ({
  name,
  balance,
  currency, // May be undefined/null/"" from props
  changePercent,
  accountType,
  bankLogo,
  className,
  accountId,
}: AccountBalanceCardProps) => {
  const navigate = useNavigate();

  const isPositive = changePercent ? changePercent.startsWith('+') : true;
  const displayChange = changePercent || "";

  // --- FIX: Validate currency and provide fallback ---
  const validCurrencyCode = (currency && typeof currency === 'string' && currency.trim().length === 3)
                             ? currency.toUpperCase() // Ensure uppercase
                             : 'SAR'; // Default fallback currency
  // --- END FIX ---

  // Format balance using the validated currency code
  const formattedBalance = new Intl.NumberFormat("en-GB", { // Or "en-US" or appropriate locale
    style: "currency",
    currency: validCurrencyCode, // <-- Use validated code
  }).format(balance);

  const handleCardClick = () => {
      if (accountId) {
        navigate(`/accounts/${accountId}/transactions`);
      } else {
        console.warn("Account ID missing for navigation.");
      }
  };

  return (
    <Card
        className={cn("overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col cursor-pointer", className)}
        onClick={handleCardClick}
        role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick()}}
     >
      {/* Card Content (remains the same) */}
      <div className="flex flex-col p-6 sm:p-8 flex-grow">
          {/* ... Top section: logo, name, change % ... */}
           <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {bankLogo && ( <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 border"> <img src={bankLogo} alt={`${name} logo`} className="w-full h-full object-contain" /> </div> )}
                <span className="text-sm font-medium break-words">{name}</span>
              </div>
              {displayChange && ( <div className="flex items-center text-xs shrink-0 ml-2"> <div className={cn( "flex items-center rounded-full px-2 py-1 whitespace-nowrap", isPositive ? "bg-[#235fdf] text-emerald-50" : "bg-[#235fdf] text-red-50" )} > {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1 shrink-0" /> : <ArrowDownRight className="h-3 w-3 mr-1 shrink-0" />} {displayChange} </div> </div> )}
            </div>
          {/* Balance */}
          <div className="flex items-baseline mt-auto pt-2">
             <span className="text-2xl font-semibold">{formattedBalance}</span>
          </div>
      </div>
      {/* Footer */}
       <div className="w-full flex items-center justify-between px-6 sm:px-8 py-3 bg-black/5 group-hover:bg-black/10 transition-colors text-sm shrink-0 border-t" >
         <span>View transactions</span>
         <ChevronRight className="h-4 w-4" />
       </div>
    </Card>
  );
};

export default AccountBalanceCard;