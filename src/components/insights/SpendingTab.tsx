// src/components/insights/SpendingTab.tsx

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowRight, BarChart2, ShoppingBag, ShoppingCart, Lightbulb, Car, Utensils, Plane, Smartphone, Package, ListFilter
} from "lucide-react";
import {
  BarChart,
  Bar,
  // Cell, // No longer needed for Bar coloring
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { useNavigate } from "react-router-dom";

// --- V1 Data Adapted for V1 (Using Lucide Icons, SAR currency) ---
const categoriesV1 = [
  { name: "Shopping", value: 9050, icon: ShoppingBag, percentage: 31.7 },
  { name: "Groceries", value: 600, icon: ShoppingCart, percentage: 2.1 },
  { name: "Utilities", value: 450, icon: Lightbulb, percentage: 1.6 },
  { name: "Transport", value: 300, icon: Car, percentage: 1.1 },
  { name: "Dining", value: 1500, icon: Utensils, percentage: 5.3 },
  { name: "Travel", value: 2800, icon: Plane, percentage: 9.8 },
  { name: "Subscriptions", value: 550, icon: Smartphone, percentage: 1.9 },
  { name: "Other", value: 13150, icon: Package, percentage: 46.5 }
].filter(cat => cat.value > 0)
 .sort((a, b) => b.value - a.value);

// --- REMOVED categoryChartColors array ---

const totalSpending = 28400;
const currencySymbol = "SAR";
const timePeriods = ["This Month", "Last Month", "Last 3 Months"];

const SpendingTab = () => {
  const [timePeriod, setTimePeriod] = useState("This Month");
  const navigate = useNavigate();

  const formatCurrency = useCallback((amount: number) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return `-${formattedAmount} ${currencySymbol}`;
  }, []);

  const handleTimePeriodChange = (period: string) => {
    setTimePeriod(period);
    console.log("Time period changed to:", period);
  };

  // Updated Tooltip (Removed color swatch)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {/* Display formatted spending amount */}
          <p className="text-sm text-primary">{`Spent: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="space-y-6">

       {/* Time Period Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {timePeriods.map((period) => (
          <Button key={period} variant={timePeriod === period ? "default" : "outline"} size="sm" className="whitespace-nowrap text-xs sm:text-sm" onClick={() => handleTimePeriodChange(period)} > {period} </Button>
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
              <BarChart data={categoriesV1} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                {/* --- ADDED Gradient Definition --- */}
                <defs>
                    <linearGradient id="spendingBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" /> {/* Light Blue */}
                      <stop offset="100%" stopColor="#3B82F6" /> {/* Darker Blue */}
                    </linearGradient>
                </defs>
                {/* --- END Gradient Definition --- */}

                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} interval={0} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', radius: 2 }} />
                {/* --- UPDATED Bar Component --- */}
                <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    fill="url(#spendingBarGradient)" // Apply gradient fill to all bars
                >
                    {/* Removed Cell mapping - fill is now applied to the Bar */}
                </Bar>
                 {/* --- END UPDATED Bar Component --- */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category List Section */}
      <div>
        {/* ... (Category list header remains the same) ... */}
         <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Spending By Category</h3>
          <Button variant="ghost" className="text-primary text-sm h-auto p-0" onClick={() => navigate('/transactions')}> See All </Button>
        </div>

        <div className="space-y-3">
          {/* Map over categoriesV1 */}
          {categoriesV1.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.name}
                  className="p-3 sm:p-4 flex items-center justify-between hover:bg-accent cursor-pointer"
                  onClick={() => navigate(`/transactions?category=${encodeURIComponent(category.name)}`)}
                  role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/transactions?category=${encodeURIComponent(category.name)}`)}}
                >
                   {/* ... (List item rendering remains the same, using Lucide icons and bg-muted) ... */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted border">
                           {IconComponent ? ( <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" /> ) : ( <span className="text-xs sm:text-sm font-medium text-muted-foreground">{category.name[0]}</span> )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.percentage}% of total</p>
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