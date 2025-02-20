
import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";
import { AlertTriangle, Calendar, Coins } from "lucide-react";

const BudgetTab = () => {
  const budget = 2000;
  const spent = 2450;
  const excess = spent - budget;
  const progress = (spent / budget) * 100;
  const isOverBudget = spent > budget;

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Budget · This month</p>
          <h2 className="text-3xl font-semibold">zł {budget}</h2>
        </div>

        <Card className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <CircularProgressBar
                percentage={Math.min(progress, 100)}
                strokeWidth={12}
                color={isOverBudget ? '#555555' : '#222222'}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isOverBudget ? (
                  <>
                    <span className="text-3xl font-bold text-destructive">+zł {excess}</span>
                    <span className="text-sm text-muted-foreground">over budget</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold">zł {spent}</span>
                    <span className="text-sm text-muted-foreground">of zł {budget}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

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
            <span className="font-medium text-destructive">zł {excess}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="h-5 w-5 text-foreground" />
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
                <Coins className="h-5 w-5 text-foreground" />
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
    </div>
  );
};

export default BudgetTab;
