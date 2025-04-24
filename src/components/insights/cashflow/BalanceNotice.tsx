import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
// REMOVED: import { useTranslation } from "react-i18next";

export const BalanceNotice = () => {
  // REMOVED: const { t } = useTranslation();

  // Define English text directly
  const noticeText = "Your current balance is high! Consider moving some funds to savings.";

  return (
    <Card className="p-4 bg-card">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#2663eb] flex items-center justify-center flex-shrink-0">
          <TrendingUp className="h-5 w-5 text-[#fff]" />
        </div>
        <div>
          <p className="text-sm">
            {/* REPLACED: t("insights.highBalanceNotice") */}
            {noticeText}
          </p>
        </div>
      </div>
    </Card>
  );
};

// Add export default if needed: export default BalanceNotice;