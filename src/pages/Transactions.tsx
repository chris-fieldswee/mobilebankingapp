
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const Transactions = () => {
  return (
    <div className="fixed inset-0 bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Recent Transactions</h1>
        </div>
      </header>

      <main className="h-full pt-14">
        <ScrollArea className="h-full">
          <div className="max-w-md mx-auto p-4 pb-24">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Today</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Starbucks" amount="-$4.50" date="8:15 AM" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Yesterday</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Amazon" amount="-$150.99" date="3:45 PM" />
                    <TransactionItem merchant="Uber" amount="-$22.75" date="1:20 PM" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">March 1</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Monthly Salary" amount="+$5,000.00" date="9:00 AM" />
                    <TransactionItem merchant="Netflix" amount="-$15.99" date="8:30 AM" />
                    <TransactionItem merchant="Walmart" amount="-$56.00" date="8:15 AM" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Transactions;
