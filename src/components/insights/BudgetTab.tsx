import { Card } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/insights/CircularProgressBar";
import { AlertCircle, Calendar, Coins } from "lucide-react";
import { useTranslation } from "react-i18next";

const BudgetTab = () => {
  const { t } = useTranslation();
  
  // Actual data: goal 4000€ and spent 3600€ (remaining: 400€)
  const budget = 4000;
  const spent = 3600;
  const remainingBudget = Math.max(budget - spent, 0); // 400
  const progress = (spent / budget) * 100; // 90%
  const isOverBudget = spent > budget;
  const utilizationPercentage = Math.min(Math.round((spent / budget) * 100), 100);

  // Updated upcoming transactions in Spanish, adjusted to exceed the remaining budget
  const upcomingTransactions = [
    { name: "Matrícula Universitaria", dueIn: 5, amount: 300 },
    { name: "Suscripción a Netflix", dueIn: 3, amount: 50 },
    { name: "Spotify Premium", dueIn: 7, amount: 100 }
  ];
  
  const totalUpcoming = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-4">
      {/* Presupuesto mensual circular */}
      <Card className="p-4 text-center">
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[280px]">
            <CircularProgressBar
              percentage={Math.min(progress, 100)}
              strokeWidth={24}
              availableColor="#F4F4F5"
              spentColor="url(#blueGradient)"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t("budget.monthlyBudget")}
              </p>
              <span className="text-3xl font-bold">€ {remainingBudget.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground">
                9 {t("budget.daysLeft")}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Mensaje de presupuesto */}
      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              {isOverBudget 
                ? t("budget.overBudgetMessage", { amount: (spent - budget).toLocaleString() })
                : t("budget.utilizationMessage", { 
                    percent: utilizationPercentage,
                    remaining: remainingBudget.toLocaleString(),
                    budget: budget.toLocaleString()
                  })
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Mensaje sobre transacciones próximas */}
      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              Tus transacciones próximas (€{totalUpcoming.toLocaleString()}) superan significativamente tu presupuesto restante para este mes (€{remainingBudget.toLocaleString()}). Para asegurarte de que estos pagos se realicen, considera transferir fondos desde tu cuenta de ahorros.
            </p>
          </div>
        </div>
      </Card>

      {/* Resumen de transacciones próximas */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
              <p className="font-medium">Transacciones Próximas</p>
              <p className="text-sm text-muted-foreground">
                {upcomingTransactions.length} transacciones
              </p>
            </div>
          </div>
          <span className="font-medium">€ {totalUpcoming.toLocaleString()}</span>
        </div>
      </Card>

      {/* Resumen de gastos del mes */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Coins className="h-5 w-5 text-[#222222]" />
            </div>
            <div>
              <p className="font-medium">Gastado este mes</p>
              <p className="text-sm text-muted-foreground">51 transacciones</p>
            </div>
          </div>
          <span className="font-medium">€ {spent.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
};

export default BudgetTab;
