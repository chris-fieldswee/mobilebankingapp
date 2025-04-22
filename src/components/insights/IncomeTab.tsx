// REMOVED: import { useTranslation } from "react-i18next";
import { IncomeChart } from "./income/IncomeChart"; // Assuming path
import { IncomeNotice } from "./income/IncomeNotice"; // Assuming path
import { IncomeTransactionList } from "./income/IncomeTransactionList"; // Assuming path
import { periodData, monthlyIncome } from "./income/incomeData"; // Assuming path and data

const IncomeTab = () => {
  // REMOVED: const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
           {/* Hardcoded text */}
          <p className="text-sm text-muted-foreground">Income · This Month</p>
          {/* Ensure formatting is correct */}
          <h2 className="text-3xl font-semibold text-[#222222]">{monthlyIncome.toLocaleString('en-GB', { style: 'currency', currency: 'SAR' })}</h2>
        </div>

        <IncomeChart periodData={periodData} />
      </div>

      <IncomeNotice />

      <IncomeTransactionList />
    </div>
  );
};

export default IncomeTab;