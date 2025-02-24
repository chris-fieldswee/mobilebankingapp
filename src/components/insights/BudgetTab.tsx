
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

  const upcomingTransactions = [
    { name: "Tuition Fee", dueIn: 5, amount: 80000 },
    { name: "Netflix Subscription", dueIn: 3, amount: 45 },
    { name: "Spotify Premium", dueIn: 7, amount: 20 }
  ];
  
  const totalUpcoming = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-4">
      <Card className="p-4 text-center">
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[280px]">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={24}
              availableColor="#F4F4F5"
              spentColor="url(#blueGradient)"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <p className="text-sm text-muted-foreground">Available</p>
              <span className="text-3xl font-bold">﷼ {remainingBudget.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground">9 days left</p>
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
                : `You've used `}
              <span className="font-bold">{utilizationPercentage}%</span>
              {!isOverBudget && ` of your ﷼${budget.toLocaleString()} budget. 
                   You have ﷼${remainingBudget.toLocaleString()} left to spend this month.`}
            </p>
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
              Your upcoming transactions (﷼{totalUpcoming.toLocaleString()}) significantly exceed your remaining budget for this month (﷼{remainingBudget.toLocaleString()}). To ensure these payments go through, consider taking a loan or transferring funds from your savings account.
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
