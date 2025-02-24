
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import { useState } from "react";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const periodData = {
  "1M": [
    { month: "Jan", moneyIn: 5000, moneyOut: 2100 },
    { month: "Feb", moneyIn: 5000, moneyOut: 2300 },
    { month: "Mar", moneyIn: 5000, moneyOut: 2450 }
  ],
  "6M": [
    { month: "Sep", moneyIn: 52000, moneyOut: 26500 },
    { month: "Oct", moneyIn: 52000, moneyOut: 27800 },
    { month: "Nov", moneyIn: 52000, moneyOut: 25900 },
    { month: "Dec", moneyIn: 52000, moneyOut: 29600 },
    { month: "Jan", moneyIn: 52000, moneyOut: 27200 },
    { month: "Feb", moneyIn: 60000, moneyOut: 28400 }
  ],
  "1Y": [
    { month: "Q2 23", moneyIn: 15000, moneyOut: 7200 },
    { month: "Q3 23", moneyIn: 15000, moneyOut: 6900 },
    { month: "Q4 23", moneyIn: 15000, moneyOut: 7200 },
    { month: "Q1 24", moneyIn: 15000, moneyOut: 6850 }
  ],
  "1W": [
    { month: "Mon", moneyIn: 0, moneyOut: 75 },
    { month: "Tue", moneyIn: 0, moneyOut: 85 },
    { month: "Wed", moneyIn: 5000, moneyOut: 65 },
    { month: "Thu", moneyIn: 0, moneyOut: 45 },
    { month: "Fri", moneyIn: 0, moneyOut: 30 },
    { month: "Sat", moneyIn: 0, moneyOut: 0 },
    { month: "Sun", moneyIn: 0, moneyOut: 0 }
  ]
};

const moneyInData = [
  { name: "Salary", amount: 60000, transactions: 1, percentage: "100%" }
];

const moneyOutData = [
  { name: "Dining", amount: 2040, transactions: 4, percentage: "7%" },
  { name: "Shopping", amount: 11300, transactions: 2, percentage: "40%" },
  { name: "Transportation", amount: 4150, transactions: 3, percentage: "15%" },
  { name: "Entertainment", amount: 3750, transactions: 3, percentage: "13%" },
  { name: "Groceries", amount: 2650, transactions: 4, percentage: "9%" },
  { name: "Bills", amount: 3300, transactions: 4, percentage: "12%" },
  { name: "Spa", amount: 1210, transactions: 1, percentage: "4%" }
];

const upcomingTransactions = [
  { name: "Tuition Fee", amount: 80000, dueIn: "5 days" },
  { name: "Netflix Subscription", amount: 45, dueIn: "3 days" },
  { name: "Spotify Premium", amount: 20, dueIn: "7 days" }
];

const currentBalance = 60000 - moneyOutData.reduce((sum, item) => sum + item.amount, 0);
const upcomingTotal = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);
const predictedBalance = currentBalance - upcomingTotal;

const predictionData = [
  { name: "Current", amount: currentBalance },
  { name: "End of Month", amount: predictedBalance }
];

const CashflowTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [activeChart, setActiveChart] = useState(0);
  const cashflowData = periodData[selectedPeriod as keyof typeof periodData];

  const charts = [
    {
      title: "Monthly Cashflow",
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashflowData}>
            <XAxis 
              dataKey="month" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="moneyIn" fill="#3366FF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="moneyOut" fill="#FF5630" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "Projected Balance",
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={predictionData}>
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar 
              dataKey="amount" 
              fill={(data) => data.amount < 0 ? "#f0f5fd" : "#3366FF"}
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Net Cashflow · This month</p>
          <h2 className="text-3xl font-semibold text-[#222222]">﷼ {currentBalance.toLocaleString()}</h2>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">{charts[activeChart].title}</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveChart(prev => (prev === 0 ? charts.length - 1 : prev - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveChart(prev => (prev === charts.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="h-[200px] w-full">
            {charts[activeChart].title === "Monthly Cashflow" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowData}>
                  <defs>
                    <linearGradient id="moneyInGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="moneyIn" fill="url(#moneyInGradient)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="moneyOut" fill="#FF5630" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionData}>
                  <defs>
                    <linearGradient id="moneyInGradient" x1="0" y1="0" x2="0" y2="1">
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
                  <ReferenceLine y={0} stroke="#E5E7EB" />
                  <Bar 
                    dataKey="amount" 
                    fill={(data) => data.amount < 0 ? "#f0f5fd" : "url(#moneyInGradient)"}
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {activeChart === 0 && (
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
          <div>
            <p className="text-sm">
              Three consecutive months of exceptionally high balance!
            </p>
          </div>
        </div>
      </Card>

      <div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Money In</h3>
            <span className="text-sm font-medium text-[#222222]">﷼ {moneyInData[0].amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {moneyInData.map((item) => (
            <Card key={item.name} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.transactions} transaction{item.transactions !== 1 && 's'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#222222]">+﷼ {item.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{item.percentage}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Money Out</h3>
            <span className="text-sm font-medium text-[#222222]">-﷼ {moneyOutData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {moneyOutData.map((item) => (
            <Card key={item.name} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.transactions} transaction{item.transactions !== 1 && 's'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#222222]">-﷼ {item.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{item.percentage}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Upcoming Transactions</h3>
            <span className="text-sm font-medium text-[#222222]">-﷼ {upcomingTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingTransactions.map((item) => (
            <Card key={item.name} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Due in {item.dueIn}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#222222]">-﷼ {item.amount.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashflowTab;
