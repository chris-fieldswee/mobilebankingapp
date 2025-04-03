
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface UpcomingTransaction {
  name: string;
  amount: number;
  dueIn: string;
}

interface UpcomingTransactionsListProps {
  transactions: UpcomingTransaction[];
  totalAmount: number;
}

export const UpcomingTransactionsList = ({
  transactions,
  totalAmount,
}: UpcomingTransactionsListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-semibold">{t("transactions.upcoming")}</h3>
        <span className="text-sm font-medium text-[#222222]">
          -€ {totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        {transactions.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t(`transactions.${item.name.toLowerCase().replace(/\s+/g, '')}`, item.name)}</p>
                <p className="text-sm text-muted-foreground">
                  {t("transactions.dueIn", { days: item.dueIn })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#222222]">
                  -€ {item.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
