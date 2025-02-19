
import { Card } from "@/components/ui/card";
import { Wallet, Landmark, CreditCard, PiggyBank } from "lucide-react";

const accounts = [
  { 
    id: 1,
    title: "Total Wealth",
    amount: "12,540",
    items: [
      { icon: Wallet, label: "Cash", amount: "3,540" },
      { icon: Landmark, label: "Savings", amount: "9,000" },
    ]
  }
];

const TotalWealth = () => {
  return (
    <Card className="p-6 mb-6">
      <div className="relative">
        {accounts.map((account) => (
          <div key={account.id}>
            <h3 className="font-semibold mb-4">{account.title}</h3>
            <div className="text-2xl font-semibold mb-4">zł {account.amount}</div>
            <div className="space-y-3">
              {account.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-medium">zł {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TotalWealth;
