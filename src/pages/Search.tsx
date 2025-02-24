
import { useState, useEffect } from "react";
import { ArrowLeft, X, LightbulbIcon, Calendar, Play, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import TransactionItem from "@/components/transactions/TransactionItem";
import { Card } from "@/components/ui/card";

const upcomingTransactions = [
  {
    icon: Calendar,
    title: "Tuition Fee",
    dueIn: "Due on Feb 25, 2025",
    amount: "-﷼80,000"
  },
  {
    icon: Play,
    title: "Netflix Subscription",
    dueIn: "Due in 3 days",
    amount: "-﷼45"
  },
  {
    icon: Music,
    title: "Spotify Premium",
    dueIn: "Due in 7 days",
    amount: "-﷼20"
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const showResults = searchQuery.toLowerCase().includes('upcoming');

  useEffect(() => {
    const input = document.getElementById("searchInput");
    if (input) {
      input.focus();
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-background z-50">
      <header className="border-b bg-background">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary"
              placeholder="Search insights and transactions..."
              autoComplete="off"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 overflow-auto h-[calc(100%-3.5rem)]">
        {showResults && (
          <div className="space-y-6">
            {/* Insight Card */}
            <Card className="p-4 bg-secondary/50">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm flex-1">
                  Your tuition fee of <span className="font-semibold">80,000 ﷼</span> to{" "}
                  <span className="text-primary">MBSC</span> is due on{" "}
                  <span className="text-primary">Feb 25, 2025</span>. Making the payment on time can help avoid any late fees.
                </p>
              </div>
            </Card>

            {/* Upcoming Transactions */}
            <div>
              <h3 className="font-semibold mb-4">Upcoming Transactions</h3>
              <Card className="p-4">
                <div className="space-y-4">
                  {upcomingTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <transaction.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.title}</p>
                          <p className="text-sm text-muted-foreground">{transaction.dueIn}</p>
                        </div>
                      </div>
                      <span className="text-[0.95rem] text-[#222222]">{transaction.amount}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
