
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const periodData = {
  "1M": [
    { name: "Jan", amount: 5000 },
    { name: "Feb", amount: 5000 },
    { name: "Mar", amount: 5000 },
  ],
  "6M": [
    { name: "Oct", amount: 5000 },
    { name: "Nov", amount: 5000 },
    { name: "Dec", amount: 5000 },
    { name: "Jan", amount: 5000 },
    { name: "Feb", amount: 5000 },
    { name: "Mar", amount: 5000 },
  ],
  "1Y": [
    { name: "Q2 23", amount: 15000 },
    { name: "Q3 23", amount: 15000 },
    { name: "Q4 23", amount: 15000 },
    { name: "Q1 24", amount: 15000 },
  ],
  "1W": [
    { name: "Mon", amount: 0 },
    { name: "Tue", amount: 0 },
    { name: "Wed", amount: 5000 },
    { name: "Thu", amount: 0 },
    { name: "Fri", amount: 0 },
    { name: "Sat", amount: 0 },
    { name: "Sun", amount: 0 },
  ]
};

const IncomeTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const incomeData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Income · This month</p>
          <h2 className="text-3xl font-semibold text-emerald-500">$ 5,000</h2>
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

      <div className="space-y-3">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Salary</p>
              <p className="text-sm text-muted-foreground">Monthly income</p>
            </div>
            <p className="font-medium text-emerald-500">+$ 5,000</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IncomeTab;
