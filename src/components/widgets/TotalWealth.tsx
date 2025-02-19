
import { Card } from "@/components/ui/card";
import { Wallet, Landmark } from "lucide-react";

const TotalWealth = () => {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
      <h3 className="font-semibold mb-4">Total Wealth</h3>
      <div className="text-2xl font-semibold mb-4">zł 12,540</div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-blue-600" />
            </div>
            <span>Cash</span>
          </div>
          <span className="font-medium">zł 3,540</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Landmark className="h-4 w-4 text-purple-600" />
            </div>
            <span>Savings</span>
          </div>
          <span className="font-medium">zł 9,000</span>
        </div>
      </div>
    </Card>
  );
};

export default TotalWealth;
