import React, { useCallback } from 'react'; // Import React
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Removed TransactionItem import as we'll render the structure directly
// import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";
import { mockAllTransactionsV1, TransactionV1, formatCurrencyV1 } from "@/data/goalsBudgetsData"; // Import data and formatter
import { Package } from 'lucide-react'; // Import a default fallback icon

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
        // Fallback to a standard format for older dates (e.g., "21 Apr")
        return transactionDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            timeZone: 'UTC' // Ensure consistency
        });
    }
};


const RecentTransactions = () => {
  const navigate = useNavigate();

  // --- Get Top 3 Recent Transactions ---
  const recentTransactionsData = [...mockAllTransactionsV1]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // --- Navigation Function ---
  const navigateToTransactionDetail = (transactionId: string) => {
    console.log("Navigating to details for transaction:", transactionId);
    navigate(`/transactions/${transactionId}`);
  };

  // --- Fallback Icon Rendering ---
  const renderFallbackIcon = (transaction: TransactionV1) => {
      const CategoryIcon = transaction.icon || Package; // Use category icon or default Package
      // Extract initials from merchant name
      const initials = transaction.merchantName
          .split(' ')
          .slice(0, 2)
          .map(n => n[0])
          .join('')
          .toUpperCase();

      // Prioritize category icon, then initials if icon is just Package
      if (CategoryIcon !== Package) {
          return <CategoryIcon className="h-5 w-5 text-muted-foreground" />;
      } else if (initials) {
          return <span className="text-sm font-semibold text-muted-foreground">{initials}</span>;
      } else {
          // Absolute fallback if no icon and no initials
          return <Package className="h-5 w-5 text-muted-foreground" />;
      }
  };


  return (
    <Card className="p-4 md:p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base md:text-lg">Recent Transactions</h3>
        {/* Ensure this navigation target is correct for your app */}
        <Button variant="ghost" size="sm" onClick={() => navigate('/accounts/acc1/transactions')} className="text-primary">
          See All
        </Button>
      </div>

      <div className="space-y-1"> {/* Reduced spacing slightly for denser list */}
        {recentTransactionsData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent transactions found.</p>
        ) : (
            recentTransactionsData.map((transaction: TransactionV1) => (
            // --- Render item directly within the button ---
            <button
              key={transaction.id}
              onClick={() => navigateToTransactionDetail(transaction.id)}
              className="w-full text-left p-3 rounded-md hover:bg-accent focus:outline-none focus:bg-accent transition-colors flex items-center justify-between gap-3" // Use padding on button, add gap
              aria-label={`View details for ${transaction.merchantName}`}
            >
              {/* Left side: Logo/Icon and Merchant Info */}
              <div className="flex items-center gap-3 overflow-hidden">
                 {/* Logo/Icon Container */}
                 <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0 overflow-hidden">
                    {transaction.merchantLogoUrl ? (
                        <img
                            src={transaction.merchantLogoUrl}
                            alt={`${transaction.merchantName} logo`}
                            className="w-full h-full object-contain" // Use contain to prevent distortion
                            // Add onError to show fallback
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none'; // Hide broken image
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex'; // Show fallback div
                            }}
                        />
                    ) : null}
                    {/* Fallback Icon/Initials Div (Hidden initially if logo exists) */}
                    <div
                        className={`w-full h-full items-center justify-center ${transaction.merchantLogoUrl ? 'hidden' : 'flex'}`} // Show if no logo URL
                    >
                        {renderFallbackIcon(transaction)}
                    </div>
                 </div>
                 {/* Merchant Name & Date */}
                 <div className="min-w-0">
                    <p className="font-medium text-sm truncate" title={transaction.merchantName}>
                        {transaction.merchantName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {formatRelativeDate(transaction.date)}
                    </p>
                 </div>
              </div>

              {/* Right side: Amount */}
              <span className={`font-medium text-sm shrink-0 ml-2 ${transaction.amount >= 0 ? 'text-green-600' : 'text-foreground'}`}>
                {/* Use imported formatter */}
                {formatCurrencyV1(transaction.amount, transaction.currency)}
              </span>
            </button>
            ))
        )}
      </div>
    </Card>
  );
};

export default RecentTransactions;
