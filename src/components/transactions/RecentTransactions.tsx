
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";

const recentTransactions = [
  {
    id: "1",
    merchant: "Netflix",
    amount: "-$15.99",
    date: "Mar 18",
    category: "Entertainment"
  },
  {
    id: "2",
    merchant: "Shell",
    amount: "-$40.00",
    date: "Mar 3",
    category: "Fuel"
  },
  {
    id: "3",
    merchant: "Amazon",
    amount: "-$150.99",
    date: "Feb 15",
    category: "Shopping"
  }
];

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
        {recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            merchant={transaction.merchant}
            amount={transaction.amount}
            date={transaction.date}
            id={transaction.id}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
