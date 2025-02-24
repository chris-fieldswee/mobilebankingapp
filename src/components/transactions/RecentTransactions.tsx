
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";

const recentTransactions = [
  {
    id: "1",
    merchant: "Harvey Nichols",
    amount: "-﷼8,800",
    date: "Today",
    category: "Shopping"
  },
  {
    id: "2",
    merchant: "Nusr-Et Steakhouse",
    amount: "-﷼1,200",
    date: "Yesterday",
    category: "Dining"
  },
  {
    id: "3",
    merchant: "Four Seasons Spa",
    amount: "-﷼1,210",
    date: "Mar 15",
    category: "Wellness"
  }
];

const RecentTransactions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 mb-6 bg-blue-50/50 border-blue-100/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
          See all
        </Button>
      </div>
      
      <div className="space-y-1">
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
