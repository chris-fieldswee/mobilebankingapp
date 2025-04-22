import { Card } from "@/components/ui/card";
// REMOVED: import { useTranslation } from "react-i18next";

interface TransactionCategory {
  name: string; // Assuming this now holds the English category name (e.g., "Dining")
  amount: number;
  transactions: number;
  percentage: string;
}

interface TransactionCategoryListProps {
  title: string; // Assuming this now holds the English title (e.g., "Income", "Expenses")
  categories: TransactionCategory[];
  totalAmount: number;
}

export const TransactionCategoryList = ({
  title,
  categories,
  totalAmount,
}: TransactionCategoryListProps) => {
  // REMOVED: const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm font-medium text-[#222222]">
           {/* Use title directly to check, assuming it's "Income" or "Expenses" */}
          {title === "Income" ? "€" : "-€"}
          {totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        {categories.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                 {/* Use item.name directly */}
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                   {/* Simple pluralization */}
                  {item.transactions} transactions
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#222222]">
                   {/* Use title directly */}
                  {title === "Income" ? "+" : "-"}€ {item.amount.toLocaleString()}
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

// Add export default if needed: export default TransactionCategoryList;