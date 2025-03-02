
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UpcomingTransactions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }).format(amount);
  };

  const upcomingTransactions = [
    {
      icon: Calendar,
      title: t("transactions.tuitionFee"),
      days: "5",
      amount: formatCurrency(-8000)
    },
    {
      icon: Play,
      title: t("transactions.netflixSubscription"),
      days: "3",
      amount: formatCurrency(-15)
    },
    {
      icon: Music,
      title: t("transactions.spotifyPremium"),
      days: "7",
      amount: formatCurrency(-10)
    }
  ];

  return (
    <Card className="p-6 mb-6 bg-white" key={i18n.language}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{t('transactions.upcoming')}</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/upcoming-payments')}>
          {t('actions.seeAll')}
        </Button>
      </div>
      
      <div className="space-y-4">
        {upcomingTransactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <transaction.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-sm text-muted-foreground">
                  {t('transactions.dueIn', { days: transaction.days })}
                </p>
              </div>
            </div>
            <span className="text-[#222222] text-[0.95rem] font-medium">{transaction.amount}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTransactions;
