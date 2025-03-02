
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const RecentTransactions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const formatCurrency = useCallback((amount: string) => {
    const numericAmount = amount.replace(/[^0-9.-]/g, '');
    const isNegative = amount.startsWith('-');
    
    // Format based on language
    const formattedAmount = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }).format(Math.abs(Number(numericAmount)));

    return isNegative ? `-${formattedAmount}` : formattedAmount;
  }, [i18n.language]);

  const recentTransactions = [
    {
      id: "1",
      merchant: t("merchants.harveyNichols"),
      amount: formatCurrency("-450"),
      date: t("time.today"),
      category: t("categories.shopping")
    },
    {
      id: "2",
      merchant: t("merchants.nusret"),
      amount: formatCurrency("-200"),
      date: t("time.yesterday"),
      category: t("categories.dining")
    },
    {
      id: "3",
      merchant: t("merchants.fourSeasonsSpa"),
      amount: formatCurrency("-210"),
      date: t("time.date", { date: "Mar 15" }),
      category: t("categories.wellness")
    }
  ];

  return (
    <Card className="p-6 mb-6 bg-white" key={i18n.language}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{t('transactions.recent')}</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
          {t('actions.seeAll')}
        </Button>
      </div>
      
      <div className="space-y-1">
        {recentTransactions.map((transaction) => (
          <TransactionItem
            key={`${transaction.id}-${i18n.language}`}
            merchant={transaction.merchant}
            amount={transaction.amount}
            date={transaction.date}
            id={transaction.id}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
