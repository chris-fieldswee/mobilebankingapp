import { Card } from "@/components/ui/card";
import { Wallet, Landmark } from "lucide-react"; // Removed unused icons

// Define structure for internal mock data for Assets breakdown (if still needed)
// Using placeholder numbers - update these if you have specific mock data
const assetsBreakdownData = {
  currentAccount: 24000, // Example value
  savings: 591000,      // Example value
  symbol: "SAR"         // Assuming SAR for breakdown items too
};

// Define the props interface
interface TotalWealthProps {
  totalAggregatedBalance: number; // Prop for the total from Index.tsx
}

const TotalWealth = ({ totalAggregatedBalance }: TotalWealthProps) => {
  // Use a consistent symbol, likely passed down or defined globally, assuming SAR for now
  const displaySymbol = "SAR";

  // Define the details for the assets section using mock data or props if needed
  const assetDetails = [
    { icon: Wallet, label: "Current Account", amount: assetsBreakdownData.currentAccount },
    { icon: Landmark, label: "Savings", amount: assetsBreakdownData.savings }
  ];
  // Calculate the total for the assets section from its own data
  const assetsTotal = assetDetails.reduce((sum, item) => sum + item.amount, 0);


  return (
    // Added mb-20 or similar if needed to ensure space above BottomNav
    <Card className="p-6 mb-6 bg-card">
      <div className="space-y-6">
        {/* Section displaying the overall Total Wealth */}
        <div>
          {/* Use hardcoded title */}
          <h3 className="font-semibold">Total Wealth</h3>
           {/* Display the totalAggregatedBalance prop passed from Index.tsx */}
          <div className="text-2xl font-semibold mb-8">
              {displaySymbol} {totalAggregatedBalance.toLocaleString()}
          </div>

          {/* Section for Assets breakdown */}
          <div className="space-y-4 mb-12 last:mb-0"> {/* Use `last:mb-0` if Liabilities might be added later */}
            <div className="flex items-center justify-between">
               {/* Use hardcoded title */}
              <h4 className="text-sm font-medium text-muted-foreground">Assets</h4>
               {/* Display total calculated from assetDetails */}
              <span className="font-medium text-[0.95rem]">
                  {displaySymbol} {assetsTotal.toLocaleString()}
              </span>
            </div>
            <div className="space-y-3">
              {assetDetails.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-[#222222]" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                   {/* Display amount from assetDetails */}
                  <span className="font-medium text-[0.95rem]">
                      {displaySymbol} {item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Add Liabilities section here later if needed */}

        </div>
      </div>
    </Card>
  );
};

export default TotalWealth;