
import { useTranslation } from "react-i18next";
import { IncomeChart } from "./income/IncomeChart";
import { IncomeNotice } from "./income/IncomeNotice";
import { IncomeTransactionList } from "./income/IncomeTransactionList";
import { periodData, monthlyIncome } from "./income/incomeData";

const IncomeTab = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{t('insights.income')} · {t('insights.thisMonth')}</p>
          <h2 className="text-3xl font-semibold text-[#222222]">{monthlyIncome.toFixed(2)}€</h2>
        </div>

        <IncomeChart periodData={periodData} />
      </div>

      <IncomeNotice />

      <IncomeTransactionList />
    </div>
  );
};

export default IncomeTab;
