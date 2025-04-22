import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { ArrowUpIcon } from "lucide-react";
// REMOVE: import { useTranslation } from "react-i18next";

// Keep your English spending data or define it here
const mockSpendingData = {
  en: [
    { day: "1", amount: 15000 },
    { day: "6", amount: 18000 },
    { day: "11", amount: 22000 },
    { day: "16", amount: 24000 },
    { day: "21", amount: 26000 },
    { day: "28", amount: 28400 },
  ],
   // other languages removed for simplicity if not needed
};

const currencies = {
  en: { symbol: "€", amount: 28400 },
   // other languages removed for simplicity if not needed
};

const SpendingChart = () => {
  // REMOVE: const { t, i18n } = useTranslation();
  // USE English data directly:
  const currentSpendingData = mockSpendingData.en;
  const currency = currencies.en;
  // Define percentage change text explicitly (based on your initial screenshot)
  const percentageChangeText = "+2.3% this month"; // Or derive dynamically if needed

  return (
    <Card className="p-6 mb-6">
      <div className="mb-2">
         {/* REPLACE t() call with hardcoded string */}
        <h3 className="font-semibold text-sm text-muted-foreground">Spent This Month</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">{currency.symbol} {currency.amount.toLocaleString()}</span>
          <div className="flex items-center text-emerald-500 text-sm">
            <ArrowUpIcon className="h-4 w-4" />
             {/* REPLACE t() call with hardcoded or dynamic string */}
            <span>{percentageChangeText}</span>
          </div>
        </div>
      </div>
      <div className="h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentSpendingData}>
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