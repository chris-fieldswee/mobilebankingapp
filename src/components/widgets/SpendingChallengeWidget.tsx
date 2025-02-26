
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const SpendingChallengeWidget = () => {
  const { t } = useTranslation();
  const spent = 28400;
  const goal = 35000;
  const progress = Math.min((spent / goal) * 100, 100);
  const isOverBudget = spent > goal;

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col">
        <h3 className="font-semibold mb-3">{t('budget.monthlyBudget')}</h3>
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
            ﷼{spent.toLocaleString()} {t('budget.spent')}
          </span>
          <span className="text-muted-foreground">﷼{goal.toLocaleString()} {t('budget.goal')}</span>
        </div>
        {isOverBudget && (
          <p className="text-sm text-destructive mt-2">
            ﷼{(spent - goal).toLocaleString()} {t('budget.overBudget')}
          </p>
        )}
      </div>
    </Card>
  );
};

export default SpendingChallengeWidget;
