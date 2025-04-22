// src/pages/GoalDetail.tsx

import React, { useMemo, useCallback } from 'react'; // Keep useCallback for formatDateForList
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Lucide Icons Imports
import { ChevronLeft, AlertCircle, Target, Wallet, CheckCircle, List } from "lucide-react";

// Assumed Path - Make sure this component exists
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";

// Import data types and functions (adjust path as needed)
// Ensure formatCurrencyV1 is imported correctly
import { GoalV1, TransactionV1, findGoalById, findTransactionsByIds, formatCurrencyV1 } from '@/data/goalsBudgetsData';

// Import TransactionItem (Adjust path as needed)
import TransactionItem from '@/components/transactions/TransactionItem';


// --- Goal Detail Page Component ---
const GoalDetail = () => {
  const { id: goalId } = useParams<{ id: string }>(); // Use 'id' from route
  const navigate = useNavigate();

  // Find the goal data using the ID
  const goal = useMemo(() => {
    if (!goalId) return undefined;
    return findGoalById(goalId);
  }, [goalId]);

  // --- Find Related Transactions ---
  const relatedTransactions = useMemo(() => {
    if (!goal?.relatedTransactionIds) return [];
    // Sort transactions newest first (optional)
    return findTransactionsByIds(goal.relatedTransactionIds)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [goal]);


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

  // --- Loading / Not Found State ---
  // ... (Keep the existing Not Found logic) ...
  if (!goalId) { return <div className="p-4 text-center text-red-600">Error: Goal ID missing.</div>; }
  if (!goal) { /* ... Not Found JSX ... */
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
        <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Goal not found.</p> </div>
      </div>
    );
  }

  // --- Data Preparation for Rendering ---
  // ... (Keep existing calculations: title, savedAmount, remainingAmount, progress, isComplete, etc.) ...
    const { title, currentAmount, targetAmount, currency, deadline } = goal;
    const savedAmount = currentAmount;
    const remainingAmount = Math.max(targetAmount - savedAmount, 0);
    const progress = targetAmount > 0 ? Math.min((savedAmount / targetAmount) * 100, 100) : 0;
    const isComplete = savedAmount >= targetAmount;
    const progressPercentage = Math.round(progress);


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
           <h1 className="text-lg font-medium flex-1 truncate pr-2" title={title}>{title}</h1>
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
                         <CircularProgressBar percentage={progress} strokeWidth={20} availableColor="hsl(var(--muted))" spentColor={isComplete ? "hsl(var(--success))" : "hsl(var(--primary))"} />
                         <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                             <p className="text-sm text-muted-foreground"> Amount Saved </p>
                             {/* Use formatCurrencyV1 here directly */}
                             <span className="text-3xl font-bold">{formatCurrencyV1(savedAmount, currency)}</span>
                             <p className="text-sm text-muted-foreground"> {isComplete ? "Target Achieved!" : `${formatCurrencyV1(remainingAmount, currency)} Left`} </p>
                         </div>
                     </div>
                 </div>
                 {deadline && ( <p className="mt-3 text-xs text-muted-foreground">Target Date: {deadline}</p> )}
            </Card>


            {/* Section 2: Progress Message Card */}
            {/* ... (Keep existing Progress Message Card JSX) ... */}
             <Card className={`p-4 ${isComplete ? 'bg-green-500/10' : 'bg-accent'}`}>
                 <div className="flex gap-3 items-center">
                     <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border ${isComplete ? 'border-green-200' : 'border-border'}`}>
                         {isComplete ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Target className="h-5 w-5 text-primary" />}
                     </div>
                     <div>
                         {/* Use formatCurrencyV1 here directly */}
                         <p className="text-sm font-medium">
                         {isComplete ? `Congratulations! You've reached your goal of ${formatCurrencyV1(targetAmount, currency)}.` : `${progressPercentage}% saved (${formatCurrencyV1(savedAmount, currency)} of ${formatCurrencyV1(targetAmount, currency)})` }
                         </p>
                     </div>
                 </div>
            </Card>


            {/* --- Section 3: Related Transactions (Updated Logic) --- */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <List className="mr-2 h-4 w-4" /> Related Activity
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
                        <p className="text-sm text-muted-foreground px-4 pb-4">No related transactions found for this goal.</p>
                    )}
                </CardContent>
            </Card>

            {/* Section 4: Optional Actions */}
            {/* ... (Keep existing commented out Actions Card JSX) ... */}

          </main>
       </ScrollArea>
    </div>
  );
};

export default GoalDetail;