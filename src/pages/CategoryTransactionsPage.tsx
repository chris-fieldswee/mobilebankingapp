import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Package, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Import Data & Helpers ---
import {
    mockAllTransactionsV1,
    TransactionV1,
    formatCurrencyV1,
} from '@/data/goalsBudgetsData'; // Adjust path as needed

// --- Internal Component for Logo/Fallback ---
const MerchantLogoDisplay = ({ transaction }: { transaction: TransactionV1 }) => {
    const [imgError, setImgError] = useState(false);

    const renderFallback = useCallback(() => {
        const CategoryIcon = transaction.icon || Package;
        const initials = transaction.merchantName?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';
        const fallbackElement = CategoryIcon !== Package
            ? <CategoryIcon className="h-5 w-5 text-muted-foreground" />
            : <span className="text-sm font-semibold text-muted-foreground">{initials}</span>;
        return (
            <div className="w-full h-full flex items-center justify-center" aria-label={`${transaction.merchantName} icon fallback`}>
                {fallbackElement}
            </div>
        );
    }, [transaction.icon, transaction.merchantName]);

    useEffect(() => {
        setImgError(false);
    }, [transaction.merchantLogoUrl]);


    if (typeof transaction.merchantLogoUrl !== 'string' || !transaction.merchantLogoUrl.trim() || imgError) {
        return renderFallback();
    }

    return (
        <img
            key={transaction.merchantLogoUrl}
            src={transaction.merchantLogoUrl}
            alt={`${transaction.merchantName} logo`}
            className="w-full h-full object-contain"
            onError={() => {
                console.warn(`[CategoryTransactionsPage] Failed to load image: ${transaction.merchantLogoUrl} for merchant: ${transaction.merchantName}`);
                setImgError(true);
            }}
            loading="lazy"
        />
    );
};


// --- Category Transactions Page Component ---
const CategoryTransactionsPage = () => {
  const navigate = useNavigate();
  const { categoryName: encodedCategoryName } = useParams<{ categoryName: string }>();
  const categoryName = useMemo(() => encodedCategoryName ? decodeURIComponent(encodedCategoryName) : undefined, [encodedCategoryName]);

  const categoryTransactions = useMemo(() => {
    if (!categoryName) return [];
    return mockAllTransactionsV1.filter(tx =>
      tx.category.toLowerCase() === categoryName.toLowerCase()
    );
  }, [categoryName]);

  const formatDateForGrouping = useCallback((dateString: string): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return "Invalid Date";
    const transactionDate = new Date(dateString + 'T00:00:00Z');
    if (isNaN(transactionDate.getTime())) return "Invalid Date";
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    transactionDate.setHours(0, 0, 0, 0);
    if (transactionDate.getTime() === today.getTime()) return "Today";
    if (transactionDate.getTime() === yesterday.getTime()) return "Yesterday";
    return transactionDate.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  }, []);

   const formatTime = useCallback((timeString?: string): string => {
    if (!timeString || timeString === "N/A") return "";
    try {
        const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (timeParts) {
            let hour = parseInt(timeParts[1], 10);
            const minute = parseInt(timeParts[2], 10);
            const ampm = timeParts[3]?.toUpperCase();
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
            const timeDate = new Date();
            timeDate.setHours(hour, minute, 0, 0);
            return timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        }
        return timeString;
    } catch (e) { return timeString; }
   }, []);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: TransactionV1[] } = {};
    const sortedTransactions = [...categoryTransactions].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00:00'}`);
        const dateB = new Date(`${b.date}T${b.time || '00:00:00'}`);
        return dateB.getTime() - dateA.getTime();
    });
    sortedTransactions.forEach(tx => {
      const groupKey = formatDateForGrouping(tx.date);
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(tx);
    });
    return Object.entries(groups).sort(([dateA], [dateB]) => {
        if (dateA === "Today") return -1; if (dateB === "Today") return 1;
        if (dateA === "Yesterday") return -1; if (dateB === "Yesterday") return 1;
        try {
            const realDateA = new Date(dateA); const realDateB = new Date(dateB);
            if (!isNaN(realDateA.getTime()) && !isNaN(realDateB.getTime())) return realDateB.getTime() - realDateA.getTime();
        } catch (e) {}
        if (dateA < dateB) return 1; if (dateA > dateB) return -1; return 0;
    });
  }, [categoryTransactions, formatDateForGrouping]);

   const navigateToDetails = (transactionId: string) => {
       navigate(`/transactions/${transactionId}`);
   };

   const goBack = () => {
       navigate(-1);
   }

  // --- Render ---
  return (
    // Use h-screen and overflow-hidden on the main container if needed,
    // but flex-col should handle layout with sticky header and scroll area.
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur-sm">
          <div className="container max-w-md mx-auto px-4 h-16 flex items-center"> {/* Fixed height h-16 */}
              <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
              </Button>
              <h1 className="text-lg font-medium truncate">
                  {categoryName || "Category"} Transactions
              </h1>
          </div>
      </header>

      {/* Scrollable Area - Pushed down below the header */}
      {/* --- FIXED: Added mt-16 to ScrollArea --- */}
      <ScrollArea className="flex-1 mt-8">
        {/* Remove top padding from main as ScrollArea now has margin */}
        <main className="container max-w-md mx-auto px-4 pb-6 space-y-4"> {/* Removed py-6, added pb-6 */}
          {/* Transactions List Grouped by Date */}
          <div className="space-y-4">
            {groupedTransactions.length > 0 ? (
              groupedTransactions.map(([date, dayTransactions]) => (
                <div key={date}>
                  {/* --- FIXED: Group Header sticky top-0 relative to ScrollArea --- */}
                  <div className="flex items-center py-2 sticky top-0 bg-background z-10"> {/* Changed top-16 to top-0 */}
                    <div className="text-sm font-medium text-muted-foreground">{date}</div>
                    <Separator className="ml-4 flex-1" />
                  </div>
                  {/* Transactions for the day */}
                  <Card className="overflow-hidden">
                     <CardContent className="p-0">
                        <div className="divide-y divide-border">
                           {dayTransactions.map(transaction => (
                                <button
                                    key={transaction.id}
                                    onClick={() => navigateToDetails(transaction.id)}
                                    className="w-full text-left p-3 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between gap-3"
                                    aria-label={`View details for ${transaction.merchantName}`}
                                >
                                    {/* Left Side: Logo/Icon + Info */}
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0 overflow-hidden">
                                            <MerchantLogoDisplay transaction={transaction} />
                                        </div>
                                        {/* Merchant & Time */}
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate" title={transaction.merchantName}>{transaction.merchantName}</p>
                                            <p className="text-xs text-muted-foreground">{formatTime(transaction.time)}</p>
                                        </div>
                                    </div>
                                    {/* Right Side: Amount */}
                                    <span className={`font-medium text-sm shrink-0 ml-2 ${transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}>
                                        {formatCurrencyV1(transaction.amount, transaction.currency)}
                                    </span>
                                </button>
                            ))}
                         </div>
                     </CardContent>
                  </Card>
                </div>
              ))
            ) : (
               <div className="text-center py-12 text-muted-foreground">
                  <Search className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  <p className="font-medium">No transactions found for this category.</p>
                  {categoryName && <p className="text-sm">Category: {categoryName}</p>}
               </div>
            )}
          </div>
        </main>
      </ScrollArea>
      {/* Optional: <BottomNav /> */}
    </div>
  );
};

export default CategoryTransactionsPage;
