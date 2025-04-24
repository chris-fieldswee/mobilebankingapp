import React, { useMemo, useCallback, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Lucide Icons Imports
import { ChevronLeft, AlertCircle, Target, Wallet, CheckCircle, List, Package, MapPin, CreditCard, CalendarDays, Clock, AlertTriangle, ExternalLink } from "lucide-react";

// Assumed Path - Make sure this component exists and is responsive
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";

// Import data types and functions (adjust path as needed)
import { GoalV1, TransactionV1, findGoalById, findTransactionsByIds, formatCurrencyV1 } from '@/data/goalsBudgetsData';

// --- Internal Component for Logo/Fallback ---
const TransactionLogoDisplay = ({ transaction }: { transaction: TransactionV1 }) => {
    const [imgError, setImgError] = useState(false);

    const renderFallback = useCallback(() => { /* ... fallback logic ... */
        const CategoryIcon = transaction.icon || Package;
        const initials = transaction.merchantName?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';
        const fallbackElement = CategoryIcon !== Package
            ? <CategoryIcon className="h-5 w-5 text-muted-foreground" />
            : <span className="text-sm font-semibold text-muted-foreground">{initials}</span>;
        return ( <div className="w-full h-full flex items-center justify-center" aria-label={`${transaction.merchantName} icon fallback`}> {fallbackElement} </div> );
    }, [transaction.icon, transaction.merchantName]);

    React.useEffect(() => { setImgError(false); }, [transaction.merchantLogoUrl]);

    if (typeof transaction.merchantLogoUrl !== 'string' || !transaction.merchantLogoUrl.trim() || imgError) { return renderFallback(); }

    return ( <img key={transaction.merchantLogoUrl} src={transaction.merchantLogoUrl} alt={`${transaction.merchantName} logo`} className="w-full h-full object-contain" onError={() => { console.warn(`[GoalDetail] Failed to load image: ${transaction.merchantLogoUrl} for merchant: ${transaction.merchantName}`); setImgError(true); }} loading="lazy" /> );
};


// --- Goal Detail Page Component ---
const GoalDetail = () => {
  const { id: goalId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const goal = useMemo(() => { /* ... find goal ... */
    if (!goalId) return undefined;
    return findGoalById(goalId);
   }, [goalId]);

  const relatedTransactions = useMemo(() => { /* ... find transactions ... */
    if (!goal?.relatedTransactionIds) return [];
    const foundTransactions = findTransactionsByIds(goal.relatedTransactionIds);
    return foundTransactions.filter(tx => tx !== undefined).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
   }, [goal]);

  // --- Formatting Helpers ---
   const formatDateForList = useCallback((dateString: string) => { /* ... format date ... */
     try { if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { return dateString; } const date = new Date(dateString + 'T00:00:00Z'); if (isNaN(date.getTime())) return dateString; return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); } catch (e) { return dateString; }
   }, []);

   const formatTime = useCallback((timeString?: string): string => { /* ... format time ... */
    if (!timeString || timeString === "N/A") return ""; try { const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i); if (timeParts) { let hour = parseInt(timeParts[1], 10); const minute = parseInt(timeParts[2], 10); const ampm = timeParts[3]?.toUpperCase(); if (ampm === 'PM' && hour < 12) hour += 12; if (ampm === 'AM' && hour === 12) hour = 0; const timeDate = new Date(); timeDate.setHours(hour, minute, 0, 0); return timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); } return timeString; } catch (e) { return timeString; }
   }, []);

  // --- Navigation ---
  const goBack = () => navigate(-1);
  const navigateToDetails = (transactionId: string | undefined) => { if (transactionId) { navigate(`/transactions/${transactionId}`); } else { console.error("Attempted to navigate to transaction details with undefined ID."); } };

  // --- Loading / Not Found State ---
  if (!goalId) { return <div className="p-4 text-center text-red-600">Error: Goal ID missing.</div>; }
  if (!goal) { /* ... Not found JSX ... */
     return ( <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom"> <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm"> <div className="flex items-center h-14 px-4"> <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button> <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1> </div> </header> <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Goal not found.</p> </div> </div> );
  }

  // --- Data Preparation for Rendering ---
    const { title, currentAmount, targetAmount, currency, deadline } = goal;
    const savedAmount = currentAmount;
    const remainingAmount = Math.max(targetAmount - savedAmount, 0);
    const progress = targetAmount > 0 ? Math.min((savedAmount / targetAmount) * 100, 100) : (savedAmount > 0 ? 100 : 0);
    const isComplete = savedAmount >= targetAmount;
    const progressPercentage = Math.round(progress);


  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">
       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm"> <div className="flex items-center h-14 px-4"> <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button> <h1 className="text-lg font-medium flex-1 truncate pr-2" title={title}>{title}</h1> </div> </header>

       {/* Scrollable Main Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5 pb-16">

            {/* Section 1: Circular Progress */}
             <Card className="p-4 text-center"> {/* Card provides padding */}
                 <div className="flex justify-center">
                     {/* === START: Simplified Responsive Container === */}
                     {/* Let it take full width within card padding, but cap overall size. */}
                     {/* Adjust max-w based on design needs (e.g., 280px, 300px) */}
                     {/* Aspect-square ensures it stays circular based on width */}
                     <div className="relative w-full max-w-[280px] aspect-square mx-auto">
                         {/* The CircularProgressBar component below MUST be responsive itself */}
                         <CircularProgressBar
                            percentage={progressPercentage}
                            strokeWidth={18} // Adjust stroke width as needed
                            availableColor="hsl(var(--muted))"
                            spentColor={isComplete ? "hsl(var(--success))" : "#2463EB"}
                         />
                         {/* Center Content */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 px-2"> {/* Added slightly more padding */}
                             <p className="text-xs sm:text-sm text-muted-foreground text-center leading-tight"> Amount Saved </p>
                             {/* Adjusted text sizes slightly */}
                             <span className="text-xl sm:text-2xl md:text-2xl font-bold text-center break-words">{formatCurrencyV1(savedAmount, currency)}</span>
                             <p className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">
                                {isComplete ? "Target Achieved!" : `${formatCurrencyV1(remainingAmount, currency)} Left`}
                             </p>
                         </div>
                     </div>
                     {/* === END: Simplified Responsive Container === */}
                 </div>
                 {deadline && ( <p className="mt-3 text-xs text-muted-foreground">Target Date: {deadline}</p> )}
            </Card>

            {/* Section 2: Progress Message Card */}
            {/* ... (Card content same as before) ... */}
             <Card className={`p-4 ${isComplete ? 'bg-green-500/10' : 'bg-accent'}`}> <div className="flex gap-3 items-center"> <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border ${isComplete ? 'border-green-200' : 'border-border'}`}> {isComplete ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Target className="h-5 w-5 text-primary" />} </div> <div> <p className="text-sm font-medium"> {isComplete ? `Congratulations! You've reached your goal of ${formatCurrencyV1(targetAmount, currency)}.` : `${progressPercentage}% saved (${formatCurrencyV1(savedAmount, currency)} of ${formatCurrencyV1(targetAmount, currency)})` } </p> {!isComplete && <p className="text-xs text-muted-foreground">Keep contributing to reach your goal!</p>} </div> </div> </Card>

            {/* Section 3: Related Transactions */}
            {/* ... (Card content same as before, using TransactionLogoDisplay) ... */}
            <Card> <CardHeader> <CardTitle className="text-base flex items-center"> <List className="mr-2 h-4 w-4" /> Related Activity </CardTitle> </CardHeader> <CardContent className="p-0"> {relatedTransactions.length > 0 ? ( <div className="divide-y divide-border"> {relatedTransactions.map((transaction) => { if (!transaction) { return null; } const displayAmount = formatCurrencyV1(transaction.amount ?? 0, transaction.currency ?? 'SAR'); const displayDate = formatDateForList(transaction.date); const displayTime = formatTime(transaction.time); return ( <button key={transaction.id} onClick={() => navigateToDetails(transaction.id)} className="w-full text-left p-3 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between gap-3" aria-label={`View details for ${transaction.merchantName || 'transaction'}`} > {/* Left */} <div className="flex items-center gap-3 overflow-hidden"> <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0 overflow-hidden"> <TransactionLogoDisplay transaction={transaction} /> </div> <div className="min-w-0"> <p className="font-medium text-sm truncate" title={transaction.merchantName}>{transaction.merchantName || 'N/A'}</p> <p className="text-xs text-muted-foreground"> {displayDate}{displayTime ? `, ${displayTime}` : ''} </p> </div> </div> {/* Right */} <span className={`font-medium text-sm shrink-0 ml-2 ${transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}> {displayAmount} </span> </button> ); })} </div> ) : ( <p className="text-sm text-muted-foreground px-4 pb-4 pt-3">No related transactions found for this goal.</p> )} </CardContent> </Card>

          </main>
       </ScrollArea>
    </div>
  );
};

export default GoalDetail;