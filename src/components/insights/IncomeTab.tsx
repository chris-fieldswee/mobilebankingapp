import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const periodOptions = ["1M", "6M", "1Y"];

const periodData = {
  "1M": [
    { name: "Dec", amount: 52000 },
    { name: "Jan", amount: 52000 },
    { name: "Feb", amount: 60000 },
  ],
  "6M": [
    { name: "Sep", amount: 52000 },
    { name: "Oct", amount: 52000 },
    { name: "Nov", amount: 52000 },
    { name: "Dec", amount: 52000 },
    { name: "Jan", amount: 52000 },
    { name: "Feb", amount: 60000 },
  ],
  "1Y": [
    { name: "Q2 24", amount: 156000 }, // 3 x 52,000
    { name: "Q3 24", amount: 156000 }, // 3 x 52,000
    { name: "Q4 24", amount: 156000 }, // 3 x 52,000
    { name: "Q1 25", amount: 104000 }, // 2 x 52,000 (no March data yet)
  ]
};

const IncomeTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const { t } = useTranslation();
  const incomeData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{t('insights.income')} · {t('insights.thisMonth')}</p>
          <h2 className="text-3xl font-semibold text-[#222222]">5200,00€</h2>
        </div>

        <Card className="p-6">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#incomeGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-2 mt-4">
            {periodOptions.map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                onClick={() => setSelectedPeriod(period)}
                className="flex-1"
              >
                {period}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              ¿Notaste un aumento de salario? ¡Felicidades! ¿Qué tal disfrutar de mayor flexibilidad con nuestra Tarjeta de Crédito Platinum?
            </p>
            <Button 
              variant="default" 
              className="w-full sm:w-auto"
            >
              Ver Beneficios
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t('insights.salary')}</p>
              <p className="text-sm text-muted-foreground">{t('insights.monthlyIncome')}</p>
            </div>
            <p className="font-medium text-[#222222]">+5200,00€/p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IncomeTab;
