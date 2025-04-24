import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Recharts Imports for Donut Chart
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Lucide Icons Imports
import { Plane, ShoppingBag, Utensils, Lightbulb, Package, Leaf } from "lucide-react";

// --- V1 Carbon Data Structure ---
interface CarbonCategory {
  name: string;
  amount: number; // kg CO2e
  percentage: number;
  icon: React.ElementType;
}

const carbonDataV1 = {
  total: 1200, // kg CO2e
  categories: [
    { name: "Travel", amount: 600, percentage: 50, icon: Plane },
    { name: "Shopping", amount: 250, percentage: 21, icon: ShoppingBag },
    { name: "Food", amount: 150, percentage: 12, icon: Utensils },
    { name: "Utilities", amount: 100, percentage: 8, icon: Lightbulb },
    { name: "Other", amount: 100, percentage: 8, icon: Package }
  ].sort((a, b) => b.amount - a.amount)
};

const BLUE_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

// --- Carbon Tab Component ---
const CarbonTab = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState("this-month");

  const handleTimePeriodChange = (value: string) => {
    if (value) setTimePeriod(value);
    console.log("Time period changed to:", value);
  };

  // Custom Tooltip for Pie Chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background p-2 border rounded shadow-lg text-xs">
          <p className="font-medium">{`${data.name}`}</p>
          {/* Using Unicode subscript 2 for CO2 */}
          <p className="text-sm text-primary">{`${data.amount} kg CO₂e (${data.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">

      {/* Time Period Toggle */}
      <div className="flex justify-center">
         <ToggleGroup type="single" size="sm" value={timePeriod} onValueChange={handleTimePeriodChange}>
           <ToggleGroupItem value="this-month" aria-label="This Month">This Month</ToggleGroupItem>
           <ToggleGroupItem value="last-month" aria-label="Last Month">Last Month</ToggleGroupItem>
           <ToggleGroupItem value="three-months" aria-label="Last 3 Months">Last 3 Months</ToggleGroupItem>
         </ToggleGroup>
      </div>

      {/* Total Footprint Card */}
      <Card className="p-4 sm:p-6 text-center bg-muted/40">
        <p className="text-sm text-muted-foreground mb-1">Est. Footprint ({timePeriod === 'this-month' ? 'This Month' : 'Selected Period'})</p>
        {/* Using Unicode subscript 2 for CO2 */}
        <div className="text-3xl font-bold mb-2">{carbonDataV1.total.toLocaleString()} kg CO₂e</div>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p>~ Equivalent to driving a petrol car 5,500 km.</p>
          <p>~ Carbon absorption of 6 trees annually.</p>
        </div>
      </Card>

      {/* Category Breakdown (Donut Chart) */}
      <div>
        <h3 className="text-base font-semibold mb-3 text-center">Category Breakdown</h3>
        <Card className="p-4 sm:p-6">
          {/* Chart Container */}
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={carbonDataV1.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  fill="#8884d8"
                  paddingAngle={3}
                  cornerRadius={5}
                  dataKey="percentage"
                  nameKey="name"
                >
                  {carbonDataV1.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                {/* --- Use Default Legend with updated style --- */}
                <Legend
                    iconSize={10}
                    // Added color property to wrapperStyle
                    wrapperStyle={{ fontSize: '12px', paddingTop: '15px', color: '#333333' }}
                />
                {/* --- End Default Legend --- */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Offset Button */}
      <div className="pt-2">
          <Button
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2663eb]"
            onClick={() => console.log("Offset button clicked - no navigation.")}
            aria-label="Offset Your Footprint"
          >
             <Leaf className="h-4 w-4"/>
             Offset Your Footprint
          </Button>
      </div>

    </div>
  );
};

export default CarbonTab;
