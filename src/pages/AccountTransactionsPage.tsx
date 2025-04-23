// src/pages/AccountTransactionsPage.tsx

import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Added useParams, Link

// Shadcn/ui Imports
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons Imports
import { ChevronLeft, Info, Search, Filter, CreditCard, Receipt } from "lucide-react"; // Added ChevronLeft

// Import data types and functions (adjust path as needed)
import { AccountV1, TransactionV1, findAccountById, findTransactionsByAccountId, formatCurrencyV1, formatDateV1 } from '@/data/goalsBudgetsData';

// Import TransactionItem component (Adjust path as needed)
import TransactionItem from '@/components/transactions/TransactionItem';


// --- Account Transactions Page Component ---
const AccountTransactionsPage = () => {
  const { accountId } = useParams<{ accountId: string }>(); // Get accountId from URL
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // --- Find Account Details ---
  const currentAccount = useMemo(() => {
    if (!accountId) return undefined;
    return findAccountById(accountId);
  }, [accountId]);

  // --- Find and Filter Transactions for this Account ---
  const accountTransactions = useMemo(() => {
    if (!accountId) return [];
    return findTransactionsByAccountId(accountId); // Fetches and sorts
  }, [accountId]);

  // Filter based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) {
      return accountTransactions; // Return all for this account if no query
    }
    // Filter account's transactions
    return accountTransactions.filter(tx =>
      tx.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, accountTransactions]); // Depend on accountTransactions

  // --- Formatting Helpers ---
  // Use shared helper
  const formatCurrency = useCallback((amount: number, currency: string) => {
    return formatCurrencyV1(amount, currency);
  }, []);

  // Date grouping (remains same logic)
  const formatDateForGrouping = useCallback((dateString: string): string => {
     // ... (Keep existing grouping logic: Today, Yesterday, Full Date) ...
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      try {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { throw new Error("Invalid date format"); }
          const transactionDate = new Date(dateString + 'T00:00:00Z'); // Use UTC
          today.setUTCHours(0, 0, 0, 0);
          yesterday.setUTCHours(0, 0, 0, 0);
          transactionDate.setUTCHours(0, 0, 0, 0);

          if (transactionDate.getTime() === today.getTime()) return "Today";
          if (transactionDate.getTime() === yesterday.getTime()) return "Yesterday";
          return transactionDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
      } catch (e) {
           console.error("Error grouping date:", e, dateString)
           return dateString; // Fallback
      }
  }, []);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    // ... (Keep existing grouping logic using filteredTransactions) ...
     const groups: { [key: string]: TransactionV1[] } = {};
     // No need to re-sort here, findTransactionsByAccountId already sorted
     filteredTransactions.forEach(tx => {
       const groupKey = formatDateForGrouping(tx.date);
       if (!groups[groupKey]) { groups[groupKey] = []; }
       groups[groupKey].push(tx);
     });
     // Sort groups: Today, Yesterday, then by date descending
      return Object.entries(groups).sort(([dateA], [dateB]) => {
          if (dateA === "Today") return -1;
          if (dateB === "Today") return 1;
          if (dateA === "Yesterday") return -1;
          if (dateB === "Yesterday") return 1;
          // Attempt to parse back for robust sorting
          try {
              return new Date(dateB).getTime() - new Date(dateA).getTime();
          } catch {
               return dateB.localeCompare(dateA); // Fallback sort
          }
      });
  }, [filteredTransactions, formatDateForGrouping]);

  // --- Loading / Not Found State for Account ---
  if (!accountId) { return <div className="p-4 text-center text-red-600">Error: Account ID missing.</div>; }
  if (!currentAccount) {
    return (
       <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
         <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
           <div className="flex items-center h-14 px-4">
             {/* Allow going back even if account not found */}
             <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
             <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1>
           </div>
         </header>
         <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Account not found.</p> </div>
       </div>
     );
   }


  // --- Main Render ---
  return (
    // Standard V1 Layout (No Top/Bottom Nav assumed for sub-page)
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header (Specific to this page) */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-14 px-4">
            {/* Back button */}
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
           </Button>
           {/* Dynamic Title */}
           <h1 className="text-base font-semibold truncate" title={currentAccount.name}>{currentAccount.name}</h1>
            {/* Optional: Add Filter/Search or other actions */}
            <Button variant="ghost" size="icon" className="ml-auto"> <Search className="h-4 w-4"/> <span className="sr-only">Search</span> </Button>
            <Button variant="ghost" size="icon"> <Filter className="h-4 w-4"/> <span className="sr-only">Filter</span> </Button>
         </div>
       </header>

      {/* Scrollable Content */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
         {/* Use container for padding */}
         <main className="p-4 space-y-4 pb-24">

            {/* Account Summary Card (using data for the specific currentAccount) */}
            <Card>
                <CardContent className="p-4 space-y-3">
                   <div className="flex items-center mb-3">
                      <div className="h-10 w-10 shadow-md rounded-full bg-muted/70 flex items-center justify-center mr-3 overflow-hidden border">
                        {currentAccount.logoUrl ? (
                         <img src={currentAccount.logoUrl} alt={`${currentAccount.name} logo`} className="w-full h-full object-contain p-1" onError={(e) => { e.currentTarget.style.display = 'none'; const f=e.currentTarget.nextSibling as HTMLElement; if(f) f.style.display='flex'; }} />
                        ) : ( /* Fallback if no logoUrl */
                           <CreditCard className="h-5 w-5 text-muted-foreground" />
                        )}
                         {/* Hidden fallback icon */}
                         <div style={{display: 'none'}} className="h-10 w-10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                         </div>
                      </div>
                     <div>
                       <div className="font-medium">{currentAccount.name}</div>
                       <div className="text-xs text-muted-foreground">{currentAccount.accountNumber}</div>
                     </div>
                   </div>
                   {/* Balance Info */}
                   <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Balance</span>
                        {/* Use shared formatCurrencyV1 */}
                        <span className="font-semibold">{formatCurrencyV1(currentAccount.balance, currentAccount.currency)}</span>
                   </div>
                   {currentAccount.availableBalance != null && (
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground">Available Balance</span>
                         <span className="font-semibold">{formatCurrencyV1(currentAccount.availableBalance, currentAccount.currency)}</span>
                       </div>
                   )}
                   {currentAccount.lastUpdated && (
                      <div className="text-xs text-right text-muted-foreground pt-1"> Last updated: {currentAccount.lastUpdated} </div>
                   )}
                </CardContent>
            </Card>

            {/* Quick Actions (Optional for this page) */}
            {/* ... */}

            {/* Transaction Search Input (Optional, could be moved to header) */}
            {/* ... */}


            {/* Transactions List Grouped by Date (Using filtered & grouped data) */}
            <div className="space-y-4">
                {groupedTransactions.length > 0 ? (
                  groupedTransactions.map(([date, dayTransactions]) => (
                    <div key={date}>
                      <div className="flex items-center py-2 sticky top-14 bg-background z-10"> {/* Adjust top based on header height */}
                        <div className="text-sm font-medium text-muted-foreground">{date}</div>
                        <Separator className="ml-4 flex-1" />
                      </div>
                      <Card className="overflow-hidden">
                         <CardContent className="p-0">
                            <div className="divide-y divide-border">
                               {dayTransactions.map(transaction => {
                                    // Use shared formatCurrencyV1
                                    const displayAmount = formatCurrencyV1(transaction.amount, transaction.currency);
                                    // Optional: Use icon from data if TransactionItem supports it
                                    // const IconComponent = transaction.icon;

                                    return (
                                        <TransactionItem
                                            key={transaction.id}
                                            id={transaction.id} // For navigation to transaction detail
                                            merchant={transaction.merchantName}
                                            amount={displayAmount} // Pass formatted string
                                            // Pass date part, not time, for consistency
                                            date={formatDateV1(transaction.date, {month:'short', day:'numeric'})}
                                            // Pass icon component if TransactionItem is updated
                                            // icon={IconComponent}
                                            // Pass amountColor class if TransactionItem is updated
                                            // amountColor={transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'}
                                        />
                                    );
                                })}
                             </div>
                         </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                   <div className="text-center py-12 text-muted-foreground">
                       <Search className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                       <p className="font-medium"> {searchQuery ? "No transactions found for your search." : "No transactions found for this account."} </p>
                       <p className="text-sm"> {searchQuery ? "Try adjusting your search terms." : "Transactions for this account will appear here."} </p>
                   </div>
                )}
            </div>
         </main>
       </ScrollArea>

       {/* No BottomNav needed for sub-page */}
    </div>
  );
};

export default AccountTransactionsPage;