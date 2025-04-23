import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  X,
  // LightbulbIcon, // Removed as insight card is removed
  Calendar, // Keep for upcoming tx icon fallback if needed
  Search as SearchIcon,
  RefreshCw, // Converter
  MapPin, // ATMs
  GraduationCap, // Learn
  HelpCircle, // Help
  Utensils, // London Tx / Upcoming Tx
  Car, // London Tx
  ShoppingBag, // London Tx
  Landmark, // London Tx
  Coffee, // London Tx
  ArrowUpRight, // Exchange Rate Trend
  ArrowDownRight, // Exchange Rate Trend
  // Heart, // No longer needed unless used in upcoming/london data
  TrendingUp, // Trend line icon
  Package, // Fallback Icon
  Home, // Upcoming Tx
  FileText, // Upcoming Tx
  Dumbbell, // Upcoming Tx
  Lightbulb, // Upcoming Tx
  CreditCard, // Upcoming Tx
  Info, // Upcoming Tx
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- Import Transaction Data & Helpers ---
// Import shared data sources and types
import {
    TransactionV1,
    findLondonTransactions,
    formatCurrencyV1,
    // Assuming UpcomingTransaction type and data are exported from goalsBudgetsData
    UpcomingTransaction, // Import the interface used in CashflowTab
    upcomingTransactionsData // Import the data used in CashflowTab
} from "@/data/goalsBudgetsData"; // Adjust path as needed

// --- Mock Data Interfaces ---
// Removed local UpcomingTransaction interface

interface ExchangeRate {
    fromCurrency: string;
    fromAmount: number;
    toCurrency: string;
    toAmount: number;
    changePercent: number;
    trend: "up" | "down";
}

// --- Mock Data ---
// Removed local upcomingTransactionsData

const exchangeRateData: ExchangeRate = {
    fromCurrency: "SAR",
    fromAmount: -1,
    toCurrency: "GBP",
    toAmount: 0.21,
    changePercent: 0.12,
    trend: "up",
};

const actionIcons = [
    { label: "Converter", icon: RefreshCw, path: "/converter" },
    { label: "ATMs", icon: MapPin, path: "/atms" },
    { label: "Learn", icon: GraduationCap, path: "/learn" },
    { label: "Help", icon: HelpCircle, path: "/help" },
];

// --- Search Component ---
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const queryLower = searchQuery.toLowerCase();
  // Use more specific checks if possible, e.g., check against keywords
  const showUpcomingResults = queryLower.includes("upcoming") || queryLower.startsWith("upc");
  const showLondonResults = queryLower.includes("london") || queryLower.startsWith("lon");
  const showInitialActions = searchQuery === "";

  // --- Fetch London Transactions ---
  const londonTransactions = useMemo(() => {
      if (showLondonResults) {
          // You might want to filter based on the actual searchQuery here too
          return findLondonTransactions(queryLower); // Use actual query for filtering
      }
      return [];
  }, [showLondonResults, queryLower]); // Add queryLower dependency


  // --- Formatting Helpers ---
  const formatDate = useCallback((dateString: string, timeString?: string) => {
    // Basic date formatting for lists (e.g., "10 February, 14:05")
    try {
      const date = new Date(dateString); // Assumes YYYY-MM-DD
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return timeString ? `${formattedDate}, ${timeString}` : formattedDate;
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString;
    }
  }, []);

  // Format upcoming date display (e.g., "Due: Apr 28")
  const formatUpcomingDisplayDate = useCallback((dateStr: string) => {
      // This assumes dateStr is like "Apr 28" from the cashflow mock data
      // If it's YYYY-MM-DD, you'll need to parse and format it
      // Example parsing if needed:
      // try {
      //   const date = new Date(dateStr + ' 2025'); // Add year if needed
      //   return `Due: ${date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}`;
      // } catch {
      //   return `Due: ${dateStr}`;
      // }
      return `Due: ${dateStr}`; // Simple display based on current mock data format
  }, []);


  // --- Navigation Handlers ---
  useEffect(() => {
    document.getElementById("searchInput")?.focus();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleActionClick = (path: string) => {
      navigate(path);
  }

  const handleTransactionClick = (id: string | undefined, type: 'upcoming' | 'london') => {
      if (!id) return;
      // Use consistent routes
      const path = type === 'london' ? `/transactions/${id}` : `/upcoming-payments/${id}`;
      navigate(path);
  }

  // --- Render Logic ---
  return (
    // Fixed overlay container
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header - Positioned correctly at the top of the fixed container */}
      <header className="border-b bg-background flex-shrink-0">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary pl-9" // Use secondary for less emphasis than input fields on main screens
              placeholder="Search transactions, payees..."
              autoComplete="off"
            />
            {searchQuery && (
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-sm">
            Cancel
          </Button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="max-w-md mx-auto p-4 overflow-y-auto flex-1 w-full">
        {/* --- Initial Actions --- */}
        {showInitialActions && (
            <div className="flex justify-around items-center pt-4">
                {actionIcons.map((action) => (
                    <Button key={action.label} variant="ghost" className="flex flex-col items-center h-auto p-2 space-y-1" onClick={() => handleActionClick(action.path)}>
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border">
                           <action.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">{action.label}</span>
                    </Button>
                ))}
            </div>
        )}

        {/* --- Upcoming Results ("upc", "upcoming") --- */}
        {showUpcomingResults && (
          <div className="space-y-6">
            {/* Removed specific insight card */}

            {/* Upcoming List - Using imported data */}
            <div>
              <h3 className="font-semibold mb-3">Upcoming Transactions</h3>
              <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {/* Map over imported upcomingTransactionsData */}
                        {upcomingTransactionsData.map((transaction) => {
                            const IconComponent = transaction.sourceIcon || Calendar; // Use sourceIcon, fallback to Calendar
                            return (
                                <button
                                    key={transaction.id} // Use the actual ID
                                    className="w-full text-left p-3 sm:p-4 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between"
                                    onClick={() => handleTransactionClick(transaction.id, 'upcoming')}
                                    aria-label={`View details for ${transaction.description}`} // Use description from imported data
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border">
                                            {/* Render the correct icon component */}
                                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0">
                                            {/* Use description from imported data */}
                                            <p className="font-medium text-sm truncate">{transaction.description}</p>
                                            {/* Display formatted date and source */}
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {formatUpcomingDisplayDate(transaction.date)} ({transaction.source})
                                            </p>
                                        </div>
                                    </div>
                                    {/* Use formatCurrencyV1 for consistency */}
                                    <span className={`font-medium text-sm ${transaction.amount >= 0 ? 'text-green-600' : 'text-foreground'}`}>
                                        {formatCurrencyV1(transaction.amount, "SAR")} {/* Assuming SAR */}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                     {/* Display if no upcoming transactions found */}
                     {upcomingTransactionsData.length === 0 && (
                         <p className="text-center text-muted-foreground p-4 text-sm">No upcoming transactions found.</p>
                     )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* --- London Results ("lon", "london") --- */}
        {showLondonResults && (
            <div className="space-y-6">
                {/* Exchange Rate Card */}
                <Card className="p-4 bg-gradient-to-br from-blue-50 via-white bg-[#f1f5f9] border border-border/50 shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1 flex-1">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-semibold">
                                    {Math.abs(exchangeRateData.fromAmount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-sm text-muted-foreground">{exchangeRateData.fromCurrency}</span>
                            </div>
                             <div className="text-center text-muted-foreground text-xs">=</div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-semibold">
                                    {formatCurrencyV1(exchangeRateData.toAmount, exchangeRateData.toCurrency).replace('+','')}
                                </span>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className={`flex items-center justify-end gap-1 text-xs font-medium mb-1 ${exchangeRateData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {exchangeRateData.trend === 'up' ? <ArrowUpRight className="h-3 w-3"/> : <ArrowDownRight className="h-3 w-3"/>}
                                {exchangeRateData.changePercent.toFixed(2)}%
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">Today</p>
                            <TrendingUp className="h-6 w-10 text-green-500/50" strokeWidth={1.5}/>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 h-9 bg-background/70 hover:bg-background">
                        Review exchange
                    </Button>
                </Card>

                {/* London Transactions List */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Transactions</h3>
                        <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm" onClick={() => navigate('/transactions?filter=london')}>
                            See All
                        </Button>
                    </div>
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {londonTransactions.map((transaction) => {
                                    const Icon = transaction.icon || Package; // Fallback icon
                                    return (
                                        <button
                                            key={transaction.id}
                                            className="w-full text-left p-3 sm:p-4 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between"
                                            onClick={() => handleTransactionClick(transaction.id, 'london')}
                                            aria-label={`View details for ${transaction.merchantName}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border">
                                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-sm truncate">{transaction.merchantName}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(transaction.date, transaction.time)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`font-medium text-sm ${transaction.amount >= 0 ? 'text-green-600' : 'text-foreground'}`}>
                                                {formatCurrencyV1(transaction.amount, transaction.currency)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                     {londonTransactions.length === 0 && (
                         <p className="text-center text-muted-foreground mt-6 text-sm">No transactions found for London.</p>
                     )}
                </div>
            </div>
        )}

        {/* No Results/Default Message */}
        {!showInitialActions && !showUpcomingResults && !showLondonResults && (
            <p className="text-center text-muted-foreground mt-8">
                {searchQuery ? `No results found for "${searchQuery}".` : "Start typing to search..."}
            </p>
        )}
      </main>
    </div>
  );
};

export default Search;
