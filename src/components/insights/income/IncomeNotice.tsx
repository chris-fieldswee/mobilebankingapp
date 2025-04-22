import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
// REMOVED: import { useTranslation } from "react-i18next";

// Assuming this component lives somewhere like src/components/insights/IncomeNotice.tsx
// or src/components/insights/cashflow/IncomeNotice.tsx

export const IncomeNotice = () => {
  // REMOVED: const { t } = useTranslation();

  // Define the English text directly
  const noticeText = "Your salary has increased! See how it impacts your finances.";
  const buttonText = "View Benefits";

  return (
    <Card className="p-4 bg-accent">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
             {/* REPLACED: t('insights.salaryIncreaseNotice') */}
            {noticeText}
          </p>
          <Button
            variant="default"
            className="w-full sm:w-auto"
          >
             {/* REPLACED: t('insights.viewBenefits') */}
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Export the component if it's not already exported correctly elsewhere
// export default IncomeNotice; // Uncomment this if needed based on your file structure