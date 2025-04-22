import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem"; // Assuming this component exists and accepts props *without* icon
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
// REMOVED: Icon imports like ShoppingCart, BookOpen, Utensils as they are not used by TransactionItem

const RecentTransactions = () => {
  const navigate = useNavigate();

  const formatCurrency = useCallback((amount: number) => {
    const numberFormatter = new Intl.NumberFormat('en-GB', { // Or 'en-SA' for Saudi Arabia locale formatting
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedAmount = numberFormatter.format(Math.abs(amount));
    const sign = amount < 0 ? "-" : "+";
    const currencySymbol = " SAR"; // Using SAR

    return { sign, amount: formattedAmount, symbol: currencySymbol };
  }, []);

  // Updated mock data based on spec examples for Ahmed (SAR) - Icons removed
  const recentTransactionsData = [
    {
      id: "rt1",
      merchant: "Panda Hypermarket",
      amount: -285.50,
      date: "Today",
      // category: "Groceries" // Add if needed by TransactionItem
    },
    {
      id: "rt2",
      merchant: "Jarir Bookstore",
      amount: -190.00,
      date: "Yesterday",
      // category: "Shopping"
    },
    {
      id: "rt3",
      merchant: "Hungerstation",
      amount: -75.00,
      date: "Yesterday",
      // category: "Food & Drink"
    }
  ];

  return (
    <Card className="p-6 mb-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
          See All
        </Button>
      </div>

      <div className="space-y-1">
        {recentTransactionsData.map((transaction) => {
          const formatted = formatCurrency(transaction.amount);
          // Construct display amount string (e.g., "-285.50 SAR")
          const displayAmount = `${formatted.sign}${formatted.amount}${formatted.symbol}`;

          return (
            <TransactionItem
              key={transaction.id}
              // --- CHANGE HERE: Removed icon prop ---
              // icon={transaction.icon} // REMOVED
              merchant={transaction.merchant}
              amount={displayAmount} // Pass formatted string
              date={transaction.date}
              id={transaction.id} // Pass ID if needed by TransactionItem
            />
          );
        })}
      </div>
    </Card>
  );
};

export default RecentTransactions;