
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, PieChart, ArrowRight, TrendingUp, Utensils, ShoppingBag, Car, Popcorn, ShoppingCart, Receipt, Heart } from "lucide-react";
import { BarChart, Bar, PieChart as RechartPie, Pie, Cell, ResponsiveContainer, XAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SpendingTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Format currency with Euro symbol
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }).format(amount);
  }, [i18n.language]);

  // Translate period options
  const periodOptions = [
    { value: "1W", label: t("time.oneWeek") },
    { value: "1M", label: t("time.oneMonth") }
  ];

  const periodData = {
    "1W": [
      { name: t("time.monday"), amount: 75 },
      { name: t("time.tuesday"), amount: 85 },
      { name: t("time.wednesday"), amount: 65 },
      { name: t("time.thursday"), amount: 45 },
      { name: t("time.friday"), amount: 30 },
      { name: t("time.saturday"), amount: 0 },
      { name: t("time.sunday"), amount: 0 }
    ],
    "1M": [
      { name: "1-7", amount: 300 },
      { name: "8-14", amount: 350 },
      { name: "15-21", amount: 250 },
      { name: "22-28", amount: 300 }
    ]
  };

  const blueShades = [
    "#0F4C81", "#2B6CA3", "#478DC5", "#63AEE7", "#7FCFF9", "#9BE0FB", "#B7F1FD"
  ];

  const categoryData = [
    { name: t("categories.dining"), amount: 2040, transactions: 4, percentage: 19, color: blueShades[0], icon: Utensils },
    { name: t("categories.shopping"), amount: 11300, transactions: 2, percentage: 9.5, color: blueShades[1], icon: ShoppingBag },
    { name: t("categories.transportation"), amount: 4150, transactions: 3, percentage: 14.3, color: blueShades[2], icon: Car },
    { name: t("categories.entertainment"), amount: 3750, transactions: 3, percentage: 14.3, color: blueShades[3], icon: Popcorn },
    { name: t("categories.groceries"), amount: 2650, transactions: 4, percentage: 19, color: blueShades[4], icon: ShoppingCart },
    { name: t("categories.bills"), amount: 3300, transactions: 4, percentage: 19, color: blueShades[5], icon: Receipt },
    { name: t("categories.wellness"), amount: 1210, transactions: 1, percentage: 4.9, color: blueShades[6], icon: Heart }
  ];

  const totalSpent = 28400;
  const spendingData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6" key={i18n.language}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">{t('spending.spentThisMonth')} · {t('insights.thisMonth')}</p>
            <h2 className="text-3xl font-semibold">{formatCurrency(totalSpent)}</h2>
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
                      <Cell key={`${index}-${i18n.language}`} fill={entry.color} />
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
                  key={`${period.value}-${i18n.language}`}
                  variant={selectedPeriod === period.value ? "default" : "outline"}
                  onClick={() => setSelectedPeriod(period.value)}
                  className="flex-1"
                >
                  {period.label}
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
              {t('spending.insight')}
            </p>
            <Button 
              variant="default" 
              className="w-full sm:w-auto"
            >
              {t('spending.setBudget')}
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">{t('spending.byCategory')}</h3>
          <Button variant="ghost" className="text-primary text-sm px-0">
            {t('actions.seeAll')}
          </Button>
        </div>

        <div className="space-y-3">
          {categoryData.map((category, idx) => (
            <Card
              key={`${idx}-${i18n.language}`}
              className="p-4 flex items-center justify-between hover:bg-accent cursor-pointer"
              onClick={() => navigate('/transactions')}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center"
                >
                  <category.icon className="h-5 w-5 text-[#888888]" />
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.transactions} {t('spending.transactions')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-[#222222] text-[0.95rem]">{formatCurrency(-category.amount)}</p>
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
