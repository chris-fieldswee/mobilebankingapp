// src/pages/BudgetDetail.tsx

import React, { useMemo, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Keep Badge if used elsewhere
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"; // Keep Separator if used elsewhere

// Lucide Icons Imports
import { ChevronLeft, AlertCircle, Coins, List, CheckCircle, Target } from "lucide-react";

// Assumed Path - Make sure this component exists and is responsive
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";

// Import data types and functions (adjust path as needed)
import { BudgetV1, TransactionV1, findBudgetById, findTransactionsByCategory, formatCurrencyV1 } from '@/data/goalsBudgetsData';

// Import TransactionItem (Adjust path as needed)
import TransactionItem from '@/components/transactions/TransactionItem'; // Ensure path is correct


// --- Budget Detail Page Component ---
const BudgetDetail = () => {
  const { id: budgetId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the budget data using the ID
  const budget = useMemo(() => {
    if (!budgetId) return undefined;
    return findBudgetById(budgetId);
  }, [budgetId]);

  // --- Find Related Transactions by Category ---
  const relatedTransactions = useMemo(() => {
    if (!budget?.category) return [];
    const transactions = findTransactionsByCategory(budget.category, 10); // Limit to 10 recent
    return Array.isArray(transactions) ? transactions.filter(tx => tx !== undefined) : [];
  }, [budget]);

  // --- Formatting Helpers ---
   const formatDateForList = useCallback((dateString: string) => {
     try {
       if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { return dateString; }
       const date = new Date(dateString + 'T00:00:00Z');
       if (isNaN(date.getTime())) return dateString;
       return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
     } catch (e) { return dateString; }
   }, []);

  // --- Navigation ---
  const goBack = () => navigate(-1);

  // --- Loading / Not Found State ---
   if (!budgetId) { return <div className="p-4 text-center text-red-600">Error: Budget ID missing.</div>; }
   if (!budget) {
     // ... Not Found JSX (same as before) ...
     return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
        <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-14 px-4"> <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button> <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1> </div>
        </header>
        <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Budget not found.</p> </div>
      </div>
    );
   }

  // --- Data Preparation for Rendering ---
    const { category, allocated, spent, currency, period, icon: BudgetIcon = Target } = budget;
    const remainingBudget = Math.max(allocated - spent, 0);
    const progress = allocated > 0 ? Math.min((spent / allocated) * 100, 100) : (spent > 0 ? 100 : 0);
    const isOverBudget = spent > allocated;
    const utilizationPercentage = Math.round(progress);

  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-14 px-4">
           <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2 flex items-center gap-2" title={`${category} (${period})`}>
             <BudgetIcon className="h-5 w-5 text-muted-foreground shrink-0"/>
             {category}
             <span className="text-sm font-normal text-muted-foreground">({period})</span>
           </h1>
         </div>
       </header>

       {/* Scrollable Main Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5 pb-16">

            {/* Section 1: Circular Progress */}
             <Card className="p-4 text-center">
                 <div className="flex justify-center">
                      {/* === START: Responsive Container Update === */}
                      {/* Use w-full, aspect-square, mx-auto and max-w- constraint */}
                      {/* This relies on CircularProgressBar being internally responsive */}
                      <div className="relative w-full max-w-[280px] aspect-square mx-auto">
                         <CircularProgressBar
                           percentage={utilizationPercentage}
                           strokeWidth={18} // Consistent stroke width
                           availableColor="hsl(var(--muted))"
                           // Use destructive color if over budget
                           spentColor={isOverBudget ? "hsl(var(--destructive))" : "#2463eb"}
                          />
                         {/* Center Content - Use same text styling as GoalDetail */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 px-2">
                             <p className="text-xs sm:text-sm text-muted-foreground text-center leading-tight"> Amount Remaining </p>
                             <span className={`text-xl sm:text-2xl md:text-2xl font-bold text-center break-words ${isOverBudget ? 'text-destructive' : ''}`}>
                               {formatCurrencyV1(remainingBudget, currency)}
                             </span>
                             <p className={`text-xs sm:text-sm text-center leading-tight ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                               {isOverBudget ? `${formatCurrencyV1(spent - allocated, currency)} Over` : "Remaining"}
                             </p>
                         </div>
                      </div>
                      {/* === END: Responsive Container Update === */}
                 </div>
                  <p className="mt-3 text-xs text-muted-foreground">Budget Allocated: {formatCurrencyV1(allocated, currency)}</p>
             </Card>

            {/* Section 2: Budget Message Card */}
             <Card className={`p-4 ${isOverBudget ? 'bg-destructive/10' : 'bg-accent'}`}>
                 <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border ${isOverBudget ? 'border-destructive/30' : 'border-border'}`}>
                         {isOverBudget ? <AlertCircle className="h-5 w-5 text-destructive" /> : <CheckCircle className="h-5 w-5 text-green-600" />}
                     </div>
                     <div>
                         <p className="text-sm font-medium">
                           {isOverBudget
                               ? `You are ${formatCurrencyV1(spent - allocated, currency)} over budget.`
                               : `${utilizationPercentage}% used (${formatCurrencyV1(remainingBudget, currency)} remaining).`
                           }
                         </p>
                         {!isOverBudget && allocated > 0 && <p className="text-xs text-muted-foreground">You're within your {category} budget.</p>}
                     </div>
                 </div>
             </Card>

            {/* Section 3: Transactions in Category */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center">
                       <List className="mr-2 h-4 w-4" /> Recent Activity in '{category}'
                    </CardTitle>
                </CardHeader>
                 <CardContent className="p-0">
                    {relatedTransactions.length > 0 ? (
                         <div className="divide-y divide-border">
                            {relatedTransactions.map((transaction) => {
                                if (!transaction || !transaction.id) return null;
                                return (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction} // Pass the full object
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground px-4 pb-4 pt-3">No recent transactions found in this category.</p>
                    )}
                </CardContent>
            </Card>

            {/* Optional Actions Section */}
            {/* ... */}

          </main>
       </ScrollArea>
    </div>
  );
};

export default BudgetDetail;