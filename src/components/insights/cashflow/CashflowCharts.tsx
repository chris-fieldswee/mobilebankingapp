import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
// REMOVED: import { useTranslation } from "react-i18next";

// Period filter options
const periodOptions = ["1W", "1M", "6M", "1Y"];

// Dummy data for different periods (NOTE: Contains non-English labels like 'Lun', 'Mar', 'Mié', 'Ene')
// You might want to update this data later if needed for consistency.
const periodData = {
  "1W": [
    { month: "Lun", moneyIn: 0, moneyOut: 75 },
    { month: "Mar", moneyIn: 0, moneyOut: 85 },
    { month: "Mié", moneyIn: 5000, moneyOut: 65 },
    { month: "Jue", moneyIn: 0, moneyOut: 45 },
    { month: "Vie", moneyIn: 0, moneyOut: 30 },
    { month: "Sáb", moneyIn: 0, moneyOut: 0 },
    { month: "Dom", moneyIn: 0, moneyOut: 0 },
  ],
  "1M": [
    { month: "Jan", moneyIn: 5000, moneyOut: 2100 }, // Changed Ene -> Jan
    { month: "Feb", moneyIn: 5000, moneyOut: 2300 },
    { month: "Mar", moneyIn: 5000, moneyOut: 2450 },
  ],
  "6M": [
    { month: "Sep", moneyIn: 52000, moneyOut: 26500 },
    { month: "Oct", moneyIn: 52000, moneyOut: 27800 },
    { month: "Nov", moneyIn: 52000, moneyOut: 25900 },
    { month: "Dec", moneyIn: 52000, moneyOut: 29600 }, // Changed Dic -> Dec
    { month: "Jan", moneyIn: 52000, moneyOut: 27200 }, // Changed Ene -> Jan
    { month: "Feb", moneyIn: 60000, moneyOut: 28400 },
  ],
  "1Y": [
    { month: "Q2 23", moneyIn: 15000, moneyOut: 7200 }, // Changed T2 -> Q2 etc.
    { month: "Q3 23", moneyIn: 15000, moneyOut: 6900 },
    { month: "Q4 23", moneyIn: 15000, moneyOut: 7200 },
    { month: "Q1 24", moneyIn: 15000, moneyOut: 6850 },
  ],
};

// Projected balance data (NOTE: Contains non-English labels)
const predictionData = [
  { name: "Actual", amount: 1600 },
  { name: "End of month", amount: -6425 }, // Changed 'Fin de mes'
];

interface CashflowChartsProps {
  currentBalance: number;
}

export const CashflowCharts = ({ currentBalance }: CashflowChartsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [activeChart, setActiveChart] = useState(0);
  // REMOVED: const { t } = useTranslation();

  // Get the data for the selected period
  // Assuming you want English data if you update the keys above
  const cashflowData = periodData[selectedPeriod as keyof typeof periodData]; // Type assertion added

  // Define chart info with hardcoded English titles
  const charts = [
    {
      title: "Monthly Cashflow", // REPLACED: t("insights.monthlyCashflow")
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
            <Bar dataKey="moneyOut" fill="#f0f5fd" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Projected Balance", // REPLACED: t("insights.projectedBalance")
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
            <ReferenceLine y={0} stroke="#E5E7EB" />
            <Bar dataKey="amount" fill="#3366FF" radius={[4, 4, 0, 0]}>
              {predictionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.amount < 0 ? "#f0f5fd" : "#3366FF"} // Using different colors based on value
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{charts[activeChart].title}</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setActiveChart((prev) => (prev === 0 ? charts.length - 1 : prev - 1))
            }
            aria-label="Previous chart" // Added aria-label for accessibility
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setActiveChart((prev) => (prev === charts.length - 1 ? 0 : prev + 1))
            }
             aria-label="Next chart" // Added aria-label for accessibility
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-[200px] w-full">
        {charts[activeChart].chart}
      </div>

      {/* Show period buttons only for Monthly Cashflow */}
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
  );
};

// NOTE: You might still need to update the actual data within `periodData`
// (e.g., "Lun", "Mar", "Mié", "Ene") and `predictionData` ("Fin de mes")
// if you want those labels in the chart axes to be in English as well.
// I've made some sample changes (like Ene -> Jan) but review them for your needs.