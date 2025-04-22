import { useState, useEffect } from "react";
import { ArrowLeft, X, LightbulbIcon, Calendar, Play, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom"; // Link might be unused
import { Card } from "@/components/ui/card";
// REMOVED: import { useTranslation } from "react-i18next";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // REMOVED: const { t, i18n } = useTranslation();

  // Simplified check for English "upcoming"
  const showResults = searchQuery.toLowerCase().includes("upcoming");

  // Hardcoded English data
  const upcomingTransactionsData = [
    {
      icon: Calendar,
      title: "Tuition Fee",
      dueDate: "Feb 25, 2025",
      amount: "-€8,000" // Using amount from t() options in original
    },
    {
      icon: Play,
      title: "Netflix Subscription",
      days: "3",
      amount: "-€15"
    },
    {
      icon: Music,
      title: "Spotify Premium",
      days: "7",
      amount: "-€10"
    }
  ];

  // Hardcoded English labels and messages
  const labels = {
      placeholder: "Search transactions, payees...",
      tuitionInsight: (amount: string, institution: string, date: string) =>
        `Your tuition fee of €${amount} to ${institution} is due on ${date}.`,
      upcomingTitle: "Upcoming Transactions",
      dueOn: (date: string) => `Due on ${date}`,
      dueIn: (days: string) => `Due in ${days} days`,
  };


  useEffect(() => {
    const input = document.getElementById("searchInput");
    if (input) {
      input.focus();
    }
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back instead of always to "/"
  };

  // Simplified format function
  const formatDueDate = (transaction: { dueDate?: string, days?: string }) => {
    if (transaction.dueDate) {
      return labels.dueOn(transaction.dueDate);
    }
    if (transaction.days) {
       return labels.dueIn(transaction.days);
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col"> {/* Use flex */}
      <header className="border-b bg-background flex-shrink-0">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back">
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <div className="flex-1 relative">
            <Input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary"
              placeholder={labels.placeholder}
              autoComplete="off"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Adjusted main area for scrolling */}
      <main className="max-w-md mx-auto p-4 overflow-y-auto flex-1 w-full">
        {showResults && (
          <div className="space-y-6">
            <Card className="p-4 bg-secondary/50">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm flex-1">
                   {/* Use hardcoded string function */}
                  {labels.tuitionInsight(
                    '8,000', // Hardcoded amount from original t() options
                    'Universidad de Zaragoza', // Hardcoded institution
                    'Feb 25, 2025' // Hardcoded date
                  )}
                </p>
              </div>
            </Card>

            <div>
               {/* Use hardcoded title */}
              <h3 className="font-semibold mb-4">{labels.upcomingTitle}</h3>
              <Card className="p-4">
                <div className="space-y-4">
                  {upcomingTransactionsData.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <transaction.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDueDate(transaction)}
                          </p>
                        </div>
                      </div>
                       {/* Ensure amount format is consistent */}
                      <span className="text-[0.95rem] text-[#222222]">{transaction.amount}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
        {/* Add placeholder content for when showResults is false */}
        {!showResults && searchQuery && (
            <p className="text-center text-muted-foreground mt-8">No results found for "{searchQuery}".</p>
        )}
         {!showResults && !searchQuery && (
            <p className="text-center text-muted-foreground mt-8">Start typing to search...</p>
        )}
      </main>
    </div>
  );
};

export default Search;