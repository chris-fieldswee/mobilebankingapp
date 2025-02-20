
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const periodData = {
  "1M": [
    { month: "Jan", moneyIn: 5000, moneyOut: 2100 },
    { month: "Feb", moneyIn: 5000, moneyOut: 2300 },
    { month: "Mar", moneyIn: 5000, moneyOut: 2450 }
  ],
  "6M": [
    { month: "Oct", moneyIn: 5000, moneyOut: 2200 },
    { month: "Nov", moneyIn: 5000, moneyOut: 2400 },
    { month: "Dec", moneyIn: 5000, moneyOut: 2600 },
    { month: "Jan", moneyIn: 5000, moneyOut: 2100 },
    { month: "Feb", moneyIn: 5000, moneyOut: 2300 },
    { month: "Mar", moneyIn: 5000, moneyOut: 2450 }
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
  { name: "Salary", amount: 5000, transactions: 1, percentage: "100%" }
];

const moneyOutData = [
  { name: "Dining", amount: 1200, transactions: 28, percentage: "25%" },
  { name: "Shopping", amount: 800, transactions: 15, percentage: "16%" }
];

const CashflowTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const cashflowData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Net Cashflow · This month</p>
          <h2 className="text-3xl font-semibold">$ {5000 - 2450}</h2>
        </div>

        <Card className="p-6">
          <div className="h-[200px] w-full">
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
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Money In</h3>
            <span className="text-sm font-medium">$ 5,000</span>
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
                  <p className="font-medium text-emerald-500">+$ {item.amount}</p>
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
            <span className="text-sm font-medium">-$ 2,450</span>
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
                  <p className="font-medium text-destructive">-$ {item.amount}</p>
                  <p className="text-sm text-muted-foreground">{item.percentage}</p>
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
