
import { Card } from "@/components/ui/card";

const SpendingChallengeWidget = () => (
  <Card className="p-6 mb-6 bg-gradient-to-br from-green-500/10 to-yellow-500/10">
    <div className="flex flex-col">
      <h3 className="font-semibold mb-3">Your Spending Challenge</h3>
      <div className="h-2 w-full bg-secondary rounded-full mb-3">
        <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">$1,450 spent</span>
        <span className="text-muted-foreground">$2,000 goal</span>
      </div>
      <p className="text-sm text-green-600 font-medium">
        You're 70% to your goal – keep it up!
      </p>
    </div>
  </Card>
);

export default SpendingChallengeWidget;
