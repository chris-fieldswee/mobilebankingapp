import { Card } from "@/components/ui/card";
// REMOVED: import { useTranslation } from "react-i18next";

interface UpcomingTransaction {
  name: string; // Assuming this holds the English name (e.g., "Netflix Subscription")
  amount: number;
  dueIn: string; // Assuming this holds the number of days as a string (e.g., "3")
}

interface UpcomingTransactionsListProps {
  transactions: UpcomingTransaction[];
  totalAmount: number;
}

export const UpcomingTransactionsList = ({
  transactions,
  totalAmount,
}: UpcomingTransactionsListProps) => {
  // REMOVED: const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
         {/* Hardcoded title */}
        <h3 className="font-semibold">Upcoming Transactions</h3>
        <span className="text-sm font-medium text-[#222222]">
          -€ {totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        {transactions.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                 {/* Use item.name directly */}
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                   {/* Simple string interpolation */}
                  {`Due in ${item.dueIn} days`}
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

// Add export default if needed: export default UpcomingTransactionsList;