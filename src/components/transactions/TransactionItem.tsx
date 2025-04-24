import React, { useCallback } from 'react'; // Added useCallback
import { useNavigate } from "react-router-dom";
import { Package } from 'lucide-react'; // Import fallback icon
import { TransactionV1 } from '@/data/goalsBudgetsData'; // Import the type

// --- Define Props to accept the full transaction object ---
interface TransactionItemProps {
  transaction: TransactionV1;
  // Keep other props if still needed directly, but often redundant now
  // merchant: string;
  // amount: string;
  // date: string;
  // id?: string;
}

// --- Fallback Icon Rendering Helper (can be inside or outside) ---
const renderFallbackIcon = (transaction: TransactionV1) => {
    const CategoryIcon = transaction.icon || Package; // Use category icon or default Package
    // Extract initials from merchant name
    const initials = transaction.merchantName
        ?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?'; // Use '?' as fallback

    if (CategoryIcon !== Package) {
        return <CategoryIcon className="h-5 w-5 text-muted-foreground" />;
    } else { // No need for 'else if (initials)' because of the '?' fallback
        return <span className="text-sm font-semibold text-muted-foreground">{initials}</span>;
    }
    // Removed final 'else' as it's covered by initials logic
};


const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const navigate = useNavigate();

  // Extract necessary details from the transaction object
  const { id, merchantName, merchantLogoUrl, date, amount, currency, type } = transaction;

  // Re-format amount and date here IF the parent doesn't pass pre-formatted ones
  // OR adjust parent to pass raw data if preferred.
  // For now, assuming parent passes pre-formatted strings for amount/date as before.
  // If not, uncomment and use formatters:
  // const displayAmount = formatCurrencyV1(amount, currency);
  // const displayDate = formatDateV1(date, {month:'short', day:'numeric'});

  // Navigate to detail page
  const handleNavigate = useCallback(() => {
      if (id) { // Check if id exists from transaction
          navigate(`/transactions/${id}`);
      } else {
          console.warn("TransactionItem clicked without a valid ID");
      }
  }, [id, navigate]);


  return (
    <div
      className="flex items-center justify-between py-3 cursor-pointer hover:bg-secondary rounded-lg px-2"
      onClick={handleNavigate} // Use the callback
      role="button" // Add role for accessibility
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()} // Keyboard accessibility
    >
      <div className="flex items-center overflow-hidden"> {/* Added overflow-hidden */}
        {/* === START: Logo/Fallback Implementation === */}
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border flex-shrink-0 overflow-hidden mr-3">
            {merchantLogoUrl ? (
                <img
                    src={merchantLogoUrl}
                    alt={`${merchantName} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        console.error(`IMAGE LOAD FAILED for Merchant: ${merchantName} | URL: ${merchantLogoUrl}`);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none'; // Hide broken image
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                            fallback.style.display = 'flex'; // Show fallback div
                        } else {
                             console.error(`Could not find fallback element sibling for img: ${merchantName}`);
                        }
                    }}
                    loading="lazy" // Add lazy loading for performance
                />
            ) : null}
            {/* Fallback */}
            <div
                className={`w-full h-full items-center justify-center ${merchantLogoUrl ? 'hidden' : 'flex'}`}
            >
                {renderFallbackIcon(transaction)}
            </div>
        </div>
        {/* === END: Logo/Fallback Implementation === */}

        {/* Merchant Info */}
        <div className="min-w-0"> {/* Added min-w-0 for better truncation */}
          {/* Use merchantName from transaction object */}
          <p className="font-medium text-sm truncate" title={merchantName}>{merchantName}</p>
          {/* Use formatted date passed from parent OR reformat here */}
          {/* If parent AccountTransactionsPage still formats date, use props.date */}
           {/* <p className="text-sm text-muted-foreground">{props.date}</p>  */}
           {/* OR if parent passes raw date: */}
           <p className="text-sm text-muted-foreground">{new Date(date + 'T00:00:00Z').toLocaleDateString('en-GB', {month:'short', day:'numeric', timeZone: 'UTC'})}</p>
        </div>
      </div>

      {/* Amount */}
      <span className={`font-medium text-sm shrink-0 ml-2 ${
            // Determine color based on transaction type
            type === 'income' ? 'text-emerald-600' : 'text-foreground'
        }`}>
         {/* Use formatted amount passed from parent OR reformat here */}
         {/* {props.amount} */}
         {/* OR if parent passes raw amount/currency: */}
         {new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(amount))} {currency}
      </span>
    </div>
  );
};

export default TransactionItem;