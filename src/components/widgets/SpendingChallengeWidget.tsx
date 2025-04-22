import { Card } from "@/components/ui/card";
// REMOVE: import { useTranslation } from "react-i18next";

// Keep your English budget data or define it here directly
const budgetData = {
  en: { spent: 3600, goal: 4000, symbol: "€" },
  // other languages removed for simplicity if not needed
};

const SpendingChallengeWidget = () => {
  // REMOVE: const { t, i18n } = useTranslation();
  // USE English data directly:
  const currentBudget = budgetData.en;
  const { spent, goal, symbol } = currentBudget;
  const progress = Math.min((spent / goal) * 100, 100);
  const isOverBudget = spent > goal;

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col">
        {/* REPLACE t() call with hardcoded string */}
        <h3 className="font-semibold mb-3">Monthly Budget</h3>
        <div className="h-2 w-full bg-secondary rounded-full mb-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-destructive' : 'progress-bar-gradient'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className={isOverBudget ? 'text-destructive' : 'text-muted-foreground'}>
            {/* REPLACE t() call with hardcoded string */}
            {symbol}{spent.toLocaleString()} Spent
          </span>
          {/* REPLACE t() call with hardcoded string */}
          <span className="text-muted-foreground">{symbol}{goal.toLocaleString()} Goal</span>
        </div>
        {isOverBudget && (
          <p className="text-sm text-destructive mt-2">
             {/* REPLACE t() call with hardcoded string */}
            {symbol}{(spent - goal).toLocaleString()} Over Budget
          </p>
        )}
      </div>
    </Card>
  );
};

export default SpendingChallengeWidget;