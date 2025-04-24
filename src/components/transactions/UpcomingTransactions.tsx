import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Import relevant icons
import { Landmark, TrendingUp, Home } from "lucide-react"; // Using Landmark for Tuition
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const UpcomingTransactions = () => {
  const navigate = useNavigate();

  const formatCurrency = useCallback((amount: number) => {
    const numberFormatter = new Intl.NumberFormat('en-GB', { // Or 'en-SA'
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedAmount = numberFormatter.format(Math.abs(amount));
    const sign = amount < 0 ? "-" : "+";
    const currencySymbol = " SAR"; // Using SAR

    return { sign, amount: formattedAmount, symbol: currencySymbol };
  }, []);

  // --- CHANGE HERE: Updated mock data including Tuition Fee ---
  const upcomingTransactionsData = [
     {
      id: "ut1",
      icon: TrendingUp, // Example icon for Salary
      title: "Salary",
      days: "3", // Approx days until April 25th
      amount: 60000 // Positive for income
    },
    {
      id: "ut2",
      icon: Home, // Example icon for Rent
      title: "Rent Payment",
      days: "9", // Approx days until May 1st
      amount: -3000
    },
    {
      id: "ut3",
      icon: Landmark, // Using Landmark for Tuition Fee
      title: "Tuition Fee",
      // Feb 25, 2026 is approx 308 days from Apr 22, 2025
      // Displaying date might be better for far-off items, but sticking to 'days' for now
      days: "308",
      amount: -80000 // Amount from spec
    },
  ];

  return (
    <Card className="p-6 mb-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Upcoming Transactions</h3>
        <Button variant="ghost" size="sm">
          See All
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingTransactionsData.map((transaction) => {
           const formatted = formatCurrency(transaction.amount);
           const displayAmount = `${formatted.sign}${formatted.amount}${formatted.symbol}`;
           // Determine color based on income/expense
           const amountColor = transaction.amount >= 0 ? "text-[#333]" : "text-[#222222]";
           const dueText = parseInt(transaction.days) > 30 ? `Due Feb 25, 2026` : `Due in ${transaction.days} days`; // Example logic for display date vs days

           return (
             <div key={transaction.id} className="flex items-center justify-between">
               <div className="flex items-center">
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                   <transaction.icon className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium">{transaction.title}</p>
                   <p className="text-sm text-muted-foreground">
                     {/* Display date for far-off items? */}
                     {dueText}
                   </p>
                 </div>
               </div>
               {/* Apply color based on amount sign */}
               <span className={`text-[0.95rem] font-medium ${amountColor}`}>
                 {displayAmount}
               </span>
             </div>
           );
         })}
      </div>
    </Card>
  );
};

export default UpcomingTransactions;