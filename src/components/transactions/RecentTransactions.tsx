
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";

const RecentTransactions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
          See all
        </Button>
      </div>
      
      <div className="divide-y">
        <TransactionItem
          merchant="Spotify"
          amount="-$9.99"
          date="Today"
        />
        <TransactionItem
          merchant="Amazon"
          amount="-$25.50"
          date="Yesterday"
        />
        <TransactionItem
          merchant="Salary"
          amount="+$3,500.00"
          date="Mar 1"
        />
      </div>
    </Card>
  );
};

export default RecentTransactions;
