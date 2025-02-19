
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNav />
      <main className="flex-1 overflow-auto pt-20 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          
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
      </main>
      <BottomNav />
    </div>
  );
};

export default Transactions;
