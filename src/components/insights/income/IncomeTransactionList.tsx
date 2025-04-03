
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const IncomeTransactionList = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{t('insights.salary')}</p>
            <p className="text-sm text-muted-foreground">{t('insights.monthlyIncome')}</p>
          </div>
          <p className="font-medium text-[#222222]">+5200,00€</p>
        </div>
      </Card>
    </div>
  );
};
