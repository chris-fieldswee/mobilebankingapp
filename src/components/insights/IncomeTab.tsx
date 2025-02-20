
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const periodOptions = ["1W", "1M", "6M", "1Y"];
const incomeData = [
  { name: "Jan", amount: 3500 },
  { name: "Feb", amount: 3500 },
  { name: "Mar", amount: 3500 },
];

const IncomeTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Income · This month</p>
          <h2 className="text-3xl font-semibold text-emerald-500">zł 3,500</h2>
        </div>

        <Card className="p-6">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey="amount"
                  fill="#36B37E"
                  radius={[4, 4, 0, 0]}
                />
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

      <div className="space-y-3">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Salary</p>
              <p className="text-sm text-muted-foreground">Monthly income</p>
            </div>
            <p className="font-medium text-emerald-500">+zł 3,500</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IncomeTab;
