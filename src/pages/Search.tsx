import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  X,
  Calendar,
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
  TrendingUp, // Trend line icon
  Package, // Fallback Icon
  Home, // Upcoming Tx
  FileText, // Upcoming Tx
  Dumbbell, // Upcoming Tx
  Lightbulb, // Upcoming Tx
  CreditCard, // Upcoming Tx
  Info, // Upcoming Tx
  // Icons for suggestions
  Building, // London (Transactions)
  Percent, // Loan (Offers)
  Users, // Lonnie (Contacts)
  History, // Added for generic suggestion type if needed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // Import cn for conditional classes

// --- Import Transaction Data & Helpers ---
import {
    TransactionV1,
    findLondonTransactions,
    formatCurrencyV1,
    UpcomingTransaction,
    upcomingTransactionsData
} from "@/data/goalsBudgetsData"; // Adjust path as needed

// --- Interfaces ---
interface ExchangeRate {
    fromCurrency: string;
    fromAmount: number;
    toCurrency: string;
    toAmount: number;
    changePercent: number;
    trend: "up" | "down";
}

// --- FIXED: Added optional description property ---
interface Suggestion {
    id: string;
    label: string; // Text displayed (e.g., London, Loan, Lonnie)
    value: string; // Value to set in input on click (e.g., London, Loan offers, Lonnie K.)
    icon: React.ElementType;
    type: 'location' | 'offer' | 'contact' | 'action' | 'term';
    description?: string; // Optional description for the suggestion type
}

// --- Mock Data ---
const exchangeRateData: ExchangeRate = { /* ... */
    fromCurrency: "SAR",
    fromAmount: -1,
    toCurrency: "GBP",
    toAmount: 0.21,
    changePercent: 0.12,
    trend: "up",
};
const actionIcons = [ /* ... */
    { label: "Converter", icon: RefreshCw, path: "/converter" },
    { label: "ATMs", icon: MapPin, path: "/atms" },
    { label: "Learn", icon: GraduationCap, path: "/learn" },
    { label: "Help", icon: HelpCircle, path: "/help" },
];

// --- Autocomplete Suggestions Data ---
// Added explicit descriptions for clarity
const allSuggestions: Suggestion[] = [
    { id: "sug-lon-tx", label: "London", value: "London", icon: Building, type: 'location', description: "Transactions" },
    { id: "sug-loan", label: "Loan", value: "Loan offers", icon: Percent, type: 'offer', description: "Special Offers" },
    { id: "sug-lonnie", label: "Lonnie", value: "Lonnie K.", icon: Users, type: 'contact', description: "Contacts" },
    // Example for a generic term suggestion
    // { id: "sug-upcoming", label: "Upcoming", value: "Upcoming", icon: History, type: 'term', description: "Search Term" },
];


// --- Search Component ---
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const queryLower = searchQuery.toLowerCase();

  // --- Autocomplete Logic ---
  const filteredSuggestions = useMemo(() => {
    // Show suggestions only if query is not empty and doesn't exactly match a result trigger
    if (!queryLower || queryLower === "london" || queryLower === "upcoming" || queryLower === "upc") {
        return [];
    }

    // Example: Trigger suggestions for 'lon'
    if (queryLower.startsWith("lon")) {
        return allSuggestions.filter(s => s.label.toLowerCase().startsWith("lon"));
    }

    // Add more conditions here for other prefixes if needed
    // if (queryLower.startsWith("upc")) { ... }

    return []; // Default to no suggestions
  }, [queryLower]);

  // --- Determine Results View ---
  const showUpcomingResults = queryLower === "upcoming" || queryLower === "upc";
  const showLondonResults = queryLower === "london";
  const showInitialActions = searchQuery === "";

  // Suggestions should only display if they exist and we are not showing full results
  const displaySuggestions = filteredSuggestions.length > 0 && !showLondonResults && !showUpcomingResults;

  // --- Fetch London Transactions ---
  const londonTransactions = useMemo(() => {
      if (showLondonResults) {
          return findLondonTransactions("london"); // Use fixed "london" when showing results
      }
      return [];
  }, [showLondonResults]);


  // --- Formatting Helpers ---
  const formatDate = useCallback((dateString: string, timeString?: string) => { /* ... */
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return timeString ? `${formattedDate}, ${timeString}` : formattedDate;
    } catch (e) { return dateString; }
   }, []);
  const formatUpcomingDisplayDate = useCallback((dateStr: string) => `Due: ${dateStr}`, []);


  // --- Navigation Handlers ---
  useEffect(() => {
    document.getElementById("searchInput")?.focus();
  }, []);

  const handleBack = () => navigate(-1);
  const handleActionClick = (path: string) => navigate(path);
  const handleTransactionClick = (id: string | undefined, type: 'upcoming' | 'london') => { /* ... */
      if (!id) return;
      const path = type === 'london' ? `/transactions/${id}` : `/upcoming-payments/${id}`;
      navigate(path);
   };

  // --- Handle Suggestion Selection ---
  const handleSuggestionClick = (suggestion: Suggestion) => {
      setSearchQuery(suggestion.value); // Use suggestion.value which might differ from label
      setShowSuggestions(false);
      console.log("Suggestion selected:", suggestion);
      // Let the state update trigger the results view
  };

  // --- Handle Input Change ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      // Determine if suggestions should be shown based on the *new* query
      const newQueryLower = newQuery.toLowerCase();
      const shouldShow = newQueryLower.length > 0 &&
                         !(newQueryLower === "london" || newQueryLower === "upcoming" || newQueryLower === "upc") && // Don't show if exact match for results
                         (newQueryLower.startsWith("lon")); // Add other prefixes here: || newQueryLower.startsWith("upc") etc.

      setShowSuggestions(shouldShow);
  };

  // --- Render Logic ---
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background flex-shrink-0 z-10">
        <div className="container max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back"> <ArrowLeft className="h-5 w-5" /> </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              className="bg-secondary pl-9"
              placeholder="Search transactions, payees..."
              autoComplete="off"
              onBlur={() => setTimeout(() => { if (!document.activeElement?.closest?.('.suggestion-item')) { setShowSuggestions(false); } }, 150)} // Hide suggestions on blur with delay
              onFocus={() => { // Reshow relevant suggestions on focus
                const currentQueryLower = searchQuery.toLowerCase();
                const shouldShow = currentQueryLower.length > 0 &&
                                   !(currentQueryLower === "london" || currentQueryLower === "upcoming" || currentQueryLower === "upc") &&
                                   (currentQueryLower.startsWith("lon")); // Add other prefixes
                setShowSuggestions(shouldShow);
              }}
            />
            {searchQuery && ( <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => { setSearchQuery(""); setShowSuggestions(false); }} aria-label="Clear search"> <X className="h-4 w-4" /> </Button> )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-sm"> Cancel </Button>
        </div>
      </header>

      {/* --- Autocomplete Suggestions (UPDATED STYLE) --- */}
      {displaySuggestions && (
          // Use absolute positioning to overlay suggestions below the header
          <div className="absolute top-14 left-0 right-0 container max-w-md mx-auto z-20">
              <Card className="border-t-0 rounded-t-none shadow-md">
                  <CardContent className="p-0">
                      <ul className="divide-y divide-border">
                          {filteredSuggestions.map((suggestion) => (
                              <li key={suggestion.id}>
                                  <button
                                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-accent focus:outline-none focus:bg-accent suggestion-item" // Added suggestion-item class for blur logic
                                      onClick={() => handleSuggestionClick(suggestion)}
                                      aria-label={`Search for ${suggestion.label}`}
                                  >
                                      {/* Icon */}
                                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0">
                                          <suggestion.icon className="h-5 w-5 text-muted-foreground" />
                                      </div>
                                      {/* Text Content (Two Lines) */}
                                      <div className="flex-1 min-w-0">
                                          {/* Top Line: Type/Description */}
                                          <p className="text-xs text-muted-foreground capitalize">
                                              {/* Use the description property */}
                                              {suggestion.description || suggestion.type}
                                          </p>
                                          {/* Bottom Line: Suggestion Label */}
                                          <p className="text-sm font-medium truncate">
                                              {suggestion.label}
                                          </p>
                                      </div>
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
          </div>
      )}

      {/* Main Scrollable Content */}
      {/* Adjusted padding top to account for potential suggestion overlay */}
      <main className={cn(
          "container max-w-md mx-auto p-4 overflow-y-auto flex-1 w-full",
          // Add padding top only if suggestions might appear, otherwise suggestions overlay content
          // displaySuggestions ? "pt-24" : "" // Adjust padding if suggestions push content down
      )}>
        {/* --- Initial Actions --- */}
        {showInitialActions && ( /* ... Actions rendering ... */
            <div className="flex justify-around items-center pt-4">
                {actionIcons.map((action) => ( <Button key={action.label} variant="ghost" className="flex flex-col items-center h-auto p-2 space-y-1" onClick={() => handleActionClick(action.path)}> <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border"> <action.icon className="h-5 w-5 text-muted-foreground" /> </div> <span className="text-xs text-muted-foreground">{action.label}</span> </Button> ))}
            </div>
        )}

        {/* --- Upcoming Results --- */}
        {showUpcomingResults && ( /* ... Upcoming results rendering ... */
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Upcoming Transactions</h3>
              <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {upcomingTransactionsData.map((transaction) => { const IconComponent = transaction.sourceIcon || Calendar; return ( <button key={transaction.id} className="w-full text-left p-3 sm:p-4 hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between" onClick={() => handleTransactionClick(transaction.id, 'upcoming')} aria-label={`View details for ${transaction.description}`}> <div className="flex items-center gap-3"> <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border"> <IconComponent className="h-5 w-5 text-muted-foreground" /> </div> <div className="min-w-0"> <p className="font-medium text-sm truncate">{transaction.description}</p> <p className="text-xs text-muted-foreground capitalize">{formatUpcomingDisplayDate(transaction.date)} ({transaction.source})</p> </div> </div> <span className={`font-medium text-sm ${transaction.amount >= 0 ? 'text-[#333]' : 'text-foreground'}`}>{formatCurrencyV1(transaction.amount, "SAR")}</span> </button> ); })}
                    </div> {upcomingTransactionsData.length === 0 && ( <p className="text-center text-muted-foreground p-4 text-sm">No upcoming transactions found.</p> )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* --- London Results --- */}
        {showLondonResults && ( /* ... London results rendering ... */
            <div className="space-y-6">
                <Card className="p-4 bg-gradient-to-br from-blue-50 via-white bg-[#f1f5f9] border border-border/50 shadow-sm"> <div className="flex justify-between items-start gap-4"> <div className="space-y-1 flex-1"> <div className="flex items-baseline gap-1.5"> <span className="text-lg font-semibold">{Math.abs(exchangeRateData.fromAmount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> <span className="text-sm text-muted-foreground">{exchangeRateData.fromCurrency}</span> </div> <div className="text-center text-muted-foreground text-xs">=</div> <div className="flex items-baseline gap-1.5"> <span className="text-lg font-semibold">{formatCurrencyV1(exchangeRateData.toAmount, exchangeRateData.toCurrency).replace('+','')}</span> </div> </div> <div className="text-right flex flex-col items-end"> <div className={`flex items-center justify-end gap-1 text-xs font-medium mb-1 ${exchangeRateData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}> {exchangeRateData.trend === 'up' ? <ArrowUpRight className="h-3 w-3"/> : <ArrowDownRight className="h-3 w-3"/>} {exchangeRateData.changePercent.toFixed(2)}% </div> <p className="text-xs text-muted-foreground mb-2">Today</p> <TrendingUp className="h-6 w-10 text-green-500/50" strokeWidth={1.5}/> </div> </div> <Button variant="outline" size="sm" className="w-full mt-4 h-9 bg-background/70 hover:bg-background"> Review exchange </Button> </Card>
                <div> <div className="flex justify-between items-center mb-3"> <h3 className="font-semibold">Transactions</h3> <Button variant="ghost" size="sm" className="text-primary h-auto p-0 text-sm" onClick={() => navigate('/transactions?filter=london')}> See All </Button> </div> <Card className="overflow-hidden"> <CardContent className="p-0"> <div className="divide-y divide-border"> {londonTransactions.map((transaction) => { const Icon = transaction.icon || Package; return ( <button key={transaction.id} className="w-full text-left p-3 sm:p-4 hover:bg-accent focus:outline-none focus:bg-[accent] transition-colors flex items-center justify-between" onClick={() => handleTransactionClick(transaction.id, 'london')} aria-label={`View details for ${transaction.merchantName}`}> <div className="flex items-center gap-3"> <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border"> <Icon className="h-5 w-5 text-muted-foreground" /> </div> <div className="min-w-0"> <p className="font-medium text-sm truncate">{transaction.merchantName}</p> <p className="text-xs text-muted-foreground">{formatDate(transaction.date, transaction.time)}</p> </div> </div> <span className={`font-medium text-sm ${transaction.amount >= 0 ? 'text-[#333]' : 'text-foreground'}`}>{formatCurrencyV1(transaction.amount, transaction.currency)}</span> </button> ); })} </div> </CardContent> </Card> {londonTransactions.length === 0 && ( <p className="text-center text-muted-foreground mt-6 text-sm">No transactions found for London.</p> )} </div>
            </div>
        )}

        {/* No Results/Default Message */}
        {!showInitialActions && !showUpcomingResults && !showLondonResults && !displaySuggestions && (
            <p className="text-center text-muted-foreground mt-8">
                {searchQuery ? `No results found for "${searchQuery}".` : "Start typing to search..."}
            </p>
        )}
      </main>
    </div>
  );
};

export default Search;
