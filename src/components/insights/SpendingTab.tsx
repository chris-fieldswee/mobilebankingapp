import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowRight, BarChart2, ShoppingBag, ShoppingCart, Lightbulb, Car, Utensils, Plane, Smartphone, Package, ListFilter
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { useNavigate } from "react-router-dom";

// --- V1 Data Adapted for V1 (Using Lucide Icons, SAR currency) ---
// Assuming this data structure is appropriate
const categoriesV1 = [
  { name: "Shopping", value: 9050, icon: ShoppingBag, percentage: 31.7 },
  { name: "Groceries", value: 600, icon: ShoppingCart, percentage: 2.1 },
  { name: "Utilities", value: 450, icon: Lightbulb, percentage: 1.6 },
  { name: "Transport", value: 300, icon: Car, percentage: 1.1 },
  { name: "Dining", value: 1500, icon: Utensils, percentage: 5.3 }, // Changed from Food & Drink for consistency if needed
  { name: "Travel", value: 2800, icon: Plane, percentage: 9.8 },
  { name: "Subscriptions", value: 550, icon: Smartphone, percentage: 1.9 }, // Example, ensure data matches actual expenses
].filter(cat => cat.value > 0)
 .sort((a, b) => b.value - a.value);

const totalSpending = categoriesV1.reduce((sum, cat) => sum + cat.value, 0); // Calculate total dynamically
const currencySymbol = "SAR";
const timePeriods = ["This Month", "Last Month", "Last 3 Months"]; // Example time periods

const SpendingTab = () => {
  const [timePeriod, setTimePeriod] = useState("This Month");
  const navigate = useNavigate();

  // Format currency for display (negative for spending)
  const formatCurrency = useCallback((amount: number) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    // Only add sign if amount is non-zero
    const sign = amount !== 0 ? "-" : "";
    return `${sign}${formattedAmount} ${currencySymbol}`;
  }, []);

  const handleTimePeriodChange = (period: string) => {
    setTimePeriod(period);
    // Add logic here to fetch/filter data based on the selected period
    console.log("Time period changed to:", period);
  };

  // Custom Tooltip for Bar Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow-lg text-xs">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm text-primary">{`Spent: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  // --- Navigation Handler for Category Click ---
  const handleCategoryClick = (categoryName: string) => {
      navigate(`/spending/category/${encodeURIComponent(categoryName)}`);
  };


  return (
    <div className="space-y-6">

       {/* Time Period Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {timePeriods.map((period) => (
          <Button
             key={period}
             variant={timePeriod === period ? "default" : "outline"}
             size="sm"
             className="whitespace-nowrap text-xs sm:text-sm"
             onClick={() => handleTimePeriodChange(period)}
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Chart Section */}
      <div>
        <div className="mb-4">
            <p className="text-sm text-muted-foreground">Spent ({timePeriod})</p>
            <h2 className="text-3xl font-semibold">{formatCurrency(totalSpending)}</h2>
         </div>

        <Card className="p-4 sm:p-6">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesV1} margin={{ top: 5, right: 5, left: -25, bottom: -10 }}> {/* Adjusted bottom margin */}
                <defs>
                    <linearGradient id="spendingBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" /> {/* Light Blue */}
                      <stop offset="100%" stopColor="#3B82F6" /> {/* Darker Blue */}
                    </linearGradient>
                </defs>
                {/* --- UPDATED XAxis: Added tick={false} --- */}
                <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10} // Font size doesn't matter if ticks are hidden
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tick={false} // Hide the tick labels
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', radius: 2 }} />
                <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    fill="url(#spendingBarGradient)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category List Section */}
      <div>
         <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Spending By Category</h3>
          <Button variant="ghost" className="text-primary text-sm h-auto p-0" onClick={() => navigate('/accounts/acc1/transactions')}> See All </Button>
        </div>

        <div className="space-y-3">
          {categoriesV1.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.name}
                  className="p-3 sm:p-4 flex items-center justify-between hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleCategoryClick(category.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick(category.name)}}
                  aria-label={`View transactions for ${category.name}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted border">
                           {IconComponent ? ( <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" /> ) : ( <span className="text-xs sm:text-sm font-medium text-muted-foreground">{category.name[0]}</span> )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {totalSpending > 0 ? ((category.value / totalSpending) * 100).toFixed(1) : 0}% of total
                          </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-right">
                           <p className="font-medium text-foreground text-sm">{formatCurrency(category.value)}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SpendingTab;
