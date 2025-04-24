// src/pages/GoalsAndBudgets.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons Imports
import { ChevronLeft, PlusCircle, ArrowRight } from "lucide-react"; // Keep used icons

// Import mock data and types (adjust path as needed)
import { mockGoalsV1, mockBudgetsV1, formatCurrencyV1, GoalV1, BudgetV1 } from '@/data/goalsBudgetsData';

// --- *** Updated GoalListItem Component *** ---
interface GoalListItemProps {
  goal: GoalV1;
  onClick: () => void;
}
const GoalListItem: React.FC<GoalListItemProps> = ({ goal, onClick }) => {
   const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
   const isComplete = goal.currentAmount >= goal.targetAmount;
   // Destructure the icon component
   const IconComponent = goal.icon;

   return (
    <Card className="overflow-hidden">
      <button
        onClick={onClick}
        className="w-full text-left p-4 hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
        aria-label={`View details for goal: ${goal.title}`}
      >
        <div className="flex justify-between items-center mb-2">
           <div className="flex items-center space-x-3 min-w-0"> {/* Wrap icon and title */}
              {/* Render IconComponent if it exists */}
              {IconComponent && (
                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border"> {/* Smaller icon container */}
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                 </div>
              )}
               {!IconComponent && ( // Fallback if no icon
                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border">
                    <span className="text-muted-foreground font-medium text-xs">{goal.title[0]}</span>
                 </div>
              )}
              <h3 className="font-semibold text-base truncate" title={goal.title}>{goal.title}</h3>
           </div>
           {/* Achieved status */}
           {isComplete && <span className="text-xs font-medium text-green-600 ml-2 shrink-0">Achieved!</span>}
        </div>
        {/* Progress bar and amounts */}
        <Progress
            value={progress}
            className={`h-2 mb-2 [&>div]:transition-all ${ isComplete ? '[&>div]:bg-green-500' : '[&>div]:bg-[#2463EB]' }`}
        />
        <div className="flex justify-between text-sm">
          <span className={isComplete ? 'text-green-700 font-medium' : 'text-muted-foreground'}>
             {formatCurrencyV1(goal.currentAmount, goal.currency)} Saved
          </span>
          <span className="text-muted-foreground">
             Target: {formatCurrencyV1(goal.targetAmount, goal.currency)}
          </span>
        </div>
         {goal.deadline && !isComplete && (
            <p className="text-xs text-muted-foreground mt-1">Target date: {goal.deadline}</p>
        )}
      </button>
    </Card>
   );
};


// --- BudgetListItem Component (Remains the same as previous fix) ---
interface BudgetListItemProps {
    budget: BudgetV1;
    onClick: () => void;
}
const BudgetListItem: React.FC<BudgetListItemProps> = ({ budget, onClick }) => {
    // ... (BudgetListItem implementation remains the same)
    const progress = Math.min((budget.spent / budget.allocated) * 100, 100);
    const isOverBudget = budget.spent > budget.allocated;
    const IconComponent = budget.icon;

    return (
         <Card className="overflow-hidden">
            <button
                onClick={onClick}
                className="w-full text-left hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                aria-label={`View details for budget: ${budget.category}`}
             >
                <div className="flex items-center p-4">
                    {IconComponent && (
                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted mr-3 border">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                         </div>
                    )}
                    {!IconComponent && (
                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted mr-3 border">
                            <span className="text-muted-foreground font-medium text-sm">{budget.category[0]}</span>
                         </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{budget.category}</div>
                        <div className="text-xs text-muted-foreground">{budget.period} Budget</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                </div>
                 <div className="px-4 pb-4 pt-0">
                     <div className="flex justify-between text-sm mb-1">
                         <span className={isOverBudget ? "text-red-600 font-medium" : ""}>{formatCurrencyV1(budget.spent, budget.currency)} Spent</span>
                        <span>{formatCurrencyV1(budget.allocated, budget.currency)} Budget</span>
                    </div>
                    <Progress value={progress} className={`h-2 [&>div]:transition-all ${ isOverBudget ? '[&>div]:bg-red-500' : '[&>div]:bg-[#2463EB]' }`} />
                     <div className={`text-xs text-right mt-1 ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
                        {isOverBudget ? `${formatCurrencyV1(budget.spent - budget.allocated, budget.currency)} Over` : `${Math.round(progress)}% Used`}
                    </div>
                </div>
            </button>
        </Card>
    );
};


// --- Goals & Budgets Page Component (Structure remains the same) ---
const GoalsAndBudgets = () => {
  // ... (state, navigate, navigateToDetail function remain the same) ...
  const [activeTab, setActiveTab] = useState("goals");
  const navigate = useNavigate();

  const navigateToDetail = (type: 'goal' | 'budget', id: string) => {
      if (type === 'goal') {
          navigate(`/goals/${id}`);
      } else {
           navigate(`/budgets/${id}`);
      }
  };

  return (
    // ... (Overall layout JSX remains the same) ...
     <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">
         <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
             <div className="px-4 h-14 flex items-center">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="mr-2 shrink-0">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Goals & Budgets</h1>
            </div>
         </header>
         <Tabs
            defaultValue="goals"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md flex-1 flex flex-col mt-0 bg-background shadow-sm"
          >
             <div className="flex-shrink-0 border-b">
               <TabsList className="grid w-full grid-cols-2 h-12 bg-transparent p-0">
                  <TabsTrigger value="goals" className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-1 text-sm">Goals</TabsTrigger>
                  <TabsTrigger value="budgets" className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-1 text-sm">Budgets</TabsTrigger>
                </TabsList>
            </div>
             <ScrollArea className="flex-1">
               <div className="px-4 py-4 pb-24">
                  {/* Goals Tab Content - Renders GoalListItem */}
                  <TabsContent forceMount hidden={activeTab !== 'goals'} value="goals" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between pt-2">
                        <h2 className="text-base font-semibold">Savings Goals</h2>
                        <Button size="sm" variant="outline"><PlusCircle className="h-4 w-4 mr-1" />Add Goal</Button>
                      </div>
                      {mockGoalsV1.length > 0 ? ( mockGoalsV1.map((goal) => (<GoalListItem key={goal.id} goal={goal} onClick={() => navigateToDetail('goal', goal.id)}/> ))) : (<p className="text-center text-muted-foreground py-8">No goals set yet.</p> )}
                  </TabsContent>

                  {/* Budgets Tab Content - Renders BudgetListItem */}
                  <TabsContent forceMount hidden={activeTab !== 'budgets'} value="budgets" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between pt-2">
                        <h2 className="text-base font-semibold">Monthly Budgets</h2>
                        <Button size="sm" variant="outline"><PlusCircle className="h-4 w-4 mr-1" />Add Budget</Button>
                      </div>
                      {mockBudgetsV1.length > 0 ? ( mockBudgetsV1.map((budget) => ( <BudgetListItem key={budget.id} budget={budget} onClick={() => navigateToDetail('budget', budget.id)}/>))) : (<p className="text-center text-muted-foreground py-8">No budgets set yet.</p> )}
                  </TabsContent>
               </div>
             </ScrollArea>
         </Tabs>
     </div>
  );
};

export default GoalsAndBudgets;