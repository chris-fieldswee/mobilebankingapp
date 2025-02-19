
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { ArrowDownIcon } from "lucide-react";

const mockSpendingData = [
  { day: "1", amount: 2100 },
  { day: "6", amount: 2450 },
  { day: "11", amount: 2800 },
  { day: "16", amount: 3100 },
  { day: "21", amount: 3400 },
  { day: "28", amount: 3680 },
];

const SpendingChart = () => {
  const currentSpent = 2540;
  const totalReceived = 8497;

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Spent this month</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">zł {currentSpent}</span>
          <div className="flex items-center text-emerald-500 text-sm">
            <ArrowDownIcon className="h-4 w-4" />
            <span>zł {totalReceived}</span>
          </div>
        </div>
      </div>
      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockSpendingData}>
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
              stroke="#00b894"
              strokeWidth={2}
              dot={false}
              style={{ opacity: 0.8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-right text-sm text-muted-foreground mt-2">
        zł 3.68k
      </div>
    </Card>
  );
};

export default SpendingChart;
