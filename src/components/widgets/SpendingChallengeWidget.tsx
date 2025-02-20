
import { Card } from "@/components/ui/card";

const SpendingChallengeWidget = () => {
  const spent = 2450;
  const goal = 2000;
  const progress = Math.min((spent / goal) * 100, 100);
  const isOverBudget = spent > goal;

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col">
        <h3 className="font-semibold mb-3">Monthly Budget</h3>
        <div className="h-2 w-full bg-secondary rounded-full mb-3">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-destructive' : 'bg-[#222222]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className={isOverBudget ? 'text-destructive' : 'text-muted-foreground'}>
            ${spent.toLocaleString()} spent
          </span>
          <span className="text-muted-foreground">${goal.toLocaleString()} goal</span>
        </div>
        {isOverBudget && (
          <p className="text-sm text-destructive mt-2">
            ${(spent - goal).toLocaleString()} over budget
          </p>
        )}
      </div>
    </Card>
  );
};

export default SpendingChallengeWidget;
