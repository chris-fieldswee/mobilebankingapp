
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { ArrowUpIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const mockSpendingData = [
  { day: "1", amount: 15000 },
  { day: "6", amount: 18000 },
  { day: "11", amount: 22000 },
  { day: "16", amount: 24000 },
  { day: "21", amount: 26000 },
  { day: "28", amount: 28400 },
];

const SpendingChart = () => {
  const { t } = useTranslation();
  const currentSpent = 28400;

  return (
    <Card className="p-6 mb-6">
      <div className="mb-2">
        <h3 className="font-semibold text-sm text-muted-foreground">{t('spending.spentThisMonth')}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">﷼ {currentSpent.toLocaleString()}</span>
          <div className="flex items-center text-emerald-500 text-sm">
            <ArrowUpIcon className="h-4 w-4" />
            <span>{t('spending.percentChange')}</span>
          </div>
        </div>
      </div>
      <div className="h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockSpendingData}>
            <defs>
              <linearGradient id="spendingLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#spendingLine)"
              strokeWidth={2.5}
              dot={false}
              style={{ opacity: 0.8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SpendingChart;
