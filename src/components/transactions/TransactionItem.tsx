import { useNavigate } from "react-router-dom";

// Refined Props Interface
interface TransactionItemProps {
  merchant: string;
  amount: string; // Pre-formatted amount string (e.g., "-123.45 SAR")
  date: string;   // Date string (e.g., "Today", "Yesterday")
  id: string;     // Make ID mandatory as navigation depends on it
}

// Refined TransactionItem Component
const TransactionItem = ({ merchant, amount, date, id }: TransactionItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the V1 detail page using the provided ID
    navigate(`/transactions/${id}`);
  };

  // Get merchant initials (first letter of first two words, max 2 chars)
   const merchantInitials = merchant
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();

  return (
    // Use a button element for semantic correctness and accessibility
    // Reset button default styles with 'text-left', 'w-full' etc.
    <button
      type="button" // Explicitly type as button
      className="flex w-full items-center justify-between py-3 px-2 text-left hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg transition-colors duration-150 ease-in-out"
      onClick={handleNavigate}
      aria-label={`View transaction details for ${merchant} on ${date} for amount ${amount}`} // Enhanced accessibility label
    >
      {/* Left side: Icon Placeholder + Merchant/Date */}
      <div className="flex items-center overflow-hidden mr-2"> {/* Added overflow-hidden & mr-2 */}
        {/* Initials Icon */}
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3 shrink-0 border"> {/* Use muted, add border */}
          <span className="text-sm font-medium text-muted-foreground"> {/* Slightly smaller font */}
             {merchantInitials}
          </span>
        </div>
        {/* Merchant Name & Date */}
        <div className="min-w-0"> {/* Prevent text overflow issues */}
          <p className="font-medium text-sm truncate" title={merchant}>{merchant}</p> {/* Added truncate */}
          <p className="text-xs text-muted-foreground">{date}</p> {/* Use text-xs */}
        </div>
      </div>

      {/* Right side: Amount */}
      {/* Use semantic color (text-foreground or text-gray-900 for dark text in light mode) */}
      {/* Keep specific font size if required by design */}
      <span className="text-[0.95rem] font-medium text-foreground shrink-0 ml-2"> {/* Use text-foreground, ensure no shrinking */}
        {amount}
      </span>
    </button>
  );
};

export default TransactionItem;