
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CashflowCharts } from "./cashflow/CashflowCharts";
import { BalanceNotice } from "./cashflow/BalanceNotice";
import { TransactionCategoryList } from "./cashflow/TransactionCategoryList";
import { UpcomingTransactionsList } from "./cashflow/UpcomingTransactionsList";
import { 
  moneyInData, 
  moneyOutData, 
  upcomingTransactions, 
  currentBalance, 
  totalExpenses,
  upcomingTotal
} from "./cashflow/cashflowData";

function CashflowTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Current Balance */}
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {t("insights.netCashflow")} · {t("insights.thisMonth")}
          </p>
          <h2 className="text-3xl font-semibold text-[#222222]">
            € {currentBalance.toLocaleString()}
          </h2>
        </div>

        <CashflowCharts currentBalance={currentBalance} />
      </div>

      {/* High Balance Notice */}
      <BalanceNotice />

      {/* Income */}
      <TransactionCategoryList 
        title={t("insights.income")} 
        categories={moneyInData} 
        totalAmount={moneyInData[0].amount} 
      />

      {/* Expenses */}
      <TransactionCategoryList 
        title={t("insights.expenses")} 
        categories={moneyOutData} 
        totalAmount={totalExpenses} 
      />

      {/* Upcoming Transactions */}
      <UpcomingTransactionsList 
        transactions={upcomingTransactions} 
        totalAmount={upcomingTotal} 
      />
    </div>
  );
}

export default CashflowTab;
