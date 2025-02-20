
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import SpendingTab from "@/components/insights/SpendingTab";
import IncomeTab from "@/components/insights/IncomeTab";
import CashflowTab from "@/components/insights/CashflowTab";
import BudgetTab from "@/components/insights/BudgetTab";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("spending");

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <header className="flex-none fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Insights</h1>
        </div>
      </header>

      <main className="flex-1 pt-14 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="flex-none sticky top-14 z-40 bg-background/80 backdrop-blur-lg border-b">
            <TabsList className="w-full h-12 bg-transparent">
              <TabsTrigger 
                value="spending" 
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Spending
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Income
              </TabsTrigger>
              <TabsTrigger 
                value="cashflow"
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Cashflow
              </TabsTrigger>
              <TabsTrigger 
                value="budget"
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Budget
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <TabsContent value="spending" className="mt-0">
                <SpendingTab />
              </TabsContent>
              <TabsContent value="income" className="mt-0">
                <IncomeTab />
              </TabsContent>
              <TabsContent value="cashflow" className="mt-0">
                <CashflowTab />
              </TabsContent>
              <TabsContent value="budget" className="mt-0">
                <BudgetTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
