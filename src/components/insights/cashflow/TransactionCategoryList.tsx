
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface TransactionCategory {
  name: string;
  amount: number;
  transactions: number;
  percentage: string;
}

interface TransactionCategoryListProps {
  title: string;
  categories: TransactionCategory[];
  totalAmount: number;
}

export const TransactionCategoryList = ({
  title,
  categories,
  totalAmount,
}: TransactionCategoryListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm font-medium text-[#222222]">
          {title === t("insights.income") ? "€" : "-€"}{" "}
          {totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        {categories.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t(`categories.${item.name.toLowerCase()}`, item.name)}</p>
                <p className="text-sm text-muted-foreground">
                  {item.transactions} {t("transactions.total", { count: item.transactions })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#222222]">
                  {title === t("insights.income") ? "+" : "-"}€ {item.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.percentage}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
