
import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";
import { AlertTriangle, Calendar, Coins } from "lucide-react";

const BudgetTab = () => {
  const budget = 2000;
  const spent = 2607.38;
  const progress = (spent / budget) * 100;
  const isOverBudget = spent > budget;

  return (
    <div className="space-y-6">
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">
          {isOverBudget ? 'Above target' : 'Below target'}
        </p>
        
        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={12}
              color={isOverBudget ? '#FF4444' : '#36B37E'}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">zł {spent.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">of zł {budget}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Card className="p-4 bg-destructive/5 border-destructive">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-destructive">Overspent</p>
                <p className="text-sm text-destructive/70">9 days left</p>
              </div>
            </div>
            <span className="font-medium text-destructive">zł 607</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
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
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Spent this month</p>
                <p className="text-sm text-muted-foreground">51 transactions</p>
              </div>
            </div>
            <span className="font-medium">zł 2,551.39</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTab;
