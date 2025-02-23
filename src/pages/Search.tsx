
import { useState, useEffect } from "react";
import { ArrowLeft, X, LightbulbIcon, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import TransactionItem from "@/components/transactions/TransactionItem";
import { Card } from "@/components/ui/card";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById("searchInput");
    if (input) {
      input.focus();
    }
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
  };

  return (
    <div className="fixed inset-0 bg-background z-50">
      <header className="border-b bg-background">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack} type="button">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary"
              placeholder="How much have I spent on gas this month?"
              autoComplete="off"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </header>

      <main className="max-w-md mx-auto p-4 overflow-auto h-[calc(100%-3.5rem)]">
        {searchQuery.length >= 4 && (
          <div className="space-y-6">
            {/* Insight Card */}
            <Card className="p-4 bg-secondary/50">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm">
                  You have spent <span className="font-semibold">$201.37</span> on fuel this month, most of it at{" "}
                  <span className="text-primary">Shell</span> in your zipcode, followed by{" "}
                  <span className="text-primary">Chevron</span>.
                </p>
              </div>
            </Card>

            {/* Promotion Card */}
            <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1">
                    Earn points on every fill-up! Check out our premium card in partnership with Chevron.
                  </p>
                  <Button variant="link" className="text-primary px-0 h-auto font-normal">
                    Start earning points
                  </Button>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground self-center" />
              </div>
            </Card>

            {/* Businesses */}
            <div>
              <h3 className="font-semibold mb-4">Businesses</h3>
              <div className="space-y-1">
                <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        S
                      </div>
                      <div>
                        <p className="font-medium">Shell</p>
                        <p className="text-sm text-muted-foreground">Gas</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
                <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        C
                      </div>
                      <div>
                        <p className="font-medium">Chevron</p>
                        <p className="text-sm text-muted-foreground">Gas</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>

            {/* Transactions */}
            <div>
              <h3 className="font-semibold mb-4">Transactions</h3>
              <Card className="p-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Today</h4>
                    <TransactionItem merchant="Shell" amount="$54.47" date="Today" />
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Dec 13, 2024</h4>
                    <TransactionItem merchant="Shell" amount="$60.01" date="Dec 13" />
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Dec 05, 2024</h4>
                    <TransactionItem merchant="Shell" amount="$55.00" date="Dec 05" />
                  </div>
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
