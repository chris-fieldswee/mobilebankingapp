// src/components/insights/CarbonTab.tsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Using Card for sections
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // For time period
import { Progress } from "@/components/ui/progress"; // Can use Progress for bars

// Lucide Icons Imports
import { Plane, ShoppingBag, Utensils, Lightbulb, Package, Leaf, ArrowRight } from "lucide-react"; // Icons for categories + offset

// --- V1 Carbon Data Structure (Adapted from V2) ---
interface CarbonCategory {
  name: string;
  amount: number; // kg CO2e
  percentage: number;
  icon: React.ElementType; // Use Lucide icons
  color: string; // Optional: for progress bar color, use Tailwind classes instead?
}

const carbonDataV1 = {
  total: 1200, // kg CO2e
  // Using Lucide icons
  categories: [
    { name: "Travel", amount: 600, percentage: 50, icon: Plane, color: "bg-blue-500" }, // Example color class
    { name: "Shopping", amount: 250, percentage: 21, icon: ShoppingBag, color: "bg-purple-500" },
    { name: "Food", amount: 150, percentage: 12, icon: Utensils, color: "bg-orange-500" },
    { name: "Utilities", amount: 100, percentage: 8, icon: Lightbulb, color: "bg-yellow-500" },
    { name: "Other", amount: 100, percentage: 8, icon: Package, color: "bg-gray-500" }
  ].sort((a, b) => b.amount - a.amount) // Sort descending
};

// --- Carbon Tab Component ---
const CarbonTab = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState("this-month"); // Default state

  const handleCategoryClick = (categoryName: string) => {
    // Placeholder navigation - Adjust route as needed
    navigate(`/transactions?category=${encodeURIComponent(categoryName)}&type=carbon`);
    console.log("Navigate to details for carbon category:", categoryName);
  };

  const handleOffsetClick = () => {
     // Placeholder navigation - Adjust route as needed
     navigate('/carbon-offset');
     console.log("Navigate to carbon offset page");
  };

  return (
    <div className="space-y-6">

      {/* Time Period Toggle */}
      <div className="flex justify-center">
         <ToggleGroup type="single" size="sm" value={timePeriod} onValueChange={(value) => value && setTimePeriod(value)}>
           <ToggleGroupItem value="this-month" aria-label="This Month">This Month</ToggleGroupItem>
           <ToggleGroupItem value="last-month" aria-label="Last Month">Last Month</ToggleGroupItem>
           <ToggleGroupItem value="three-months" aria-label="Last 3 Months">Last 3 Months</ToggleGroupItem>
         </ToggleGroup>
      </div>

      {/* Total Footprint Card */}
      <Card className="p-4 sm:p-6 text-center bg-muted/40"> {/* Use muted background */}
        <p className="text-sm text-muted-foreground mb-1">Est. Footprint ({timePeriod === 'this-month' ? 'This Month' : 'Selected Period'})</p>
        <div className="text-3xl font-bold mb-2">{carbonDataV1.total.toLocaleString()} kg CO<sub className='text-xl'>2</sub>e</div> {/* CO2 subscript */}

        {/* Equivalencies */}
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          {/* Simplified equivalencies */}
          <p>~ Equivalent to driving a petrol car 5,500 km.</p>
          <p>~ Carbon absorption of 6 trees annually.</p>
        </div>
      </Card>

      {/* Category Breakdown (Using Progress Bars) */}
      <div>
        <h3 className="text-base font-semibold mb-3">Category Breakdown</h3>
        <div className="space-y-3">
        // Inside CarbonTab.tsx - Category Breakdown - .map loop
        {carbonDataV1.categories.map((category) => {
    const IconComponent = category.icon;

    // --- FIX: Determine indicator class string separately ---
    const indicatorColorClass = category.color
        ? `[&>div]:${category.color}`   // e.g., "[&>div]:bg-blue-500"
        : '[&>div]:bg-primary';       // Fallback
    // --- END FIX ---

    return (
        <div key={category.name} className="space-y-1">
            <div className="flex justify-between items-center text-sm mb-1 px-1">
                <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{category.name}</span>
                </div>
                <span className="text-muted-foreground">{category.amount} kg ({category.percentage}%)</span>
            </div>
            {/* --- CORRECTED PROGRESS COMPONENT --- */}
            <Progress
                value={category.percentage}
                // Combine base classes with the pre-determined indicator class
                className={`h-2 [&>div]:transition-all ${indicatorColorClass}`}
            />
            {/* --- END CORRECTION --- */}
        </div>
    );
 })}
        </div>
      </div>

      {/* Category Details List (Optional - similar to V2) */}
       {/* If you want the clickable list view as well: */}
       {/*
       <div className="pt-2">
         <h3 className="text-base font-semibold mb-3">Category Details</h3>
         <div className="space-y-2">
           {carbonDataV1.categories.map((category) => {
             const IconComponent = category.icon;
             return(
               <Card key={category.name} className="overflow-hidden">
                 <button
                   className="w-full flex items-center p-3 text-left hover:bg-accent/50"
                   onClick={() => handleCategoryClick(category.name)}
                 >
                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted mr-3 border">
                     <IconComponent className="h-4 w-4 text-muted-foreground" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="font-medium text-sm truncate">{category.name}</div>
                     <div className="text-xs text-muted-foreground">
                       {category.amount} kg CO2e ({category.percentage}% of total)
                     </div>
                   </div>
                   <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                 </button>
               </Card>
             )
           })}
         </div>
       </div>
       */}


      {/* Offset Button */}
      <div className="pt-2">
          <Button className="w-full flex items-center justify-center gap-2" onClick={handleOffsetClick}>
             <Leaf className="h-4 w-4"/>
             Offset Your Footprint
          </Button>
      </div>

    </div>
  );
};

export default CarbonTab;