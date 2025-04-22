import { Card } from "@/components/ui/card";
// REMOVED: import { useTranslation } from "react-i18next";

export const IncomeTransactionList = () => {
  // REMOVED: const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div>
             {/* Hardcoded text */}
            <p className="font-medium">Salary</p>
            {/* Hardcoded text */}
            <p className="text-sm text-muted-foreground">Monthly Income</p>
          </div>
          <p className="font-medium text-[#222222]">SAR +60,000.00</p> {/* Note: Ensure comma format is desired */}
        </div>
      </Card>
      {/* Add more income items here if necessary */}
    </div>
  );
};

// Add export default if needed: export default IncomeTransactionList;