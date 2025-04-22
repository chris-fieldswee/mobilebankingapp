// src/pages/Insights.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";

// Import Tabs
import SpendingTab from "@/components/insights/SpendingTab";
import IncomeTab from "@/components/insights/IncomeTab";
import CashflowTab from "@/components/insights/CashflowTab";
// REMOVE BudgetTab, ADD CarbonTab
// import BudgetTab from "@/components/insights/BudgetTab"; // Remove this
import CarbonTab from "@/components/insights/CarbonTab"; // <-- ADD Import for new tab

const Insights = () => {
  const [activeTab, setActiveTab] = useState("spending"); // Default to spending

  // Update labels
  const labels = {
    title: "Insights",
    spending: "Spending",
    income: "Income",
    cashflow: "Cashflow",
    carbon: "Carbon", // <-- CHANGED: Renamed budget to carbon
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">
      {/* Header (remains the same) */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="px-4 h-14 flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2 shrink-0">
              <ChevronLeft className="h-5 w-5" />
               <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{labels.title}</h1>
        </div>
      </header>

      {/* Tabs Component (remains the same structure) */}
      <Tabs
         defaultValue="spending"
         value={activeTab}
         onValueChange={setActiveTab}
         className="w-full max-w-md flex-1 flex flex-col mt-0 bg-background shadow-sm"
       >
        {/* TabsList (Update last trigger) */}
        <div className="flex-shrink-0 border-b">
           <TabsList className="grid w-full grid-cols-4 h-12 bg-transparent p-0">
              <TabsTrigger value="spending" /* ... */ >{labels.spending}</TabsTrigger>
              <TabsTrigger value="income" /* ... */ >{labels.income}</TabsTrigger>
              <TabsTrigger value="cashflow" /* ... */ >{labels.cashflow}</TabsTrigger>
              {/* --- UPDATED 4th Tab Trigger --- */}
              <TabsTrigger
                value="carbon" // <-- CHANGED: value to "carbon"
                className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-1 text-xs sm:text-sm"
              >
                {labels.carbon} {/* <-- Use carbon label */}
              </TabsTrigger>
            </TabsList>
        </div>

        {/* Scrollable Content Area (Update last content) */}
        <ScrollArea className="flex-1">
          <div className="px-4 py-4 pb-24">
              <TabsContent forceMount={true} hidden={activeTab !== 'spending'} value="spending" className="mt-0"><SpendingTab /></TabsContent>
              <TabsContent forceMount={true} hidden={activeTab !== 'income'} value="income" className="mt-0"><IncomeTab /></TabsContent>
              <TabsContent forceMount={true} hidden={activeTab !== 'cashflow'} value="cashflow" className="mt-0"><CashflowTab /></TabsContent>
              {/* --- UPDATED 4th Tab Content --- */}
              <TabsContent forceMount={true} hidden={activeTab !== 'carbon'} value="carbon" className="mt-0">
                  <CarbonTab /> {/* <-- Render CarbonTab component */}
              </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default Insights;