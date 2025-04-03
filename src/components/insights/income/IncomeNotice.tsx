
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const IncomeNotice = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="p-4 bg-accent">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            {t('insights.salaryIncreaseNotice')}
          </p>
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
          >
            {t('insights.viewBenefits')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
