import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const periodOptions = ["1W", "1M", "6M", "1Y"];

const periodData = {
  "1M": [
    { month: "Ene", moneyIn: 5000, moneyOut: 2100 },
    { month: "Feb", moneyIn: 5000, moneyOut: 2300 },
    { month: "Mar", moneyIn: 5000, moneyOut: 2450 }
  ],
  "6M": [
    { month: "Sep", moneyIn: 52000, moneyOut: 26500 },
    { month: "Oct", moneyIn: 52000, moneyOut: 27800 },
    { month: "Nov", moneyIn: 52000, moneyOut: 25900 },
    { month: "Dic", moneyIn: 52000, moneyOut: 29600 },
    { month: "Ene", moneyIn: 52000, moneyOut: 27200 },
    { month: "Feb", moneyIn: 60000, moneyOut: 28400 }
  ],
  "1Y": [
    { month: "T2 23", moneyIn: 15000, moneyOut: 7200 },
    { month: "T3 23", moneyIn: 15000, moneyOut: 6900 },
    { month: "T4 23", moneyIn: 15000, moneyOut: 7200 },
    { month: "T1 24", moneyIn: 15000, moneyOut: 6850 }
  ],
  "1W": [
    { month: "Lun", moneyIn: 0, moneyOut: 75 },
    { month: "Mar", moneyIn: 0, moneyOut: 85 },
    { month: "Mié", moneyIn: 5000, moneyOut: 65 },
    { month: "Jue", moneyIn: 0, moneyOut: 45 },
    { month: "Vie", moneyIn: 0, moneyOut: 30 },
    { month: "Sáb", moneyIn: 0, moneyOut: 0 },
    { month: "Dom", moneyIn: 0, moneyOut: 0 }
  ]
};

const moneyInData = [
  { name: "Salario", amount: 60000, transactions: 1, percentage: "100%" }
];

const moneyOutData = [
  { name: "Restaurantes", amount: 700, transactions: 6, percentage: "19.4%" },
  { name: "Compras", amount: 450, transactions: 3, percentage: "12.5%" },
  { name: "Transporte", amount: 500, transactions: 8, percentage: "13.9%" },
  { name: "Entretenimiento", amount: 350, transactions: 2, percentage: "9.7%" },
  { name: "Comestibles", amount: 800, transactions: 5, percentage: "22.2%" },
  { name: "Facturas", amount: 600, transactions: 3, percentage: "16.7%" },
  { name: "Bienestar", amount: 200, transactions: 2, percentage: "5.6%" }
];

const upcomingTransactions = [
  { name: "Matrícula Universitaria", amount: 8000, dueIn: "5 días" },
  { name: "Suscripción a Netflix", amount: 15, dueIn: "3 días" },
  { name: "Spotify Premium", amount: 10, dueIn: "7 días" }
];

const currentBalance = 60000 - moneyOutData.reduce((sum, item) => sum + item.amount, 0);
const upcomingTotal = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);
const predictedBalance = currentBalance - upcomingTotal;

const predictionData = [
  { name: "Actual", amount: currentBalance },
  { name: "Fin de mes", amount: predictedBalance }
];

const CashflowTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [activeChart, setActiveChart] = useState(0);
  const { t } = useTranslation();
  const cashflowData = periodData[selectedPeriod as keyof typeof periodData];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{t('insights.netCashflow')} · {t('insights.thisMonth')}</p>
        <h2 className="text-3xl font-semibold text-[#222222]">€ {currentBalance.toLocaleString()}</h2>
      </div>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{t('insights.projectedBalance')}</h3>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={predictionData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Bar dataKey="amount" fill="#3366FF" radius={[4, 4, 0, 0]}>
                {predictionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.amount < 0 ? "#f0f5fd" : "#3366FF"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-4 bg-accent">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm">¡Tres meses consecutivos con saldo excepcionalmente alto!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CashflowTab;
