// src/pages/SubscriptionsPage.tsx

import React, { useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons Imports
import { ChevronLeft, ArrowRight, PlusCircle } from "lucide-react";

// Import data and types (adjust path as needed)
import { SubscriptionV1, mockSubscriptionsV1, formatCurrencyV1, formatDateV1 } from '@/data/goalsBudgetsData';

// --- Reusable List Item Component ---
interface SubscriptionListItemProps {
  subscription: SubscriptionV1;
  onClick: () => void;
}
const SubscriptionListItem: React.FC<SubscriptionListItemProps> = ({ subscription, onClick }) => {
    const IconComponent = subscription.icon; // Use Lucide Icon if logoUrl fails or isn't present
    return (
        <Card key={subscription.id} className="overflow-hidden">
             <button
                onClick={onClick}
                className="w-full flex items-center p-3 sm:p-4 text-left hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                aria-label={`View details for ${subscription.name}`}
            >
                {/* Logo/Icon */}
                <div className="mr-3 flex-shrink-0">
                    <img
                        src={subscription.logoUrl}
                        alt={`${subscription.name} logo`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain border bg-white" // Added bg-white for transparent pngs
                        onError={(e) => { // Fallback to Lucide icon if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none'; // Hide broken image
                            const fallback = target.nextSibling as HTMLElement;
                            if(fallback) fallback.style.display = 'flex';
                        }}
                    />
                    {/* Fallback Icon (initially hidden) */}
                    <div style={{display: 'none'}} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted border flex items-center justify-center">
                        {IconComponent ? <IconComponent className="w-6 h-6 text-muted-foreground" /> : <span className="text-xl font-semibold text-muted-foreground">{subscription.name[0]}</span>}
                    </div>
                </div>
                 {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base truncate">{subscription.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                       {/* Display amount first */}
                       {formatCurrencyV1(subscription.amount, subscription.currency)} / {subscription.frequency}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                       Next Payment: {formatDateV1(subscription.nextPaymentDate, {month: 'short', day: 'numeric'})} {/* Format date */}
                    </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
            </button>
        </CardContent>
    );
};

// --- Main Subscriptions Page Component ---
const SubscriptionsPage = () => {
  const navigate = useNavigate();

  // Calculate summary
  const summary = useMemo(() => {
    const totalMonthly = mockSubscriptionsV1
        .filter(s => s.frequency === 'Monthly') // Basic filter for monthly
        .reduce((sum, sub) => sum + sub.amount, 0);
    const activeCount = mockSubscriptionsV1.length;
    return { totalMonthly, activeCount };
  }, []);

  return (
    // Standard V1 Page Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="px-4 h-14 flex items-center">
          {/* Back button - adjust link destination */}
          <Link to="/insights">
            <Button variant="ghost" size="icon" className="mr-2 shrink-0">
              <ChevronLeft className="h-5 w-5" />
               <span className="sr-only">Back to Insights</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Subscriptions</h1>
          {/* Optional Add Button */}
          {/* <Button size="sm" variant="outline" className="ml-auto"><PlusCircle className="h-4 w-4 mr-1" /> Add</Button> */}
        </div>
      </header>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5">

             {/* Summary Card */}
            <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base font-medium">Summary</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Monthly Cost:</span>
                      <span className="font-medium">{formatCurrencyV1(summary.totalMonthly, "SAR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Subscriptions:</span>
                      <span className="font-medium">{summary.activeCount} Found</span>
                    </div>
                </CardContent>
            </Card>

             {/* Subscription List */}
            <div className="space-y-3">
                 {mockSubscriptionsV1.map((sub) => (
                    <SubscriptionListItem
                        key={sub.id}
                        subscription={sub}
                        onClick={() => navigate(`/subscriptions/${sub.id}`)} // Navigate to detail page
                    />
                 ))}
            </div>

             {/* Footer Note */}
            <div className="text-center p-4 text-xs text-muted-foreground bg-muted/40 rounded-lg mt-4">
               We identify potential subscriptions based on recurring payments in your transaction history. Review regularly.
            </div>

          </main>
       </ScrollArea>
        {/* No BottomNav */}
    </div>
  );
};

export default SubscriptionsPage;