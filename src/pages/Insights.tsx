
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import SpendingTab from "@/components/insights/SpendingTab";
import IncomeTab from "@/components/insights/IncomeTab";
import CashflowTab from "@/components/insights/CashflowTab";
import BudgetTab from "@/components/insights/BudgetTab";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("spending");
  const { t, i18n } = useTranslation();

  return (
    <div className="fixed inset-0 bg-background" key={i18n.language}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t('insights.title')}</h1>
        </div>
      </header>

      <main className="h-full pt-14 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="flex-none bg-background/80 backdrop-blur-lg">
            <div className="max-w-md mx-auto">
              <TabsList className="w-full h-12 bg-transparent">
                <TabsTrigger 
                  value="spending" 
                  className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {t('insights.spending')}
                </TabsTrigger>
                <TabsTrigger 
                  value="income"
                  className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {t('insights.income')}
                </TabsTrigger>
                <TabsTrigger 
                  value="cashflow"
                  className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {t('insights.cashflow')}
                </TabsTrigger>
                <TabsTrigger 
                  value="budget"
                  className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {t('insights.budget')}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto px-4 py-4 pb-24">
              <TabsContent value="spending" className="mt-0" key={`spending-${i18n.language}`}>
                <SpendingTab />
              </TabsContent>
              <TabsContent value="income" className="mt-0" key={`income-${i18n.language}`}>
                <IncomeTab />
              </TabsContent>
              <TabsContent value="cashflow" className="mt-0" key={`cashflow-${i18n.language}`}>
                <CashflowTab />
              </TabsContent>
              <TabsContent value="budget" className="mt-0" key={`budget-${i18n.language}`}>
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
