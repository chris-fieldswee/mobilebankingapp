import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
// REMOVED: import { useTranslation } from "react-i18next";

// Period data types
interface PeriodData {
  name: string;
  amount: number;
}

interface PeriodDataMap {
  [key: string]: PeriodData[];
}

// Props
interface IncomeChartProps {
  periodData: PeriodDataMap;
}

export const IncomeChart = ({ periodData }: IncomeChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  // REMOVED: const { t } = useTranslation();
  const periodOptions = ["1M", "6M", "1Y"];
  const incomeData = periodData[selectedPeriod as keyof typeof periodData]; // Type assertion needed

  return (
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
  );
};

// Assuming the file path is something like: src/components/insights/cashflow/IncomeChart.tsx
// Please ensure you save this code to the correct file.