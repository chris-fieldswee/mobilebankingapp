import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart, ArrowRight, TrendingUp } from "lucide-react";
import { BarChart, Bar, PieChart as RechartPie, Pie, Cell, ResponsiveContainer, XAxis } from "recharts";
import { useNavigate, useSearchParams } from "react-router-dom";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const periodData = {
  "1W": [
    { name: "Mon", amount: 75 },
    { name: "Tue", amount: 85 },
    { name: "Wed", amount: 65 },
    { name: "Thu", amount: 45 },
    { name: "Fri", amount: 30 },
    { name: "Sat", amount: 0 },
    { name: "Sun", amount: 0 }
  ],
  "1M": [
    { name: "1-7", amount: 300 },
    { name: "8-14", amount: 350 },
    { name: "15-21", amount: 250 },
    { name: "22-28", amount: 300 }
  ],
  "6M": [
    { name: "Oct", amount: 1200 },
    { name: "Nov", amount: 1300 },
    { name: "Dec", amount: 1500 },
    { name: "Jan", amount: 1200 },
    { name: "Feb", amount: 1100 },
    { name: "Mar", amount: 1400 }
  ],
  "1Y": [
    { name: "Q2 23", amount: 3600 },
    { name: "Q3 23", amount: 3400 },
    { name: "Q4 23", amount: 4000 },
    { name: "Q1 24", amount: 3400 }
  ]
};

const categoryData = [
  { name: "Dining", amount: 1200, transactions: 28, percentage: 25, color: "#222222" },
  { name: "Shopping", amount: 800, transactions: 15, percentage: 16, color: "#333333" },
  { name: "Transportation", amount: 300, transactions: 12, percentage: 6, color: "#444444" },
  { name: "Entertainment", amount: 400, transactions: 8, percentage: 8, color: "#555555" },
  { name: "Groceries", amount: 850, transactions: 20, percentage: 17, color: "#666666" },
  { name: "Bills", amount: 1400, transactions: 6, percentage: 28, color: "#777777" }
];

const SpendingTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const totalSpent = 2450;
  const spendingData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Spent · This month</p>
            <h2 className="text-3xl font-semibold">$ {totalSpent}</h2>
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
                    fill="#222222"
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

      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              Noticed a trend? Your restaurant spending has increased by 20% over the last 3 months. Want to stay on top of your dining budget?
            </p>
            <Button 
              variant="default" 
              className="w-full sm:w-auto"
            >
              Set a Budget
            </Button>
          </div>
        </div>
      </Card>

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
                  <p className="font-medium text-destructive">-$ {category.amount}</p>
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
