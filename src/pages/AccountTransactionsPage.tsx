import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Added useParams, Link

// Shadcn/ui Imports
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Keep if search is added later
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons Imports
import { ChevronLeft, Search, Filter, CreditCard } from "lucide-react"; // Removed unused icons like Info, Receipt

// Import data types and functions (adjust path as needed)
import {
    AccountV1,
    TransactionV1,
    findAccountById,
    findTransactionsByAccountId,
    formatCurrencyV1,
    // formatDateV1 // Keep if used for formatting date outside TransactionItem
} from '@/data/goalsBudgetsData';

// Import TransactionItem component (Adjust path as needed)
// Ensure this path is correct for your project structure
import TransactionItem from '@/components/transactions/TransactionItem';


// --- Account Transactions Page Component ---
const AccountTransactionsPage = () => {
  const { accountId } = useParams<{ accountId: string }>(); // Get accountId from URL
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // --- Find Account Details ---
  const currentAccount = useMemo(() => {
    if (!accountId) return undefined;
    // Add console log for debugging if needed
    // console.log(`[AccountTransactionsPage] Finding account for ID: ${accountId}`);
    const account = findAccountById(accountId);
    // console.log(`[AccountTransactionsPage] Account found:`, account);
    return account;
  }, [accountId]);

  // --- Find Transactions for this Account ---
  const accountTransactions = useMemo(() => {
    if (!accountId) return [];
    // Add console log for debugging if needed
    // console.log(`[AccountTransactionsPage] Finding transactions for account ID: ${accountId}`);
    const transactions = findTransactionsByAccountId(accountId); // Fetches and sorts
    // console.log(`[AccountTransactionsPage] Transactions found: ${transactions.length}`);
    return transactions;
  }, [accountId]);

  // Filter based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) {
      return accountTransactions; // Return all for this account if no query
    }
    const queryLower = searchQuery.toLowerCase().trim();
    // Filter account's transactions
    return accountTransactions.filter(tx =>
      tx.merchantName?.toLowerCase().includes(queryLower) || // Added optional chaining
      tx.category?.toLowerCase().includes(queryLower) // Added optional chaining
    );
  }, [searchQuery, accountTransactions]); // Depend on accountTransactions

  // --- Formatting Helpers ---
  // Date grouping (remains same logic)
  const formatDateForGrouping = useCallback((dateString: string): string => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      try {
          if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
             // console.warn("Invalid date format for grouping:", dateString);
             return "Invalid Date";
          }
          const transactionDate = new Date(dateString + 'T00:00:00Z'); // Use UTC
          if (isNaN(transactionDate.getTime())) {
             // console.warn("Could not parse date for grouping:", dateString);
             return "Invalid Date";
          }
          today.setUTCHours(0, 0, 0, 0);
          yesterday.setUTCHours(0, 0, 0, 0);
          transactionDate.setUTCHours(0, 0, 0, 0);

          if (transactionDate.getTime() === today.getTime()) return "Today";
          if (transactionDate.getTime() === yesterday.getTime()) return "Yesterday";
          // Use a consistent format like the one in TransactionItem or formatDateV1
          return transactionDate.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
      } catch (e) {
           console.error("Error grouping date:", e, dateString)
           return dateString; // Fallback
      }
  }, []);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
     const groups: { [key: string]: TransactionV1[] } = {};
     // Ensure filteredTransactions is an array
     const transactionsToGroup = Array.isArray(filteredTransactions) ? filteredTransactions : [];
     transactionsToGroup.forEach(tx => {
       if (!tx) return; // Skip null/undefined transactions
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
          if (dateA === "Invalid Date") return 1; // Push invalid dates to the bottom
          if (dateB === "Invalid Date") return -1;
          // Attempt to parse back for robust sorting
          try {
              // Assuming formatDateForGrouping returns parseable dates for non-relative ones
              return new Date(dateB).getTime() - new Date(dateA).getTime();
          } catch {
               return dateB.localeCompare(dateA); // Fallback sort
          }
      });
  }, [filteredTransactions, formatDateForGrouping]);

  // --- Loading / Not Found State for Account ---
  if (!accountId) {
      // This state shouldn't ideally be reached if routing is set up correctly,
      // but good as a fallback.
      console.error("[AccountTransactionsPage] Render attempted without accountId.");
      return <div className="p-4 text-center text-red-600">Error: Account ID missing in URL.</div>;
   }
  // Note: Checks currentAccount *after* hooks, ensuring hooks can run
  if (!currentAccount) {
    // This happens if findAccountById returns undefined
    console.warn(`[AccountTransactionsPage] Account data not found for ID: ${accountId}`);
    return (
       <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
         <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
           <div className="flex items-center h-14 px-4">
             <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
             <h1 className="text-lg font-medium flex-1 truncate pr-2">Account Not Found</h1>
           </div>
         </header>
         <div className="flex-1 w-full max-w-md flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">The account details for ID '{accountId}' could not be loaded.</p>
         </div>
       </div>
     );
   }


  // --- Main Render ---
  console.log(`[AccountTransactionsPage] Rendering page for account: ${currentAccount.name}, Found ${accountTransactions.length} total transactions, ${groupedTransactions.length} groups.`);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-14 px-4">
           {/* Back button */}
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
           </Button>
           {/* Dynamic Title */}
           <h1 className="text-base font-semibold truncate" title={currentAccount.name}>{currentAccount.name}</h1>
            {/* Optional: Add Filter/Search or other actions */}
            {/* Consider implementing search/filter functionality here */}
            {/* <Button variant="ghost" size="icon" className="ml-auto"> <Search className="h-4 w-4"/> <span className="sr-only">Search</span> </Button> */}
            {/* <Button variant="ghost" size="icon"> <Filter className="h-4 w-4"/> <span className="sr-only">Filter</span> </Button> */}
         </div>
       </header>

      {/* Scrollable Content */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
         <main className="p-4 space-y-4 pb-24"> {/* Ensure padding bottom for potential floating elements */}

            {/* Account Summary Card */}
            <Card>
                <CardContent className="p-4 space-y-3">
                   <div className="flex items-center mb-3">
                      {/* Account Logo/Icon */}
                      <div className="h-10 w-10 shadow-md rounded-full bg-muted/70 flex items-center justify-center mr-3 overflow-hidden border flex-shrink-0">
                        {currentAccount.logoUrl ? (
                           <img
                              src={currentAccount.logoUrl}
                              alt={`${currentAccount.name} logo`}
                              className="w-full h-full object-contain p-1" // Added slight padding within container
                              onError={(e) => { e.currentTarget.style.display = 'none'; const f=e.currentTarget.nextElementSibling as HTMLElement; if(f) f.style.display='flex'; }}
                              loading="lazy" // Lazy load bank logo
                           />
                        ) : null }
                         {/* Fallback Icon - Shown if no logo OR if img errors */}
                         <div className={`h-full w-full items-center justify-center ${currentAccount.logoUrl ? 'hidden' : 'flex'}`}>
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                         </div>
                      </div>
                      {/* Account Name/Number */}
                      <div className="min-w-0">
                         <div className="font-medium truncate" title={currentAccount.name}>{currentAccount.name}</div>
                         <div className="text-xs text-muted-foreground">{currentAccount.accountNumber}</div>
                      </div>
                   </div>
                   {/* Balance Info */}
                   <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Balance</span>
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

            {/* Consider adding Search Input here */}
            {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9"
                />
            </div> */}


            {/* Transactions List Grouped by Date */}
            <div className="space-y-4">
                {groupedTransactions.length > 0 ? (
                  groupedTransactions.map(([date, dayTransactions]) => (
                    <div key={date}>
                      {/* Date Group Header */}
                      <div className="flex items-center py-2 sticky top-14 bg-background z-10"> {/* Adjust top based on actual header height */}
                        <div className="text-sm font-medium text-muted-foreground">{date}</div>
                        <Separator className="ml-4 flex-1" />
                      </div>
                      {/* Transaction Items Card */}
                      <Card className="overflow-hidden">
                         <CardContent className="p-0">
                            <div className="divide-y divide-border">
                               {/* Ensure dayTransactions is an array before mapping */}
                               {Array.isArray(dayTransactions) && dayTransactions.map(transaction => {
                                    // Check if transaction object is valid
                                    if (!transaction || !transaction.id) {
                                        console.warn("Skipping invalid transaction object:", transaction);
                                        return null; // Skip rendering if transaction is invalid
                                    }
                                    // ***** MODIFIED PART *****
                                    // Pass the entire transaction object to TransactionItem
                                    return (
                                        <TransactionItem
                                            key={transaction.id}
                                            transaction={transaction} // Pass the full object
                                        />
                                    );
                                    // ***** END MODIFIED PART *****
                                })}
                             </div>
                         </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                   // No Transactions Message
                   <div className="text-center py-12 text-muted-foreground">
                       <Search className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                       <p className="font-medium">
                           {searchQuery
                               ? "No transactions match your search."
                               : "No transactions found for this account."
                           }
                       </p>
                       <p className="text-sm">
                           {searchQuery
                               ? "Try adjusting your search terms."
                               : "Transactions for this account will appear here."
                           }
                       </p>
                   </div>
                )}
            </div>
         </main>
       </ScrollArea>

       {/* No BottomNav usually needed for a sub-page like this */}
    </div>
  );
};

export default AccountTransactionsPage;