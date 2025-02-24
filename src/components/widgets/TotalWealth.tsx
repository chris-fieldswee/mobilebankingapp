
import { Card } from "@/components/ui/card";
import { Wallet, Landmark, CreditCard, PiggyBank, Calculator } from "lucide-react";

const accounts = [
  { 
    id: 1,
    title: "Total Wealth",
    amount: "926,500",
    items: [
      { 
        section: "Assets",
        total: "926,500",
        details: [
          { icon: Wallet, label: "Current Account", amount: "36,500" },
          { icon: Landmark, label: "Savings", amount: "890,000" }
        ]
      }
    ]
  }
];

const TotalWealth = () => {
  return (
    <Card className="p-6 mb-6 bg-white">
      <div className="space-y-6">
        {accounts.map((account) => (
          <div key={account.id}>
            <h3 className="font-semibold">{account.title}</h3>
            <div className="text-2xl font-semibold mb-8 text-[0.95rem]">﷼ {account.amount}</div>
            
            {account.items.map((section, idx) => (
              <div key={idx} className="space-y-4 mb-12 last:mb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">{section.section}</h4>
                  <span className="font-medium text-[0.95rem]">﷼ {section.total}</span>
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
                      <span className="font-medium text-[0.95rem]">﷼ {item.amount}</span>
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
