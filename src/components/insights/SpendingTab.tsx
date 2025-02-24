
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart, ArrowRight, TrendingUp, Utensils, ShoppingBag, Car, Popcorn, ShoppingCart, Receipt, Heart } from "lucide-react";
import { BarChart, Bar, PieChart as RechartPie, Pie, Cell, ResponsiveContainer, XAxis } from "recharts";
import { useNavigate } from "react-router-dom";

const periodOptions = ["1W", "1M"];

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
  ]
};

const blueShades = [
  "#0F4C81", // Darkest blue
  "#2B6CA3",
  "#478DC5",
  "#63AEE7",
  "#7FCFF9",
  "#9BE0FB",
  "#B7F1FD"  // Lightest blue
];

const categoryData = [
  { name: "Dining", amount: 2040, transactions: 4, percentage: 19, color: blueShades[0], icon: Utensils },
  { name: "Shopping", amount: 11300, transactions: 2, percentage: 9.5, color: blueShades[1], icon: ShoppingBag },
  { name: "Transportation", amount: 4150, transactions: 3, percentage: 14.3, color: blueShades[2], icon: Car },
  { name: "Entertainment", amount: 3750, transactions: 3, percentage: 14.3, color: blueShades[3], icon: Popcorn },
  { name: "Groceries", amount: 2650, transactions: 4, percentage: 19, color: blueShades[4], icon: ShoppingCart },
  { name: "Bills", amount: 3300, transactions: 4, percentage: 19, color: blueShades[5], icon: Receipt },
  { name: "Spa", amount: 1210, transactions: 1, percentage: 4.9, color: blueShades[6], icon: Heart }
];

const SpendingTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const navigate = useNavigate();

  const totalSpent = 28400;
  const spendingData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Spent · This month</p>
            <h2 className="text-3xl font-semibold">﷼ {totalSpent.toLocaleString()}</h2>
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
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <RechartPie>
                  <Pie
                    data={categoryData}
                    dataKey="percentage"
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

          {chartType === "bar" && (
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
          )}
        </Card>
      </div>

      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              Noticed a trend? Your restaurant spending has increased by <span className="font-bold">20% over the last 3 months</span>. Want to stay on top of your dining budget?
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
                  <category.icon className="h-5 w-5 text-[#888888]" />
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
                  <p className="font-medium text-[#222222] text-[0.95rem]">-﷼ {category.amount.toLocaleString()}</p>
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
