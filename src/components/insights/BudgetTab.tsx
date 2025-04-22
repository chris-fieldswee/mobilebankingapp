import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar"; // Assuming path
import { AlertCircle, Calendar, Coins } from "lucide-react";
// REMOVED: import { useTranslation } from "react-i18next";

const BudgetTab = () => {
  // REMOVED: const { t } = useTranslation();

  // Actual data: goal 4000€ and spent 3600€ (remaining: 400€)
  const budget = 4000;
  const spent = 3600;
  const remainingBudget = Math.max(budget - spent, 0); // 400
  const progress = (spent / budget) * 100; // 90%
  const isOverBudget = spent > budget;
  const utilizationPercentage = Math.min(Math.round((spent / budget) * 100), 100);

  // Upcoming transactions with hardcoded English names
  const upcomingTransactions = [
    { name: "Tuition Fee", dueIn: 5, amount: 8000 },
    { name: "Netflix Subscription", dueIn: 3, amount: 15 },
    { name: "Spotify Premium", dueIn: 7, amount: 10 }
  ];

  const totalUpcoming = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-4">
      {/* Monthly budget circular */}
      <Card className="p-4 text-center">
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[280px]">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={24}
              availableColor="#F4F4F5"
              spentColor="url(#blueGradient)" // Make sure this gradient is defined elsewhere or replace
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <p className="text-sm text-muted-foreground">
                 {/* Hardcoded text */}
                Monthly Budget
              </p>
              <span className="text-3xl font-bold">€ {remainingBudget.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground">
                 {/* Hardcoded text */}
                9 days left
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Budget message */}
      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              {isOverBudget
                 // Hardcoded interpolated string
                ? `You are €${(spent - budget).toLocaleString()} over budget.`
                 // Hardcoded interpolated string
                : `${utilizationPercentage}% used (€${remainingBudget.toLocaleString()} of €${budget.toLocaleString()} remaining)`
              }
            </p>
          </div>
        </div>
      </Card>

       {/* Message about upcoming transactions - Hardcoded */}
      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              Your upcoming transactions (€{totalUpcoming.toLocaleString()}) significantly exceed your remaining budget for this month (€{remainingBudget.toLocaleString()}). To ensure these payments are made, consider transferring funds from your savings account.
            </p>
          </div>
        </div>
      </Card>


      {/* Upcoming transactions summary */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
               {/* Hardcoded text */}
              <p className="font-medium">Upcoming Transactions</p>
              <p className="text-sm text-muted-foreground">
                {upcomingTransactions.length} transactions
              </p>
            </div>
          </div>
          <span className="font-medium">€ {totalUpcoming.toLocaleString()}</span>
        </div>
      </Card>

      {/* Monthly expenses summary - Hardcoded */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Coins className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
              <p className="font-medium">Spent this month</p>
              <p className="text-sm text-muted-foreground">51 transactions</p> {/* Example count */}
            </div>
          </div>
          <span className="font-medium">€ {spent.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
};

export default BudgetTab;