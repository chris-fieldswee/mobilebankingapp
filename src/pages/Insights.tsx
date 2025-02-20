
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
    <div className="fixed inset-0 bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Insights</h1>
        </div>
      </header>

      <main className="h-full pt-14">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-lg border-b">
            <TabsList className="w-full justify-start p-0 h-12 bg-transparent space-x-6 overflow-x-auto flex-nowrap">
              <TabsTrigger 
                value="spending" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Spending
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Income
              </TabsTrigger>
              <TabsTrigger 
                value="cashflow"
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Cashflow
              </TabsTrigger>
              <TabsTrigger 
                value="budget"
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Budget
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="spending">
              <SpendingTab />
            </TabsContent>
            <TabsContent value="income">
              <IncomeTab />
            </TabsContent>
            <TabsContent value="cashflow">
              <CashflowTab />
            </TabsContent>
            <TabsContent value="budget">
              <BudgetTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
