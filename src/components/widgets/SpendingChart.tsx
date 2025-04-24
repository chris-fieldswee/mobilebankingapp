import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { ArrowUpIcon } from "lucide-react"; // Assuming positive change

// Define spending data with SAR values
// Example cumulative spending progression for a month
const mockSpendingData = {
  en: [
    { day: "1", amount: 500 },  // Start of month
    { day: "6", amount: 1800 },
    { day: "11", amount: 3200 },
    { day: "16", amount: 4500 },
    { day: "21", amount: 5800 },
    { day: "28", amount: 6500 }, // End of month total
  ],
};

// Define currency and total amount for SAR
const currencies = {
  en: { currencyCode: "SAR", amount: 6500 }, // Total amount matching last data point
};

const SpendingChart = () => {
  const currentSpendingData = mockSpendingData.en;
  const currencyInfo = currencies.en;
  // Adjust percentage change text if needed, make it plausible
  const percentageChangeText = "+5.1% this month";

  // Format the main amount display
  const totalAmountFormatted = currencyInfo.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); // Whole number for main display

  return (
    <Card className="p-6 mb-6">
      <div className="mb-2">
        <h3 className="font-semibold text-sm text-muted-foreground">Spent This Month</h3>
        <div className="flex items-center gap-2">
          {/* Format: 6,500 SAR */}
          <span className="text-2xl font-semibold">{totalAmountFormatted} {currencyInfo.currencyCode}</span>
           {/* Percentage change indicator */}
           {/* Consider making icon dynamic (ArrowDownIcon if negative) */}
          <div className="flex items-center text-green-600 text-sm"> {/* Use green for increase */}
            <ArrowUpIcon className="h-4 w-4" />
            <span>{percentageChangeText}</span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentSpendingData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}> {/* Added margin */}
            <defs>
              {/* Keep gradient or use solid color */}
              <linearGradient id="spendingLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} /> {/* Blue gradient start */}
                <stop offset="100%" stopColor="#2563eb" stopOpacity={1} /> {/* Blue gradient end */}
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#888888" // Muted axis color
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10} // Move ticks down slightly
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#spendingLine)" // Use gradient defined above
              strokeWidth={2.5}
              dot={false} // Hide dots on line
              // Removed style={{ opacity: 0.8 }} unless desired
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SpendingChart;