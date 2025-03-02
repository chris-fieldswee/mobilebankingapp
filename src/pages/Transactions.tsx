
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";

const Transactions = () => {
  const { t, i18n } = useTranslation();
  const [processedCategories, setProcessedCategories] = useState<any[]>([]);

  // Helper function to format currency - moved to useCallback
  const formatCurrency = useCallback((amount: string) => {
    const numericAmount = amount.replace(/[^0-9.-]/g, '');
    const isNegative = amount.startsWith('-');
    
    // Format based on language
    const formattedAmount = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'SAR',
      currencyDisplay: 'symbol'
    }).format(Math.abs(Number(numericAmount)));

    // Replace standard currency symbol with €
    const finalAmount = formattedAmount.replace(/SAR|SR|\$|€/g, '€');
    return isNegative ? `-${finalAmount}` : finalAmount;
  }, [i18n.language]);

  // Helper function to format date - moved to useCallback
  const formatDate = useCallback((dateStr: string) => {
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
  }, [i18n.language]);

  // Process categories - moved to a separate useEffect
  useEffect(() => {
    console.log('Language changed:', i18n.language); // Debug log
    
    const categoriesData = [
      {
        name: 'dining',
        total: "€2,040",
        items: [
          { merchant: 'nusret', amount: "-€1,200", date: "Mar 15" },
          { merchant: 'okku', amount: "-€450", date: "Mar 14" },
          { merchant: 'elements', amount: "-€350", date: "Mar 13" },
          { merchant: 'fiveElephants', amount: "-€40", date: "Mar 12" }
        ]
      },
      {
        name: 'shopping',
        total: "€11,300",
        items: [
          { merchant: 'harveyNichols', amount: "-€8,800", date: "Mar 15" },
          { merchant: 'balenciaga', amount: "-€2,500", date: "Mar 14" }
        ]
      },
      {
        name: 'transportation',
        total: "€4,150",
        items: [
          { merchant: 'mercedes', amount: "-€3,500", date: "Mar 10" },
          { merchant: 'aramco', amount: "-€500", date: "Mar 9" },
          { merchant: 'uber', amount: "-€150", date: "Mar 8" }
        ]
      },
      {
        name: 'entertainment',
        total: "€3,750",
        items: [
          { merchant: 'fitnessFirst', amount: "-€1,500", date: "Mar 7" },
          { merchant: 'riyadhSeason', amount: "-€2,000", date: "Mar 6" },
          { merchant: 'voxCinemas', amount: "-€250", date: "Mar 5" }
        ]
      },
      {
        name: 'groceries',
        total: "€2,650",
        items: [
          { merchant: 'danube', amount: "-€1,200", date: "Mar 4" },
          { merchant: 'organicFoods', amount: "-€500", date: "Mar 3" },
          { merchant: 'manuel', amount: "-€800", date: "Mar 2" },
          { merchant: 'tamimi', amount: "-€150", date: "Mar 1" }
        ]
      },
      {
        name: 'bills',
        total: "€3,300",
        items: [
          { merchant: 'sec', amount: "-€1,500", date: "Mar 1" },
          { merchant: 'stcFiber', amount: "-€500", date: "Mar 1" },
          { merchant: 'stcPlatinum', amount: "-€500", date: "Mar 1" },
          { merchant: 'helpling', amount: "-€800", date: "Mar 1" }
        ]
      },
      {
        name: 'wellness',
        total: "",
        items: [
          { merchant: 'fourSeasonsSpa', amount: "-€1,210", date: "Mar 1" }
        ]
      }
    ];

    const processed = categoriesData.map(category => ({
      name: t(`categories.${category.name}`),
      total: category.total ? formatCurrency(category.total) : "",
      items: category.items.map(item => ({
        merchant: t(`merchants.${item.merchant}`),
        amount: formatCurrency(item.amount),
        date: formatDate(item.date)
      }))
    }));

    console.log('Processed categories:', processed); // Debug log
    setProcessedCategories(processed);
  }, [i18n.language, t, formatCurrency, formatDate]);

  return (
    <div className="fixed inset-0 bg-background" key={i18n.language}>
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
                  <div key={`${index}-${i18n.language}`}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">
                      {category.name}
                      {category.total && ` (${t('transactions.total')}: ${category.total})`}
                    </h2>
                    <div className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <TransactionItem
                          key={`${itemIndex}-${i18n.language}`}
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
