
import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";
import { AlertCircle, Calendar, Coins } from "lucide-react";

const BudgetTab = () => {
  const budget = 35000;
  const spent = 31600;
  const remainingBudget = Math.max(budget - spent, 0);
  const progress = (spent / budget) * 100;
  const isOverBudget = spent > budget;
  const utilizationPercentage = Math.min(Math.round((spent / budget) * 100), 100);

  // Upcoming transactions
  const upcomingTransactions = [
    { name: "Tuition Fee", dueIn: 5, amount: 80000 },
    { name: "Netflix Subscription", dueIn: 3, amount: 45 },
    { name: "Spotify Premium", dueIn: 7, amount: 20 }
  ];
  
  const totalUpcoming = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="relative w-[340px] h-[340px]">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={12}
              availableColor="#F4F4F5"
              spentColor="#0064fa"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <p className="text-lg text-muted-foreground">Available</p>
              <span className="text-5xl font-bold">﷼ {remainingBudget.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground mt-2">9 days left</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              {isOverBudget 
                ? `You've exceeded your budget by ﷼${(spent - budget).toLocaleString()}. Consider reviewing your spending to get back on track.`
                : `You've used ${utilizationPercentage}% of your ﷼${budget.toLocaleString()} budget. 
                   You have ﷼${remainingBudget.toLocaleString()} left to spend this month.`
              }
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
              <p className="font-medium">Upcoming</p>
              <p className="text-sm text-muted-foreground">{upcomingTransactions.length} transactions</p>
            </div>
          </div>
          <span className="font-medium">﷼ {totalUpcoming.toLocaleString()}</span>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Coins className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
              <p className="font-medium">Spent this month</p>
              <p className="text-sm text-muted-foreground">51 transactions</p>
            </div>
          </div>
          <span className="font-medium">﷼ {spent.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
};

export default BudgetTab;
