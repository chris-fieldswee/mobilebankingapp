import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/transactions/TransactionItem";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const Transactions = () => {
  return (
    <div className="fixed inset-0 bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Recent Transactions</h1>
        </div>
      </header>

      <main className="h-full pt-14">
        <ScrollArea className="h-full">
          <div className="max-w-md mx-auto p-4 pb-24">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Dining (Total: ﷼2,040)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Nusr-Et Steakhouse" amount="-﷼1,200" date="Mar 15" />
                    <TransactionItem merchant="Okku" amount="-﷼450" date="Mar 14" />
                    <TransactionItem merchant="Elements at Four Seasons" amount="-﷼350" date="Mar 13" />
                    <TransactionItem merchant="Five Elephants Coffee Roasters" amount="-﷼40" date="Mar 12" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Shopping (Total: ﷼11,300)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Harvey Nichols" amount="-﷼8,800" date="Mar 15" />
                    <TransactionItem merchant="Balenciaga at Harvey Nichols" amount="-﷼2,500" date="Mar 14" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Transportation (Total: ﷼4,150)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Mercedes-Benz" amount="-﷼3,500" date="Mar 10" />
                    <TransactionItem merchant="Saudi Aramco" amount="-﷼500" date="Mar 9" />
                    <TransactionItem merchant="Uber Black" amount="-﷼150" date="Mar 8" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Entertainment (Total: ﷼3,750)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Fitness First Platinum" amount="-﷼1,500" date="Mar 7" />
                    <TransactionItem merchant="Riyadh Season events" amount="-﷼2,000" date="Mar 6" />
                    <TransactionItem merchant="VOX Cinemas Gold" amount="-﷼250" date="Mar 5" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Groceries (Total: ﷼2,650)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Danube Gourmet" amount="-﷼1,200" date="Mar 4" />
                    <TransactionItem merchant="Organic Foods and Café" amount="-﷼500" date="Mar 3" />
                    <TransactionItem merchant="Manuel Market" amount="-﷼800" date="Mar 2" />
                    <TransactionItem merchant="Tamimi Markets" amount="-﷼150" date="Mar 1" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Bills (Total: ﷼3,300)</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Saudi Electricity Company" amount="-﷼1,500" date="Mar 1" />
                    <TransactionItem merchant="STC Fiber" amount="-﷼500" date="Mar 1" />
                    <TransactionItem merchant="STC Platinum" amount="-﷼500" date="Mar 1" />
                    <TransactionItem merchant="Helpling" amount="-﷼800" date="Mar 1" />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Wellness</h2>
                  <div className="space-y-1">
                    <TransactionItem merchant="Four Seasons Spa" amount="-﷼1,210" date="Mar 1" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Transactions;
