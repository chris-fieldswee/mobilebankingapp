
import { Card } from "@/components/ui/card";

const SpendingChallengeWidget = () => {
  const spent = 1450;
  const goal = 2000;
  const progress = (spent / goal) * 100;

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-green-500/10 to-yellow-500/10">
      <div className="flex flex-col">
        <h3 className="font-semibold mb-3">Your Spending Challenge</h3>
        <div className="h-2 w-full bg-secondary rounded-full mb-3">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">${spent.toLocaleString()} spent</span>
          <span className="text-muted-foreground">${goal.toLocaleString()} goal</span>
        </div>
      </div>
    </Card>
  );
};

export default SpendingChallengeWidget;
