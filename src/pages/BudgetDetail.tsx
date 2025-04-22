// src/pages/BudgetDetail.tsx

import React, { useMemo, useCallback } from 'react'; // Keep useCallback for formatDateForList
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Ensure CardDescription is imported if used
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Lucide Icons Imports
import { ChevronLeft, AlertCircle, Coins, ListFilter, List, CheckCircle, Target, ExternalLink } from "lucide-react"; // Added missing icons from potential usage

// Assumed Path - Make sure this component exists
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";

// Import data types and functions (adjust path as needed)
// Ensure formatCurrencyV1 is imported correctly
import { BudgetV1, TransactionV1, findBudgetById, findTransactionsByCategory, formatCurrencyV1 } from '@/data/goalsBudgetsData';

// Import TransactionItem (Adjust path as needed)
import TransactionItem from '@/components/transactions/TransactionItem';


// --- Budget Detail Page Component ---
const BudgetDetail = () => {
  const { id: budgetId } = useParams<{ id: string }>(); // Use 'id' from route
  const navigate = useNavigate();

  // Find the budget data using the ID
  const budget = useMemo(() => {
    if (!budgetId) return undefined;
    return findBudgetById(budgetId);
  }, [budgetId]);

  // --- Find Related Transactions by Category ---
  const relatedTransactions = useMemo(() => {
    if (!budget?.category) return [];
    // Find transactions matching the budget category, limit to e.g., 10 most recent
    return findTransactionsByCategory(budget.category, 10);
  }, [budget]);


  // --- Formatting Helpers ---
   // REMOVED local formatCurrency useCallback hook - use formatCurrencyV1 from import

   const formatDateForList = useCallback((dateString: string) => {
    // Simple date format for list items
     try {
       // Ensure dateString is YYYY-MM-DD format
       if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          throw new Error("Invalid date format");
       }
       const date = new Date(dateString + 'T00:00:00Z');
       return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
     } catch (e) {
       console.error("Error formatting list date:", e, dateString);
       return dateString; // Fallback
     }
   }, []);

  // --- Navigation ---
  const goBack = () => navigate(-1);

  const openMapLink = () => { /* ... Keep map link logic if needed ... */ };

  // --- Loading / Not Found State ---
  // ... (Keep the existing Not Found logic) ...
   if (!budgetId) { return <div className="p-4 text-center text-red-600">Error: Budget ID missing.</div>; }
   if (!budget) { /* ... Not Found JSX ... */
     return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
        <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-14 px-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
              <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1>
          </div>
        </header>
        <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Budget not found.</p> </div>
      </div>
    );
   }

  // --- Data Preparation for Rendering ---
  // ... (Keep existing calculations: category, allocated, spent, remaining, progress, etc.) ...
    const { category, allocated, spent, currency, period } = budget;
    const remainingBudget = Math.max(allocated - spent, 0);
    const progress = allocated > 0 ? Math.min((spent / allocated) * 100, 100) : 0;
    const isOverBudget = spent > allocated;
    const utilizationPercentage = Math.round(progress);

  // --- Main Component Render ---
  return (
    // Standard V1 Page Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         {/* ... Header JSX ... */}
          <div className="flex items-center h-14 px-4">
           <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
           </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2" title={`${category} (${period})`}>{category} <span className="text-sm font-normal text-muted-foreground">({period})</span></h1>
         </div>
       </header>

       {/* Scrollable Main Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5">

            {/* Section 1: Circular Progress */}
            {/* ... (Keep existing Circular Progress Card JSX) ... */}
             <Card className="p-4 text-center">
                 <div className="flex justify-center">
                      <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
                         <CircularProgressBar percentage={progress} strokeWidth={20} availableColor="hsl(var(--muted))" spentColor={isOverBudget ? "hsl(var(--destructive))" : "hsl(var(--primary))"} />
                         <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                             <p className="text-sm text-muted-foreground"> Amount Remaining </p>
                             {/* Use formatCurrencyV1 here directly */}
                             <span className={`text-3xl font-bold ${isOverBudget ? 'text-red-600' : ''}`}> {formatCurrencyV1(remainingBudget, currency)} </span>
                             <p className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}> {isOverBudget ? `${formatCurrencyV1(spent - allocated, currency)} Over Budget` : "Remaining"} </p>
                         </div>
                     </div>
                 </div>
                  {/* Use formatCurrencyV1 here directly */}
                  <p className="mt-3 text-xs text-muted-foreground">Budget Allocated: {formatCurrencyV1(allocated, currency)}</p>
             </Card>

            {/* Section 2: Budget Message Card */}
            {/* ... (Keep existing Budget Message Card JSX) ... */}
             <Card className={`p-4 ${isOverBudget ? 'bg-red-500/10' : 'bg-accent'}`}>
                 <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border ${isOverBudget ? 'border-red-200' : 'border-border'}`}>
                         {isOverBudget ? <AlertCircle className="h-5 w-5 text-red-600" /> : <Coins className="h-5 w-5 text-primary" />}
                     </div>
                     <div>
                        {/* Use formatCurrencyV1 here directly */}
                         <p className="text-sm font-medium">
                         {isOverBudget ? `You are ${formatCurrencyV1(spent - allocated, currency)} over your budget of ${formatCurrencyV1(allocated, currency)}.` : `${utilizationPercentage}% used (${formatCurrencyV1(remainingBudget, currency)} remaining of ${formatCurrencyV1(allocated, currency)})` }
                         </p>
                     </div>
                 </div>
             </Card>

            {/* --- Section 3: Transactions in Category (Updated Logic) --- */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center">
                       <List className="mr-2 h-4 w-4" /> Recent Transactions in '{category}'
                    </CardTitle>
                </CardHeader>
                 <CardContent className="p-0">
                    {relatedTransactions.length > 0 ? (
                         <div className="divide-y divide-border">
                            {relatedTransactions.map((transaction) => {
                                // *** FIXED: Use formatCurrencyV1 directly ***
                                const displayAmount = formatCurrencyV1(transaction.amount, transaction.currency);
                                const displayDate = formatDateForList(transaction.date); // Format date for list

                                return (
                                    <TransactionItem
                                        key={transaction.id}
                                        id={transaction.id}
                                        merchant={transaction.merchantName}
                                        amount={displayAmount} // <-- Pass correctly formatted string
                                        date={displayDate}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground px-4 pb-4">No recent transactions found for this category.</p>
                    )}
                </CardContent>
            </Card>

             {/* Section 4: Optional Actions */}
            {/* ... (Keep existing commented out Actions Card JSX if desired) ... */}

          </main>
       </ScrollArea>
    </div>
  );
};

export default BudgetDetail;