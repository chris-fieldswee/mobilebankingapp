// src/pages/SubscriptionDetail.tsx

import React, { useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Lucide Icons Imports
import { ChevronLeft, Calendar, Repeat, ExternalLink, Wallet } from "lucide-react";

// Import data types and functions (adjust path as needed)
import { SubscriptionDetailV1, findSubscriptionDetailById, formatCurrencyV1, formatDateV1 } from '@/data/goalsBudgetsData';

// --- Subscription Detail Page Component ---
const SubscriptionDetail = () => {
  const { id: subscriptionId } = useParams<{ id: string }>(); // Use 'id' from route
  const navigate = useNavigate();

  // Find the subscription data using the ID
  const subscription = useMemo(() => {
    if (!subscriptionId) return undefined;
    return findSubscriptionDetailById(subscriptionId);
  }, [subscriptionId]);

  // --- Navigation ---
  const goBack = () => navigate(-1); // Go back to subscriptions list

  // --- Loading / Not Found State ---
  if (!subscriptionId) { return <div className="p-4 text-center text-[#333]">Error: Subscription ID missing.</div>; }
  if (!subscription) {
     return (
       <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
         <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
           <div className="flex items-center h-14 px-4">
             <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
             <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1>
           </div>
         </header>
         <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Subscription not found.</p> </div>
       </div>
     );
   }

  // --- Data Prep ---
  const { name, amount, currency, frequency, logoUrl, icon: IconComponent, nextPaymentDate, totalPaidLast12Months, paymentHistory } = subscription;

  return (
    // Standard V1 Page Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-14 px-4">
           <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
           </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2">{name} Subscription</h1>
         </div>
       </header>

       {/* Scrollable Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5">

            {/* Subscription Summary Card */}
            <Card className="overflow-hidden">
                <CardContent className="p-4">
                   <div className="flex items-center mb-4">
                      {/* Logo/Icon */}
                      <div className="mr-4 flex-shrink-0">
                         <img src={logoUrl} alt={`${name} logo`} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-contain border bg-white"
                           onError={(e) => {
                               const target = e.target as HTMLImageElement;
                               target.style.display = 'none';
                               const fallback = target.nextSibling as HTMLElement;
                               if(fallback) fallback.style.display = 'flex';
                           }}
                         />
                         <div style={{display: 'none'}} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-muted border flex items-center justify-center">
                           {IconComponent ? <IconComponent className="w-8 h-8 text-muted-foreground" /> : <span className="text-2xl font-semibold text-muted-foreground">{name[0]}</span>}
                         </div>
                      </div>
                      {/* Details */}
                      <div className="min-w-0">
                         <h2 className="text-lg sm:text-xl font-semibold truncate">{name}</h2>
                         <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                           <Repeat className="h-3 w-3"/> {formatCurrencyV1(amount, currency)} / {frequency}
                         </div>
                         <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="h-3 w-3"/> Next payment: {formatDateV1(nextPaymentDate, {month: 'short', day: 'numeric'})}
                         </div>
                      </div>
                   </div>
                    {/* Total Paid */}
                   {totalPaidLast12Months !== undefined && (
                     <div className="text-center border-t pt-3 mt-3">
                        <p className="text-xs text-muted-foreground">Total Paid (Last 12 Months)</p>
                        <p className="text-lg font-semibold">{formatCurrencyV1(totalPaidLast12Months, currency)}</p>
                     </div>
                   )}
                </CardContent>
            </Card>

            {/* Payment History Card */}
            {paymentHistory && paymentHistory.length > 0 && (
                <Card>
                    <CardHeader className="pb-2 pt-4">
                        <CardTitle className="text-base font-medium">Payment History</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 px-0">
                        <div className="space-y-0 divide-y">
                            {paymentHistory.map((payment, index) => (
                                <div key={index} className="px-4 py-2.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{formatDateV1(payment.date)}</span>
                                        {/* Assume payments are always negative for subscriptions */}
                                        <span className="text-sm font-medium text-[#333]">-{formatCurrencyV1(payment.amount, currency)}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                      <Wallet className="h-3 w-3"/> {payment.account}
                                    </div>
                                </div>
                            ))}
                        </div>
                         {/* Optional: View More Button */}
                         {/* <Button variant="link" size="sm" className="w-full mt-2">View More History</Button> */}
                    </CardContent>
                </Card>
            )}

            {/* Manage Subscription */}
            <div className="pt-2">
                <Button variant="outline" className="w-full justify-center gap-2">
                    Manage Subscription <ExternalLink className="h-4 w-4"/>
                 </Button>
                 {/* Optional: Cancel/Pause Buttons */}
                 {/* <Button variant="destructive" className="w-full mt-2">Cancel Subscription</Button> */}
            </div>

          </main>
       </ScrollArea>
    </div>
  );
};

export default SubscriptionDetail;