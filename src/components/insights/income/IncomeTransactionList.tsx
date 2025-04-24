import React, { useCallback } from 'react'; // Removed useMemo as it's not needed for hardcoded data
import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator"; // Separator not needed for this simple list
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp } from "lucide-react"; // Import required icons

// Import shared currency formatter
import { formatCurrencyV1 } from '@/data/goalsBudgetsData'; // Adjust path if needed

// --- Define Local Interface for Hardcoded Data ---
interface SalaryTransaction {
  id: string;
  source: string;
  date: string; // Format: "YYYY-MM-DD"
  amount: number;
  currency: string;
  icon: React.ElementType; // Use Lucide icon component directly
}

// --- Hardcoded Salary Data ---
const hardcodedSalaryHistory: SalaryTransaction[] = [
  { id: "inc_sal_feb", source: "Salary Deposit", date: "2025-02-28", amount: 60000, currency: "SAR", icon: TrendingUp },
  { id: "inc_sal_jan", source: "Salary Deposit", date: "2025-01-31", amount: 55000, currency: "SAR", icon: TrendingUp },
  { id: "inc_sal_dec", source: "Salary Deposit", date: "2024-12-31", amount: 55000, currency: "SAR", icon: TrendingUp },
]; // Already sorted Feb, Jan, Dec

// --- Source Logo/Icon Display (Simplified for Hardcoded Data) ---
// We know the icon is always TrendingUp for this hardcoded list
const SourceLogoDisplay = ({ transaction }: { transaction: SalaryTransaction }) => {
    const SourceIcon = transaction.icon; // Directly use the icon from hardcoded data
    return (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0 overflow-hidden" aria-label={`${transaction.source} icon`}>
            <SourceIcon className="h-5 w-5 text-muted-foreground" />
        </div>
    );
};


// --- Income Transaction List Component ---
export const IncomeTransactionList = () => {
  const navigate = useNavigate();

  // --- Format Date for Salary List (e.g., "February 2025") ---
  const formatSalaryMonthYear = useCallback((dateString: string): string => {
    try {
        const date = new Date(dateString + 'T00:00:00Z'); // Parse as UTC
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString("en-GB", { month: 'long', year: 'numeric', timeZone: 'UTC' });
    } catch (e) {
        console.error("Error formatting salary date:", e);
        return "Invalid Date";
    }
  }, []);


  // --- Navigation ---
   const navigateToDetails = (transactionId: string) => {
       console.log("Navigate to income detail:", transactionId);
       // Define actual navigation if needed
       // navigate(`/income/${transactionId}`);
   };

  return (
    <div>
      <h3 className="text-base font-semibold mb-3">Recent Salary</h3>

      {/* Rendering logic for the hardcoded salary list */}
      <div className="space-y-2">
        {hardcodedSalaryHistory.length > 0 ? (
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    {/* Removed outer divide-y div as CardContent handles padding */}
                    {/* Map directly over the hardcoded array */}
                    {hardcodedSalaryHistory.map((transaction, index) => (
                        <div key={transaction.id} className={index > 0 ? "border-t border-border" : ""}> {/* Add border manually */}
                            <button
                                onClick={() => navigateToDetails(transaction.id)}
                                className="w-full text-left p-3 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between gap-3"
                                aria-label={`View details for ${transaction.source} (${formatSalaryMonthYear(transaction.date)})`}
                            >
                                {/* Left Side: Icon + Info */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {/* Use SourceLogoDisplay */}
                                    <SourceLogoDisplay transaction={transaction} />
                                    {/* Source & Formatted Date */}
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm truncate" title={transaction.source}>{transaction.source}</p>
                                        <p className="text-xs text-muted-foreground">{formatSalaryMonthYear(transaction.date)}</p>
                                    </div>
                                </div>
                                {/* Right Side: Amount */}
                                <span className={`font-medium text-sm shrink-0 ml-2 text-emerald-600`}>
                                    {/* Use shared currency formatter */}
                                    {formatCurrencyV1(transaction.amount, transaction.currency)}
                                </span>
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        ) : (
           <div className="text-center py-6 text-muted-foreground">
              <p className="text-sm">Salary history not available.</p>
           </div>
        )}
      </div>
      {/* --- END: Salary History List --- */}
    </div>
  );
};

// export default IncomeTransactionList; // Uncomment if this is a standalone file
