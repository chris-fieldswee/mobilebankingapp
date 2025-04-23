import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem"; // Assuming this component exists and accepts props
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { mockAllTransactionsV1, TransactionV1 } from "@/data/goalsBudgetsData"; // <--- IMPORT actual data and type

// Helper function for basic relative date formatting
const formatRelativeDate = (dateString: string): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Parse the date string as UTC to avoid timezone issues with YYYY-MM-DD
    const transactionDate = new Date(dateString + 'T00:00:00Z');

    // Reset time parts for accurate date comparison
    today.setUTCHours(0, 0, 0, 0);
    yesterday.setUTCHours(0, 0, 0, 0);
    transactionDate.setUTCHours(0, 0, 0, 0);

    if (transactionDate.getTime() === today.getTime()) {
        return "Today";
    } else if (transactionDate.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else {
        // Fallback to a standard format for older dates (e.g., "21 Apr 2025")
        return transactionDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            // year: 'numeric', // Optional: Add year if needed
            timeZone: 'UTC' // Ensure consistency
        });
    }
};


const RecentTransactions = () => {
  const navigate = useNavigate();

  // --- Get Top 3 Recent Transactions ---
  const recentTransactionsData = [...mockAllTransactionsV1] // Create a shallow copy to avoid mutating the original
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort descending by date
    .slice(0, 3); // Take the first 3

  const formatCurrency = useCallback((amount: number, currency: string = "SAR") => { // Added currency param default
    const numberFormatter = new Intl.NumberFormat('en-GB', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedAmount = numberFormatter.format(Math.abs(amount));
    const sign = amount < 0 ? "-" : amount > 0 ? "+" : ""; // Handle zero amount sign
    const currencySymbol = ` ${currency}`;

    // Return the fully formatted string directly for simplicity here
    return `${sign}${formattedAmount}${currencySymbol}`;
  }, []);

  // --- Navigation Function ---
  const navigateToTransactionDetail = (transactionId: string) => {
    console.log("Navigating to details for transaction:", transactionId);
    navigate(`/transactions/${transactionId}`); // Navigate to dynamic route
  };

  return (
    <Card className="p-4 md:p-6 mb-6 shadow-sm"> {/* Adjusted padding */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base md:text-lg">Recent Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/accounts/acc1/transactions')} className="text-primary">
          See All
        </Button>
      </div>

      {/* Use a div for spacing instead of relying on TransactionItem margins */}
      <div className="space-y-2">
        {recentTransactionsData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent transactions found.</p>
        ) : (
            recentTransactionsData.map((transaction: TransactionV1) => (
            // --- Wrap TransactionItem in a button for clickability ---
            <button
              key={transaction.id}
              onClick={() => navigateToTransactionDetail(transaction.id)}
              className="w-full text-left p-2 -m-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 block" // Make it block & add focus styles
              aria-label={`View details for ${transaction.merchantName}`}
            >
              <TransactionItem
                // key is now on the parent button
                merchant={transaction.merchantName}
                amount={formatCurrency(transaction.amount, transaction.currency)} // Pass formatted string
                date={formatRelativeDate(transaction.date)} // Use relative date
                // Pass other props if TransactionItem needs them (e.g., category)
                // category={transaction.category}
              />
            </button>
            ))
        )}
      </div>
    </Card>
  );
};

export default RecentTransactions;