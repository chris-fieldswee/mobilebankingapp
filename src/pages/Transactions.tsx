
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
          <div className="max-w-md mx-auto p-4">
            <Card className="p-6">
              <div className="divide-y">
                <TransactionItem merchant="Spotify" amount="-$9.99" date="Today" />
                <TransactionItem merchant="Amazon" amount="-$25.50" date="Yesterday" />
                <TransactionItem merchant="Salary" amount="+$3,500.00" date="Mar 1" />
                <TransactionItem merchant="Netflix" amount="-$14.99" date="Feb 28" />
                <TransactionItem merchant="Uber" amount="-$22.50" date="Feb 27" />
                <TransactionItem merchant="Grocery Store" amount="-$85.75" date="Feb 26" />
              </div>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Transactions;
