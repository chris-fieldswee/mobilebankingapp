
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const cashflowData = [
  { month: "Feb", moneyIn: 852, moneyOut: 2551 }
];

const moneyInData = [
  { name: "Top ups", amount: 850, transactions: 1, percentage: "100%" },
  { name: "Cashback", amount: 1.93, transactions: 38, percentage: "<1%" }
];

const moneyOutData = [
  { name: "Health", amount: 929, transactions: 4, percentage: "36%" },
  { name: "Shopping", amount: 482, transactions: 9, percentage: "19%" }
];

const CashflowTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Net Cashflow · This month</p>
          <h2 className="text-3xl font-semibold text-destructive">-zł 1,699</h2>
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
                variant={period === "1M" ? "default" : "outline"}
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
            <span className="text-sm font-medium">zł 852</span>
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
                  <p className="font-medium text-emerald-500">+zł {item.amount}</p>
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
            <span className="text-sm font-medium">-zł 2,551</span>
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
                  <p className="font-medium text-destructive">-zł {item.amount}</p>
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
