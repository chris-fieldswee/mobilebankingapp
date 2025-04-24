import { Card } from "@/components/ui/card";

// Define budget data directly using SAR with more realistic amounts
const budgetData = {
  // Key 'en' kept for consistency, represents SAR data
  en: {
      spent: 2175.50, // Updated realistic spent amount
      goal: 2500.00,  // Updated realistic goal amount
      currency: "SAR"
    },
};

const SpendingChallengeWidget = () => {
  const currentBudget = budgetData.en;
  // Use currency code instead of symbol for SAR formatting
  const { spent, goal, currency } = currentBudget;
  // Calculate progress (ensure goal is not zero)
  const progress = goal > 0 ? Math.min((spent / goal) * 100, 100) : 0;
  // Check if over budget (spent > goal)
  const isOverBudget = spent > goal; // This will be false with the new values

  // Format numbers for display
  const spentFormatted = spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const goalFormatted = goal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); // Goal as whole number
  // Calculate over budget amount only if applicable
  const overBudgetAmountFormatted = isOverBudget
    ? (spent - goal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00'; // Default to 0.00 if not over budget

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col">
        {/* Title - Make it specific */}
        <h3 className="font-semibold mb-3">Food & Drink Budget</h3>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-secondary rounded-full mb-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              // Use destructive background only if actually over budget
              isOverBudget ? 'bg-destructive' : 'progress-bar-gradient' // Ensure progress-bar-gradient CSS class exists
            }`}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Food and drink budget progress" // Added aria-label
          />
        </div>

        {/* Text Labels */}
        <div className="flex justify-between text-sm">
          {/* Spent Amount */}
          {/* Use appropriate text color */}
          <span className={isOverBudget ? 'text-destructive' : 'text-muted-foreground'}>
            {spentFormatted} {currency} Spent
          </span>
          {/* Goal Amount */}
          <span className="text-muted-foreground">
            {goalFormatted} {currency} Goal
          </span>
        </div>

        {/* Over Budget Indicator - Only show if isOverBudget is true */}
        {isOverBudget && (
          <p className="text-sm text-destructive mt-2 font-medium">
            {overBudgetAmountFormatted} {currency} Over Budget
          </p>
        )}
      </div>
    </Card>
  );
};

export default SpendingChallengeWidget;