
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart, ArrowRight } from "lucide-react";
import { BarChart, Bar, PieChart as RechartPie, Pie, Cell, ResponsiveContainer, XAxis } from "recharts";
import { useNavigate } from "react-router-dom";

const periodOptions = ["1W", "1M", "6M", "1Y"];
const spendingData = [
  { name: "1-7", amount: 450 },
  { name: "8-14", amount: 1200 },
  { name: "15-21", amount: 750 },
  { name: "22-28", amount: 0 },
];

const categoryData = [
  { name: "Health", amount: 929, transactions: 4, percentage: 36, color: "#00B8D9" },
  { name: "Shopping", amount: 482, transactions: 9, percentage: 19, color: "#FF5630" },
  { name: "Groceries", amount: 456, transactions: 22, percentage: 18, color: "#36B37E" },
  { name: "Restaurants", amount: 319, transactions: 10, percentage: 12, color: "#FF8B00" },
  { name: "Cash", amount: 220, transactions: 2, percentage: 9, color: "#00875A" },
];

const SpendingTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const navigate = useNavigate();

  const totalSpent = 2551;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Spent · This month</p>
            <h2 className="text-3xl font-semibold">zł {totalSpent}</h2>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
          >
            {chartType === "bar" ? (
              <PieChart className="h-4 w-4" />
            ) : (
              <BarChart2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Card className="p-6">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={spendingData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="amount"
                    fill="#FF5630"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <RechartPie>
                  <Pie
                    data={categoryData}
                    dataKey="amount"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartPie>
              )}
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

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">By Category</h3>
          <Button variant="ghost" className="text-primary text-sm px-0">
            Manage
          </Button>
        </div>

        <div className="space-y-3">
          {categoryData.map((category) => (
            <Card
              key={category.name}
              className="p-4 flex items-center justify-between hover:bg-accent cursor-pointer"
              onClick={() => navigate('/transactions')}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div 
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.transactions} transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">-zł {category.amount}</p>
                  <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingTab;
