import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";
import { AlertCircle, Calendar, Coins } from "lucide-react";

const BudgetTab = () => {
  const budget = 2000;
  const spent = 2450;
  const excess = spent - budget;
  const progress = (spent / budget) * 100;
  const isOverBudget = spent > budget;
  const remainingBudget = Math.max(budget - spent, 0);
  const utilizationPercentage = Math.min(Math.round((spent / budget) * 100), 100);

  return (
    <div className="space-y-6">
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="relative w-96 h-96">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={12}
              color={isOverBudget ? '#555555' : '#222222'}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <p className="text-sm text-muted-foreground">Budget · This month</p>
              <p className="text-3xl font-semibold">zł {budget}</p>
              {isOverBudget ? (
                <>
                  <span className="text-5xl font-bold text-[#222222]">+zł {excess}</span>
                  <span className="text-sm text-muted-foreground">over budget</span>
                </>
              ) : (
                <>
                  <span className="text-5xl font-bold">zł {spent}</span>
                  <span className="text-sm text-muted-foreground">of zł {budget}</span>
                </>
              )}
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
              Heads up! You've used {utilizationPercentage}% of your budget for this month. 
              You have zł {remainingBudget} left to spend. Stay mindful of your spending to reach your budgeting target.
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
              <p className="text-sm text-muted-foreground">1 transaction</p>
            </div>
          </div>
          <span className="font-medium">zł 55.99</span>
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
          <span className="font-medium">zł {spent}</span>
        </div>
      </Card>
    </div>
  );
};

export default BudgetTab;
