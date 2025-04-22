import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import TransactionItem from "@/components/transactions/TransactionItem"; // Assuming path and props
import TopNav from "@/components/navigation/TopNav"; // Assuming path
import BottomNav from "@/components/navigation/BottomNav"; // Assuming path
import { Info, Search, Filter, CreditCard, Receipt } from "lucide-react"; // Removed ChevronLeft, Link as they weren't used directly here
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
// Import icons used in mock data
import {
  Utensils, ShoppingCart, BookOpen, Car, Gift,
  ShoppingBag, TrendingUp // Removed Clapperboard, Landmark as they weren't used in mock data
} from "lucide-react";

// --- Define structure for Account Data ---
interface Account {
  id: string; // Added ID for navigation
  bankLogo?: string; // Optional, as there's a fallback image/icon
  name: string;
  accountNumber: string; // Masked account number
  balance: number;
  currency: string;
  availableBalance?: number; // Optional property
  lastUpdated?: string; // Optional property
}

// --- Define structure for Transactions (already defined) ---
interface MockTransaction {
  id: string;
  icon: React.ElementType; // Keep using ElementType for direct icon component usage if needed elsewhere
  merchantName: string;
  amount: number;
  date: string; // Format: YYYY-MM-DD
  time: string;
  category: string;
  currency: string;
  type: "expense" | "income";
}

// --- Mock Account Data (Replace with actual data source/prop later) ---
const currentAccount: Account = {
  id: "sab-premier-123", // Example unique ID for this account
  bankLogo: "/bank-logos/1.png", // Example path to bank logo (ensure this file exists or use null/undefined)
  name: "SAB Premier Current",
  accountNumber: "SA **** **** **** **1234",
  balance: 15250.75,
  currency: "SAR",
  availableBalance: 14890.50,
};

// --- Mock Transaction Data (already defined) ---
const accountTransactions: MockTransaction[] = [
    { id: "t10", icon: Utensils, merchantName: "Hungerstation", amount: -75.00, date: "2025-04-22", time: "1:10 PM", category: "Food & Drink", currency: "SAR", type: "expense" },
    { id: "t1", icon: ShoppingCart, merchantName: "Panda Hypermarket", amount: -285.50, date: "2025-04-22", time: "11:05 AM", category: "Groceries", currency: "SAR", type: "expense" },
    { id: "t2", icon: BookOpen, merchantName: "Jarir Bookstore", amount: -190.00, date: "2025-04-21", time: "4:15 PM", category: "Shopping", currency: "SAR", type: "expense" },
    { id: "t11", icon: Car, merchantName: "SASCO", amount: -150.00, date: "2025-04-20", time: "2:30 PM", category: "Transport", currency: "SAR", type: "expense" },
    { id: "t12", icon: Gift, merchantName: "Amazon.sa", amount: -310.00, date: "2025-04-19", time: "N/A", category: "Shopping", currency: "SAR", type: "expense" },
    { id: "t5", icon: Car, merchantName: "Riyadh Air", amount: -2800.00, date: "2025-04-18", time: "9:00 AM", category: "Travel", currency: "SAR", type: "expense" },
    { id: "t6", icon: ShoppingBag, merchantName: "Harvey Nichols", amount: -8800.00, date: "2025-04-15", time: "6:30 PM", category: "Shopping - Luxury", currency: "SAR", type: "expense" },
    { id: "t7", icon: TrendingUp, merchantName: "Salary Deposit", amount: 60000.00, date: "2025-03-25", time: "9:00 AM", category: "Income", currency: "SAR", type: "income" }
];

// --- Transactions Component ---
const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // --- Helper Function: Format Currency ---
  const formatCurrency = useCallback((amount: number, currency: string) => {
    const absAmount = Math.abs(amount);
    const formattedAmount = absAmount.toLocaleString("en-US", { // Example formatting, adjust as needed
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // Basic currency symbol handling, expand if needed
    const symbol = currency === "SAR" ? " SAR" : ` ${currency}`; // Add space before symbol
    const sign = amount < 0 ? "-" : (amount > 0 && currency !== "SAR" ? "+" : ""); // Optional plus for income if needed

    return {
        amount: formattedAmount,
        symbol: symbol,
        sign: sign
    };
  }, []);

  // --- Helper Function: Format Date for Grouping ---
  const formatDateForGrouping = useCallback((dateString: string): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const transactionDate = new Date(dateString);

    // Reset time components for accurate date comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    transactionDate.setHours(0, 0, 0, 0);

    if (transactionDate.getTime() === today.getTime()) {
      return "Today";
    } else if (transactionDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      // Example: "April 20, 2025" - adjust format as desired
      return transactionDate.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }, []);

  // --- Filtered Transactions ---
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) {
      return accountTransactions; // Return all if no query
    }
    return accountTransactions.filter(tx =>
      tx.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) // Optional: search category too
      // Add more fields to search if needed (e.g., amount)
    );
  }, [searchQuery]); // Dependency is only searchQuery

  // --- Grouped Transactions ---
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: MockTransaction[] } = {};

    // Sort transactions by date descending before grouping
    const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    sortedTransactions.forEach(tx => {
      const groupKey = formatDateForGrouping(tx.date);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tx);
    });

    // Convert the groups object into an array of [key, value] pairs
    // Sort the groups so "Today", "Yesterday" appear first, then older dates
    return Object.entries(groups).sort(([dateA], [dateB]) => {
        if (dateA === "Today") return -1;
        if (dateB === "Today") return 1;
        if (dateA === "Yesterday") return -1;
        if (dateB === "Yesterday") return 1;
        // For other dates, sort chronologically descending (newest first)
        // This requires converting the formatted date string back to a comparable format,
        // or relying on the initial sort order of transactions.
        // Since Object.entries doesn't guarantee order based on insertion,
        // we rely on the fact that we processed sorted transactions.
        // A more robust sort might be needed if keys weren't "Today"/"Yesterday".
        // For now, we assume the processing order is sufficient for date strings.
        // If specific date string sorting is needed, parse them back to Date objects.
        return new Date(dateB).getTime() - new Date(dateA).getTime(); // Sort date strings descending
    });
  }, [filteredTransactions, formatDateForGrouping]); // Dependencies

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />

      <ScrollArea className="flex-1">
        <main className="container max-w-md mx-auto px-4 py-6 space-y-4 pb-24"> {/* Consistent padding */}

          {/* --- Account Summary Card --- */}
          <Card>
            <CardContent className="p-4 space-y-3"> {/* Increased spacing slightly */}
               <div className="flex items-center mb-3">
                 <div className="h-10 w-10 shadow-md rounded-full bg-muted/70 flex items-center justify-center mr-3 overflow-hidden"> {/* Added overflow hidden */}
                   {currentAccount.bankLogo ? (
                     // Added error handling for image loading
                     <img
                        src={currentAccount.bankLogo}
                        alt={`${currentAccount.name} logo`} // More descriptive alt text
                        className="w-full h-full object-contain" // Use contain or cover based on logo aspect ratio
                        onError={(e) => {
                            // Replace with fallback icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none'; // Hide broken image
                            // Optionally show a fallback element sibling, or change state
                        }}
                     />
                     // Consider adding a sibling CreditCard icon here that's initially hidden
                     // and shown in onError if you want a visual fallback on error.
                   ) : (
                     <CreditCard className="h-5 w-5 text-muted-foreground" /> // Fallback icon with color
                   )}
                 </div>
                 <div>
                   <div className="font-medium">{currentAccount.name}</div>
                   <div className="text-xs text-muted-foreground">{currentAccount.accountNumber}</div>
                 </div>
               </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Balance</span>
                <span className="font-semibold"> {/* Use semibold for emphasis */}
                    {formatCurrency(currentAccount.balance, currentAccount.currency).sign}
                    {formatCurrency(currentAccount.balance, currentAccount.currency).amount}
                    {formatCurrency(currentAccount.balance, currentAccount.currency).symbol}
                </span>
              </div>
              {/* Check specifically for undefined OR null */}
              {currentAccount.availableBalance != null && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Balance</span>
                  <span className="font-semibold"> {/* Use semibold */}
                      {formatCurrency(currentAccount.availableBalance, currentAccount.currency).sign}
                      {formatCurrency(currentAccount.availableBalance, currentAccount.currency).amount}
                      {formatCurrency(currentAccount.availableBalance, currentAccount.currency).symbol}
                  </span>
                </div>
              )}
              {currentAccount.lastUpdated && ( // Only show if lastUpdated exists
                 <div className="text-xs text-right text-muted-foreground pt-1">
                   Last updated: {currentAccount.lastUpdated}
                 </div>
              )}
            </CardContent>
          </Card>

          {/* --- Transactions List Grouped by Date --- */}
          <div className="space-y-4">
            {groupedTransactions.length > 0 ? (
              groupedTransactions.map(([date, dayTransactions]) => (
                <div key={date}>
                  {/* Group Header */}
                  <div className="flex items-center py-2 sticky top-0 bg-background z-10"> {/* Make header sticky */}
                    <div className="text-sm font-medium text-muted-foreground">{date}</div>
                    <Separator className="ml-4 flex-1" />
                  </div>
                   {/* Transactions for the day */}
                  <Card className="overflow-hidden"> {/* Subtle shadow */}
                     <CardContent className="p-0">
                        <div> {/* Use themed divider */}
                           {dayTransactions.map(transaction => {
                                const formatted = formatCurrency(transaction.amount, transaction.currency);
                                // Ensure sign is included for expenses, optional for income
                                const displayAmount = `${formatted.sign}${formatted.amount}${formatted.symbol}`;
                                const amountColor = transaction.type === "income" ? "text-emerald-600 font-medium" : "text-foreground"; // Make income stand out more

                                return (
                                    <TransactionItem
                                        key={transaction.id}
                                        // Pass necessary props to TransactionItem. Adapt based on its definition.
                                        // Assuming TransactionItem needs category or icon component:
                                        // icon={transaction.icon} // If TransactionItem expects the Lucide icon component
                                        merchant={transaction.merchantName}
                                        amount={displayAmount}
                                        date={transaction.time !== "N/A" ? transaction.time : ""} // Show time if available
                                        id={transaction.id}
                                        // Add onClick to navigate to transaction details if needed
                                        // onClick={() => navigate(`/transactions/${transaction.id}`)}
                                    />
                                );
                            })}
                         </div>
                     </CardContent>
                  </Card>
                </div>
              ))
            ) : (
               <div className="text-center py-12 text-muted-foreground"> {/* Increased padding */}
                  <Search className="mx-auto h-8 w-8 mb-2 text-gray-400" /> {/* Added icon */}
                  <p className="font-medium">
                     {searchQuery ? "No results found" : "No transactions yet"}
                   </p>
                  <p className="text-sm">
                      {searchQuery ? "Try adjusting your search terms." : "Your transactions will appear here."}
                  </p>
               </div>
            )}
          </div>
        </main>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

// No need for helper declarations outside the component anymore

export default Transactions;