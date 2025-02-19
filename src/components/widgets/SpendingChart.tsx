
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const mockSpendingData = [
  { day: "1", amount: 120 },
  { day: "5", amount: 80 },
  { day: "10", amount: 200 },
  { day: "15", amount: 150 },
  { day: "20", amount: 180 },
  { day: "25", amount: 90 },
  { day: "30", amount: 140 },
];

const SpendingChart = () => (
  <Card className="p-6 mb-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
    <h3 className="font-semibold mb-4">Spent This Month</h3>
    <div className="h-[200px] w-full">
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
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            style={{ opacity: 0.8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export default SpendingChart;
