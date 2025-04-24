import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Recharts Imports
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";

// Lucide Icons Imports (Ensure all needed icons are imported)
import { Calendar, Info, ArrowRight, ExternalLink, Activity, CreditCard, Tv, Music, Dumbbell, Package, Briefcase, FileText, Settings, Lightbulb, Car, Utensils, Plane, ShoppingBag, Home, Send, Wallet, Shirt, Heart } from "lucide-react";

// --- Import Data Types & Helpers ---
import {
    AccountV1,
    SubscriptionV1, // Ensure this includes the 'icon' property of type React.ElementType
    mockAccountsV1,
    mockSubscriptionsV1, // Make sure this data includes the Lucide icon component
    generateForecastData,
    findAccountById,
    formatCurrencyV1,
 } from '@/data/goalsBudgetsData'; // Adjust path as needed

 // Type for upcoming transactions - Define the icon type explicitly
 interface UpcomingTransaction {
     id: string;
     date: string;
     description: string;
     amount: number;
     source: "predicted" | "scheduled" | "manual" | "invoice";
     sourceIcon: React.ElementType; // Use ElementType for Lucide icons
 };
 // Interface including parsed date for sorting
 interface ParsedUpcomingTransaction extends UpcomingTransaction { parsedDate: Date; }


// --- Mock Data / Imports ---
// Update mock data to use React.ElementType for icons directly
 const upcomingTransactionsData: UpcomingTransaction[] = [
     { id: "ut1", date: "Apr 28", description: "Salary Deposit", amount: 60000, source: "predicted", sourceIcon: Info }, // Use Info component
     { id: "ut2", date: "May 1", description: "Rent Payment", amount: -5000, source: "scheduled", sourceIcon: Home }, // Use Home component
     { id: "ut6", date: "Apr 24", description: "Invoice #123 Due", amount: -1500, source: "invoice", sourceIcon: FileText }, // Use FileText component
     { id: "ut3", date: "May 10", description: "Gym Membership", amount: -400, source: "predicted", sourceIcon: Dumbbell }, // Use Dumbbell component
     { id: "ut7", date: "Apr 23", description: "Lunch Meeting", amount: -120, source: "manual", sourceIcon: Utensils }, // Use Utensils component
     { id: "ut4", date: "May 15", description: "Electricity Bill", amount: -500, source: "scheduled", sourceIcon: Lightbulb }, // Use Lightbulb component
     { id: "ut5", date: "May 20", description: "Credit Card Payment", amount: -6000, source: "predicted", sourceIcon: CreditCard }, // Use CreditCard component
 ];
 const accounts = mockAccountsV1;
 // Assuming mockSubscriptionsV1 from goalsBudgetsData includes an 'icon' property with Lucide components


// --- Helper: Date Grouping ---
 const currentYear = 2025; // Based on context
 const formatUpcomingDateForGrouping = (dateStr: string, year: number): string => {
    const today = new Date(2025, 3, 23); // April 23, 2025 (Month is 0-indexed)
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const transactionDate = new Date(`${dateStr} ${year}`);
    if (isNaN(transactionDate.getTime())) {
        console.warn("Could not parse upcoming date:", dateStr);
        return "Future";
    }
    transactionDate.setHours(0, 0, 0, 0);

    if (transactionDate.getTime() === today.getTime()) {
        return "Today";
    } else if (transactionDate.getTime() === tomorrow.getTime()) {
        return "Tomorrow";
    } else {
        return transactionDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    }
 };


// Custom Tooltip for AreaChart (Keep as is)
const CustomForecastTooltip = ({ active, payload, label }: any) => {
     if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-lg text-xs">
          <p className="font-medium mb-1">{dataPoint.date}</p>
          <p className="text-primary mb-1">{dataPoint.formattedBalance}</p>
          {dataPoint.transactions?.map((txn: any, i: number) => ( <p key={i} className={`text-muted-foreground ${txn.amount < 0 ? 'text-[#333]' : 'text-[#333]'}`}> {txn.description}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(txn.amount)} </p> ))}
        </div>
      );
    }
    return null;
};


// --- Cashflow Tab Component ---
function CashflowTab() {
  const navigate = useNavigate();
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || "");
  const [forecastPeriod, setForecastPeriod] = useState("30days");

  const selectedAccount = useMemo(() => findAccountById(selectedAccountId), [selectedAccountId]);
  const days = forecastPeriod === "30days" ? 30 : forecastPeriod === "90days" ? 90 : 30;

  const forecastData = useMemo(() => generateForecastData(
    selectedAccount?.balance || 0,
    new Date(2025, 3, 23), // Use current date consistently April 23, 2025
    days
  ), [selectedAccount, days]);

  const minBalanceDataPoint = useMemo(() => {
      if (!forecastData || forecastData.length === 0) return null;
      return forecastData.reduce((min, p) => p.balance < min.balance ? p : min, forecastData[0]);
  }, [forecastData]);

  // Ensure mockSubscriptionsV1 has the 'icon' property
  const subscriptionSummary = useMemo(() => {
    const totalMonthly = mockSubscriptionsV1
        .filter(s => s.frequency === 'Monthly')
        .reduce((sum, sub) => sum + sub.amount, 0);
    const count = mockSubscriptionsV1.length;
    // Ensure preview list items also have the 'icon' property
    const previewList = mockSubscriptionsV1.slice(0, 3);
    return { totalMonthly, count, previewList };
  }, []);


  // Removed handleTransactionClick as items are not clickable
  // const handleTransactionClick = useCallback((id: string) => { ... }, [navigate]);

  const formatListAmount = useCallback((amount: number | undefined, currency = 'SAR', digits = 2) => {
      if (amount === undefined) return '';
      const sign = amount < 0 ? "-" : "";
      return `${sign}${new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(Math.abs(amount))} ${currency}`;
   }, []);


  // --- Group Upcoming Transactions ---
  const groupedUpcomingTransactions = useMemo(() => {
    const groups: { [key: string]: ParsedUpcomingTransaction[] } = {};

    const sortedTransactions: ParsedUpcomingTransaction[] = upcomingTransactionsData
        .map(tx => {
            const parsedDate = new Date(`${tx.date} ${currentYear}`);
            return { ...tx, parsedDate: isNaN(parsedDate.getTime()) ? new Date('9999-12-31') : parsedDate };
        })
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    sortedTransactions.forEach(tx => {
      if (!isNaN(tx.parsedDate.getTime())) {
        const groupKey = formatUpcomingDateForGrouping(tx.date, currentYear);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(tx);
      }
    });

    const sortOrder = ["Today", "Tomorrow"];
    return Object.entries(groups).sort(([keyA], [keyB]) => {
        const indexA = sortOrder.indexOf(keyA);
        const indexB = sortOrder.indexOf(keyB);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        const dateA = groups[keyA][0]?.parsedDate;
        const dateB = groups[keyB][0]?.parsedDate;
        if (dateA && dateB) return dateA.getTime() - dateB.getTime();
        return 0;
    });
  }, []); // Dependency is the static upcomingTransactionsData

  // --- Component Render ---
  return (
    <div className="space-y-6">

      {/* Selectors (Account & Period) */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div>
           <label htmlFor="account-select" className="text-xs text-muted-foreground mb-1 block font-medium">Account</label>
           <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
             <SelectTrigger id="account-select" className="w-full h-9 text-xs sm:text-sm"> <SelectValue placeholder="Select account" /> </SelectTrigger>
             <SelectContent> {accounts.map(account => ( <SelectItem key={account.id} value={account.id} className="text-xs sm:text-sm"> {account.name} ({account.accountNumber}) </SelectItem> ))} </SelectContent>
           </Select>
         </div>
         <div>
           <label htmlFor="period-select" className="text-xs text-muted-foreground mb-1 block font-medium">Forecast Period</label>
           <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
             <SelectTrigger id="period-select" className="w-full h-9 text-xs sm:text-sm"> <SelectValue placeholder="Select period" /> </SelectTrigger>
             <SelectContent>
               <SelectItem value="30days" className="text-xs sm:text-sm">Next 30 Days</SelectItem>
               <SelectItem value="90days" className="text-xs sm:text-sm">Next 90 Days</SelectItem>
             </SelectContent>
           </Select>
         </div>
      </div>


      {/* Balance Projection Chart Card */}
       <Card className="overflow-hidden">
         <CardContent className="p-4 sm:p-6 space-y-3">
           <div className="flex justify-between items-center">
               <h3 className="text-base font-semibold">Balance Projection</h3>
               <span className="text-xs text-muted-foreground">
                 Current: {formatCurrencyV1(selectedAccount?.balance ?? 0, 'SAR')}
               </span>
           </div>
           <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} >
                    <defs> <linearGradient id="cashflowAreaGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.4}/> <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/> </linearGradient> </defs>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 0 }).format(value)} width={40} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <Tooltip content={<CustomForecastTooltip />} cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="balance" stroke="#3B82F6" fillOpacity={1} fill="url(#cashflowAreaGradient)" strokeWidth={2} dot={false} />
                    {minBalanceDataPoint && minBalanceDataPoint.balance < 0 && ( <ReferenceLine y={0} stroke="hsl(var(--destructive))" strokeDasharray="3 3" /> )}
                  </AreaChart>
                </ResponsiveContainer>
           </div>
           {minBalanceDataPoint && (
                <div className={`text-xs p-3 rounded-md ${minBalanceDataPoint.balance < 0 ? 'bg-destructive/10' : 'bg-muted/60'}`}>
                  <p className={`font-medium ${minBalanceDataPoint.balance < 0 ? 'text-destructive' : ''}`}> Lowest projected balance: {formatCurrencyV1(minBalanceDataPoint.balance, 'SAR')} on {minBalanceDataPoint.date} </p>
                  <p className="text-muted-foreground mt-1 text-xs"> Based on scheduled and predicted transactions. </p>
               </div>
           )}
         </CardContent>
       </Card>

      {/* Upcoming Transactions List Grouped by Date */}
       <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Upcoming Transactions</h3>
            <Button variant="ghost" className="text-primary text-sm h-auto p-0">
               See All
            </Button>
         </div>

         <div className="space-y-4">
            {groupedUpcomingTransactions.length > 0 ? (
               groupedUpcomingTransactions.map(([dateGroup, transactionsInGroup]) => (
                  <div key={dateGroup}>
                     <div className="flex items-center py-2 sticky top-0 bg-background z-10">
                        <div className="text-sm font-medium text-muted-foreground">{dateGroup}</div>
                        <Separator className="ml-4 flex-1" />
                     </div>
                     <Card className="overflow-hidden">
                        <CardContent className="p-0">
                           <div className="divide-y divide-border">
                              {transactionsInGroup.map(transaction => {
                                  const IconComponent = transaction.sourceIcon;
                                  return (
                                      // --- UPDATED: Changed button to div, removed interactive props ---
                                      <div
                                          key={transaction.id}
                                          // Removed onClick, role, tabIndex, onKeyDown
                                          className="w-full text-left p-3 sm:p-4 flex items-center justify-between" // Removed hover/focus styles
                                          // Removed aria-label as it's not interactive
                                      >
                                          <div className="flex items-center gap-3 overflow-hidden">
                                              <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full border bg-muted flex-shrink-0">
                                                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                                              </div>
                                              <div className="min-w-0">
                                                  <p className="text-sm font-medium truncate" title={transaction.description}>{transaction.description}</p>
                                                  <p className="text-xs text-muted-foreground capitalize">{transaction.source} transaction</p>
                                              </div>
                                          </div>
                                          <span className={`text-sm font-medium shrink-0 ml-2 ${transaction.amount >= 0 ? 'text-[#333]' : 'text-foreground'}`}>
                                              {formatListAmount(transaction.amount, 'SAR', 2)}
                                          </span>
                                      </div>
                                      // --- END: Update ---
                                  );
                              })}
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               ))
            ) : (
               <Card className="text-center py-12 text-muted-foreground">
                  <CardContent>
                     <Calendar className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                     <p className="font-medium">No upcoming transactions</p>
                     <p className="text-sm">Your scheduled or predicted payments will appear here.</p>
                  </CardContent>
               </Card>
            )}
         </div>
       </div>

      {/* Subscriptions Preview Section */}
       <div>
           <div className="flex justify-between items-center mb-4">
               <h3 className="font-semibold">Subscriptions</h3>
               <Button variant="ghost" className="text-primary text-sm h-auto p-0" onClick={() => navigate('/subscriptions')}>
                   See All
               </Button>
           </div>
           <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                     <h4 className="text-sm font-medium text-muted-foreground">Est. Monthly Cost</h4>
                     <span className="font-semibold text-lg">
                         {formatCurrencyV1(subscriptionSummary.totalMonthly, "SAR")}
                     </span>
                </div>
                <div className="space-y-4 border-t pt-4">
                   {subscriptionSummary.previewList.map(sub => {
                        const IconComponent = sub.icon || Package;
                       return (
                           <div key={sub.id} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 overflow-hidden">
                                     <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0">
                                         <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                                     </div>
                                     <span className="text-sm font-medium truncate pr-1">{sub.name}</span>
                                 </div>
                                 <span className="font-medium text-sm shrink-0 ml-2">
                                     {formatCurrencyV1(sub.amount, sub.currency)}
                                 </span>
                           </div>
                       )
                   })}
               </div>
           </Card>
       </div>

    </div> // End main div
  );
}

export default CashflowTab;
