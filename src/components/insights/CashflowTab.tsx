// src/components/insights/CashflowTab.tsx (Or relevant path)

import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom"; // Keep for potential navigation from list items

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Keep if needed for status/tags
import { ChartContainer } from "@/components/ui/chart"; // Keep if used by AreaChart implicitly

// Recharts Imports
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";

// Lucide Icons Imports
import { Calendar, Info, AlertTriangle } from "lucide-react"; // Icons for upcoming transaction sources

// --- V2 Data Structures & Logic Adapted for V1 Cashflow Tab ---

// V2 Accounts Data (Adapted to SAR example)
const accounts = [
  { id: "acc1", name: "SABB Current Account", accountNumber: "****1234", balance: 36650 },
  { id: "acc2", name: "Al Rajhi Current", accountNumber: "****4321", balance: 55000 },
  { id: "acc3", name: "SABB Savings Account", accountNumber: "****5678", balance: 900000 },
  { id: "acc4", name: "SNB Savings", accountNumber: "****9870", balance: 250000 },
];

// V2 Forecast Data Generation Logic (Adapted to SAR)
const generateForecastData = (startBalance: number, startDate: Date, days: number) => {
  const data = [];
  let currentBalance = startBalance;
  const currency = 'SAR'; // Using SAR

  // Define major transactions (Example - adapt dates/amounts as needed)
  // Dates use JS Date(year, monthIndex, day) format
  const majorTransactions = [
    { date: new Date(2025, 3, 28), description: "Salary Deposit", amount: 60000 }, // Apr 28
    { date: new Date(2025, 4, 1), description: "Rent Payment", amount: -5000 }, // May 1
    { date: new Date(2025, 4, 10), description: "Gym Membership", amount: -400 }, // May 10
    { date: new Date(2025, 4, 15), description: "Electricity Bill", amount: -500 }, // May 15
    { date: new Date(2025, 4, 20), description: "Credit Card Payment", amount: -6000 }, // May 20
    { date: new Date(2025, 4, 25), description: "Tuition Fee - MBSC", amount: -80000 }, // May 25 (Moved from Feb)
    { date: new Date(2025, 4, 28), description: "Salary Deposit", amount: 60000 }, // May 28
    // Add more relevant future transactions for the forecast period
  ];

  // Generate daily balance data
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Apply major transactions ONLY for dates *after* the start date for forecast
    const todaysTransactions = majorTransactions.filter(t =>
        t.date >= startDate && // Only consider future transactions for forecast impact
        t.date.toDateString() === currentDate.toDateString() // Compare date part only
    );

    let dailyChange = 0;
    todaysTransactions.forEach(transaction => {
        dailyChange += transaction.amount;
    });

    // Apply daily change (simplified - V2 had minor random fluctations)
    currentBalance += dailyChange;

    data.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Math.round(currentBalance),
      formattedBalance: new Intl.NumberFormat('en-US', { // Use desired locale
        style: 'currency', currency: currency, maximumFractionDigits: 0
      }).format(Math.round(currentBalance)),
      // Store transactions for tooltip/markers
      transactions: todaysTransactions.length > 0 ? todaysTransactions : undefined
    });
  }
  return data;
};

// V2 Upcoming Transactions Structure (Adapted to SAR)
interface UpcomingTransaction {
  id: string;
  date: string; // Formatted Date (e.g., "Apr 28")
  description: string;
  amount: number;
  source: "predicted" | "scheduled" | "manual" | "invoice";
  sourceIcon: React.ReactNode;
}

// Example Upcoming Transactions (Match forecast major transactions)
const upcomingTransactions: UpcomingTransaction[] = [
    { id: "ut1", date: "Apr 28", description: "Salary Deposit", amount: 60000, source: "predicted", sourceIcon: <Info className="h-3.5 w-3.5 text-blue-500" /> },
    { id: "ut2", date: "May 1", description: "Rent Payment", amount: -5000, source: "scheduled", sourceIcon: <Calendar className="h-3.5 w-3.5 text-green-500" /> },
    { id: "ut3", date: "May 10", description: "Gym Membership", amount: -400, source: "predicted", sourceIcon: <Info className="h-3.5 w-3.5 text-blue-500" /> },
    { id: "ut4", date: "May 15", description: "Electricity Bill", amount: -500, source: "invoice", sourceIcon: <Calendar className="h-3.5 w-3.5 text-purple-500" /> }, // Using different icon color for source
    { id: "ut5", date: "May 20", description: "Credit Card Payment", amount: -6000, source: "scheduled", sourceIcon: <Calendar className="h-3.5 w-3.5 text-green-500" /> },
    { id: "ut6", date: "May 25", description: "Tuition Fee - MBSC", amount: -80000, source: "manual", sourceIcon: <Calendar className="h-3.5 w-3.5 text-amber-500" /> },
    { id: "ut7", date: "May 28", description: "Salary Deposit", amount: 60000, source: "predicted", sourceIcon: <Info className="h-3.5 w-3.5 text-blue-500" /> },
];

// Custom Tooltip for AreaChart
const CustomForecastTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload; // Access the full data point object
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-lg text-xs">
          <p className="font-medium mb-1">{dataPoint.date}</p>
          <p className="text-primary mb-1">{dataPoint.formattedBalance}</p>
          {/* Optionally list transactions impacting this day */}
          {dataPoint.transactions?.map((txn: any, i: number) => (
             <p key={i} className={`text-muted-foreground ${txn.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {txn.description}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(txn.amount)}
            </p>
          ))}
        </div>
      );
    }
    return null;
};


// --- Cashflow Tab Component ---
function CashflowTab() {
  const navigate = useNavigate();
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id); // Default to first account
  const [forecastPeriod, setForecastPeriod] = useState("30days"); // Default period

  const selectedAccount = useMemo(() => accounts.find(acc => acc.id === selectedAccountId), [selectedAccountId]);
  const days = forecastPeriod === "30days" ? 30 : forecastPeriod === "90days" ? 90 : 30;

  // Generate forecast data based on selections
  const forecastData = useMemo(() => generateForecastData(
    selectedAccount?.balance || 0,
    new Date(), // Start forecast from today
    days
  ), [selectedAccount, days]);

  // Calculate lowest balance point
  const minBalanceDataPoint = useMemo(() => {
      if (!forecastData || forecastData.length === 0) return null;
      return forecastData.reduce((min, p) => p.balance < min.balance ? p : min, forecastData[0]);
  }, [forecastData]);


  const handleTransactionClick = (id: string) => {
    // Navigate to a specific upcoming transaction detail page if needed
    // navigate(`/upcoming-transaction/${id}`);
    console.log("Navigate to detail for upcoming tx:", id);
  };

  // Format currency helper (can be moved to utils)
  const formatCurrency = (amount: number | undefined, currency = 'SAR', digits = 0) => {
      if (amount === undefined) return '';
      const sign = amount < 0 ? "-" : amount > 0 ? "+" : "";
      return `${sign}${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: digits, minimumFractionDigits: digits }).format(Math.abs(amount))}`;
  }

  return (
    // Main container for the tab content
    <div className="space-y-6">

      {/* Selectors (Account & Period) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
           <label className="text-xs text-muted-foreground mb-1 block font-medium">Account</label>
           <Select
             value={selectedAccountId}
             onValueChange={setSelectedAccountId}
           >
             <SelectTrigger className="w-full h-9 text-xs sm:text-sm">
               <SelectValue placeholder="Select account" />
             </SelectTrigger>
             <SelectContent>
               {accounts.map(account => (
                 <SelectItem key={account.id} value={account.id} className="text-xs sm:text-sm">
                   {account.name} ({account.accountNumber})
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>

         <div>
           <label className="text-xs text-muted-foreground mb-1 block font-medium">Forecast Period</label>
           <Select
             value={forecastPeriod}
             onValueChange={setForecastPeriod}
           >
             <SelectTrigger className="w-full h-9 text-xs sm:text-sm">
               <SelectValue placeholder="Select period" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="30days" className="text-xs sm:text-sm">Next 30 Days</SelectItem>
               <SelectItem value="90days" className="text-xs sm:text-sm">Next 90 Days</SelectItem>
               {/* <SelectItem value="custom" disabled>Custom Range</SelectItem> */}
             </SelectContent>
           </Select>
         </div>
      </div>


      {/* Balance Projection Chart Card */}
       <Card className="overflow-hidden">
         <CardContent className="p-4 space-y-3">
           <div className="flex justify-between items-center">
               <h3 className="text-sm font-medium">Balance Projection</h3>
               <span className="text-xs text-muted-foreground">
                 Current: {formatCurrency(selectedAccount?.balance, 'SAR')}
               </span>
           </div>

           <div className="h-64"> {/* Fixed height for chart */}
             {/* Using ChartContainer might not be necessary if not using its features */}
             {/* <ChartContainer config={{ balance: { label: "Balance" } }}> */}
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={forecastData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorBalanceForecast" x1="0" y1="0" x2="0" y2="1">
                         {/* Using primary color from theme */}
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      // Show fewer ticks on X-axis if needed for readability
                      // interval={'preserveStartEnd'} // Or calculate dynamically
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => // Compact currency format
                        new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short', style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(value)
                      }
                      domain={['auto', 'auto']} // Auto domain based on data
                      width={45} // Adjust width for Y-axis labels
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <Tooltip content={<CustomForecastTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="hsl(var(--primary))" // Line color
                      fillOpacity={1}
                      fill="url(#colorBalanceForecast)" // Use gradient fill
                      strokeWidth={2}
                      dot={false} // Hide dots on line for cleaner look
                    />
                     {/* Optional: Add a threshold line */}
                     {minBalanceDataPoint && minBalanceDataPoint.balance < 0 && (
                         <ReferenceLine y={0} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                     )}
                  </AreaChart>
                </ResponsiveContainer>
              {/* </ChartContainer> */}
           </div>

            {/* Lowest Balance Info */}
           {minBalanceDataPoint && (
                <div className={`text-xs p-3 rounded-md ${minBalanceDataPoint.balance < 0 ? 'bg-destructive/10' : 'bg-muted/60'}`}>
                  <p className={`font-medium ${minBalanceDataPoint.balance < 0 ? 'text-destructive' : ''}`}>
                     Lowest projected balance: {formatCurrency(minBalanceDataPoint.balance, 'SAR')} on {minBalanceDataPoint.date}
                  </p>
                   {/* Simple message, could be more dynamic */}
                   <p className="text-muted-foreground mt-1 text-xs">
                     Based on scheduled and predicted transactions.
                   </p>
               </div>
           )}
         </CardContent>
       </Card>

      {/* Upcoming Transactions List Card */}
      <div>
        <h3 className="text-base font-semibold mb-3">Upcoming Transactions</h3>
        <div className="space-y-2">
          {upcomingTransactions.map(transaction => (
            <Card
              key={transaction.id}
              className="overflow-hidden"
              // Add onClick if needed
              // onClick={() => handleTransactionClick(transaction.id)}
            >
              <CardContent className="p-3 flex items-center justify-between cursor-pointer hover:bg-accent transition-colors"> {/* Make content clickable */}
                <div className="flex items-center gap-3">
                   {/* Date Block */}
                  <div className="flex flex-col items-center justify-center bg-muted/50 h-9 w-9 rounded text-center">
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">{transaction.date.split(' ')[0]}</span> {/* Month */}
                    <span className="text-xs font-semibold">{transaction.date.split(' ')[1]}</span> {/* Day */}
                  </div>
                   {/* Description & Source */}
                  <div className="min-w-0">
                     <p className="text-sm font-medium truncate">{transaction.description}</p>
                     <div className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                       {transaction.sourceIcon} {/* Render source icon */}
                       {transaction.source} transaction
                     </div>
                  </div>
                </div>
                 {/* Amount */}
                <span className={`text-sm font-medium shrink-0 ml-2 ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                   {/* Use compact formatting for list? Or full? Use full for clarity. */}
                   {formatCurrency(transaction.amount, 'SAR', 2)} {/* Show decimals */}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
         {/* Add Transaction Button */}
         {/* <Button size="sm" variant="outline" className="w-full mt-3">Add Upcoming Transaction</Button> */}
      </div>

      {/* Removed V1 sub-components like BalanceNotice, TransactionCategoryList */}

    </div>
  );
}

export default CashflowTab;