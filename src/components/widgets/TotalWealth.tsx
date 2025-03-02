
import { Card } from "@/components/ui/card";
import { Wallet, Landmark, CreditCard, PiggyBank, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

const wealthData = {
  en: {
    totalWealth: "615,000",
    currentAccount: "24,000",
    savings: "591,000",
    symbol: "€"
  },
  ar: {
    totalWealth: "926,500",
    currentAccount: "36,500",
    savings: "890,000",
    symbol: "﷼"
  },
  es: {
    totalWealth: "196,000",
    currentAccount: "6,000",
    savings: "190,000",
    symbol: "€"
  }
};

const TotalWealth = () => {
  const { t, i18n } = useTranslation();
  const currentWealth = wealthData[i18n.language as keyof typeof wealthData] || wealthData.en;

  const accounts = [
    { 
      id: 1,
      title: t('wealth.totalWealth'),
      amount: currentWealth.totalWealth,
      items: [
        { 
          section: t('wealth.assets'),
          total: currentWealth.totalWealth,
          details: [
            { icon: Wallet, label: t('wealth.currentAccount'), amount: currentWealth.currentAccount },
            { icon: Landmark, label: t('wealth.savings'), amount: currentWealth.savings }
          ]
        }
      ]
    }
  ];

  return (
    <Card className="p-6 mb-6 bg-white">
      <div className="space-y-6">
        {accounts.map((account) => (
          <div key={account.id}>
            <h3 className="font-semibold">{account.title}</h3>
            <div className="text-2xl font-semibold mb-8">{currentWealth.symbol} {account.amount}</div>
            
            {account.items.map((section, idx) => (
              <div key={idx} className="space-y-4 mb-12 last:mb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">{section.section}</h4>
                  <span className="font-medium text-[0.95rem]">{currentWealth.symbol} {section.total}</span>
                </div>
                <div className="space-y-3">
                  {section.details.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-[#222222]" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <span className="font-medium text-[0.95rem]">{currentWealth.symbol} {item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TotalWealth;
