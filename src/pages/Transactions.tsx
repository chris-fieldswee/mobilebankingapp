
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t, i18n } = useTranslation();

  // Helper function to format currency
  const formatCurrency = (amount: string) => {
    const numericAmount = amount.replace(/[^0-9.-]/g, '');
    const isNegative = amount.startsWith('-');
    
    // Format based on language
    const formattedAmount = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'SAR',
      currencyDisplay: 'symbol'
    }).format(Math.abs(Number(numericAmount)));

    // Replace standard currency symbol with ﷼
    const finalAmount = formattedAmount.replace(/SAR|SR|\$|€/g, '﷼');
    return isNegative ? `-${finalAmount}` : finalAmount;
  };

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split(" ");
    const monthNumber = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    }[month as keyof typeof monthNumber] || 1;

    const date = new Date(2024, monthNumber - 1, parseInt(day));
    return new Intl.DateTimeFormat(i18n.language, {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const categories = [
    {
      name: "Dining",
      total: "﷼2,040",
      items: [
        { merchant: t('merchants.nusret'), amount: "-﷼1,200", date: "Mar 15" },
        { merchant: t('merchants.okku'), amount: "-﷼450", date: "Mar 14" },
        { merchant: t('merchants.elements'), amount: "-﷼350", date: "Mar 13" },
        { merchant: t('merchants.fiveElephants'), amount: "-﷼40", date: "Mar 12" }
      ]
    },
    {
      name: "Shopping",
      total: "﷼11,300",
      items: [
        { merchant: t('merchants.harveyNichols'), amount: "-﷼8,800", date: "Mar 15" },
        { merchant: t('merchants.balenciaga'), amount: "-﷼2,500", date: "Mar 14" }
      ]
    },
    {
      name: "Transportation",
      total: "﷼4,150",
      items: [
        { merchant: t('merchants.mercedes'), amount: "-﷼3,500", date: "Mar 10" },
        { merchant: t('merchants.aramco'), amount: "-﷼500", date: "Mar 9" },
        { merchant: t('merchants.uber'), amount: "-﷼150", date: "Mar 8" }
      ]
    },
    {
      name: "Entertainment",
      total: "﷼3,750",
      items: [
        { merchant: t('merchants.fitnessFirst'), amount: "-﷼1,500", date: "Mar 7" },
        { merchant: t('merchants.riyadhSeason'), amount: "-﷼2,000", date: "Mar 6" },
        { merchant: t('merchants.voxCinemas'), amount: "-﷼250", date: "Mar 5" }
      ]
    },
    {
      name: "Groceries",
      total: "﷼2,650",
      items: [
        { merchant: t('merchants.danube'), amount: "-﷼1,200", date: "Mar 4" },
        { merchant: t('merchants.organicFoods'), amount: "-﷼500", date: "Mar 3" },
        { merchant: t('merchants.manuel'), amount: "-﷼800", date: "Mar 2" },
        { merchant: t('merchants.tamimi'), amount: "-﷼150", date: "Mar 1" }
      ]
    },
    {
      name: "Bills",
      total: "﷼3,300",
      items: [
        { merchant: t('merchants.sec'), amount: "-﷼1,500", date: "Mar 1" },
        { merchant: t('merchants.stcFiber'), amount: "-﷼500", date: "Mar 1" },
        { merchant: t('merchants.stcPlatinum'), amount: "-﷼500", date: "Mar 1" },
        { merchant: t('merchants.helpling'), amount: "-﷼800", date: "Mar 1" }
      ]
    },
    {
      name: "Wellness",
      total: "",
      items: [
        { merchant: t('merchants.fourSeasonsSpa'), amount: "-﷼1,210", date: "Mar 1" }
      ]
    }
  ];

  const processedCategories = categories.map(category => ({
    ...category,
    total: category.total ? formatCurrency(category.total) : "",
    items: category.items.map(item => ({
      ...item,
      amount: formatCurrency(item.amount),
      date: formatDate(item.date)
    }))
  }));

  return (
    <div className="fixed inset-0 bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t('transactions.recent')}</h1>
        </div>
      </header>

      <main className="h-full pt-14">
        <ScrollArea className="h-full">
          <div className="max-w-md mx-auto p-4 pb-24">
            <Card className="p-6">
              <div className="space-y-6">
                {processedCategories.map((category, index) => (
                  <div key={index}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">
                      {t(`categories.${category.name.toLowerCase()}`)}
                      {category.total && ` (${t('transactions.total')}: ${category.total})`}
                    </h2>
                    <div className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <TransactionItem
                          key={itemIndex}
                          merchant={item.merchant}
                          amount={item.amount}
                          date={item.date}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Transactions;
