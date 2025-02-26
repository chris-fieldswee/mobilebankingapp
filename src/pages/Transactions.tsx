
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation();

  const categories = [
    {
      name: "Dining",
      total: "﷼2,040",
      items: [
        { merchant: "Nusr-Et Steakhouse", amount: "-﷼1,200", date: "Mar 15" },
        { merchant: "Okku", amount: "-﷼450", date: "Mar 14" },
        { merchant: "Elements at Four Seasons", amount: "-﷼350", date: "Mar 13" },
        { merchant: "Five Elephants Coffee Roasters", amount: "-﷼40", date: "Mar 12" }
      ]
    },
    {
      name: "Shopping",
      total: "﷼11,300",
      items: [
        { merchant: "Harvey Nichols", amount: "-﷼8,800", date: "Mar 15" },
        { merchant: "Balenciaga at Harvey Nichols", amount: "-﷼2,500", date: "Mar 14" }
      ]
    },
    {
      name: "Transportation",
      total: "﷼4,150",
      items: [
        { merchant: "Mercedes-Benz", amount: "-﷼3,500", date: "Mar 10" },
        { merchant: "Saudi Aramco", amount: "-﷼500", date: "Mar 9" },
        { merchant: "Uber Black", amount: "-﷼150", date: "Mar 8" }
      ]
    },
    {
      name: "Entertainment",
      total: "﷼3,750",
      items: [
        { merchant: "Fitness First Platinum", amount: "-﷼1,500", date: "Mar 7" },
        { merchant: "Riyadh Season events", amount: "-﷼2,000", date: "Mar 6" },
        { merchant: "VOX Cinemas Gold", amount: "-﷼250", date: "Mar 5" }
      ]
    },
    {
      name: "Groceries",
      total: "﷼2,650",
      items: [
        { merchant: "Danube Gourmet", amount: "-﷼1,200", date: "Mar 4" },
        { merchant: "Organic Foods and Café", amount: "-﷼500", date: "Mar 3" },
        { merchant: "Manuel Market", amount: "-﷼800", date: "Mar 2" },
        { merchant: "Tamimi Markets", amount: "-﷼150", date: "Mar 1" }
      ]
    },
    {
      name: "Bills",
      total: "﷼3,300",
      items: [
        { merchant: "Saudi Electricity Company", amount: "-﷼1,500", date: "Mar 1" },
        { merchant: "STC Fiber", amount: "-﷼500", date: "Mar 1" },
        { merchant: "STC Platinum", amount: "-﷼500", date: "Mar 1" },
        { merchant: "Helpling", amount: "-﷼800", date: "Mar 1" }
      ]
    },
    {
      name: "Wellness",
      total: "",
      items: [
        { merchant: "Four Seasons Spa", amount: "-﷼1,210", date: "Mar 1" }
      ]
    }
  ];

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
                {categories.map((category, index) => (
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
