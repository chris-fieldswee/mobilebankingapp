
import { ScrollArea } from "@/components/ui/scroll-area";
import { User2, Coffee, ShoppingBag, Car } from "lucide-react";

const recentPayees = [
  { id: 1, name: "John Doe", icon: User2 },
  { id: 2, name: "Starbucks", icon: Coffee },
  { id: 3, name: "Amazon", icon: ShoppingBag },
  { id: 4, name: "Uber", icon: Car },
  { id: 5, name: "Sarah M.", icon: User2 },
];

const PayeesCarousel = () => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-4">Recent Payees</h3>
      <ScrollArea className="w-full">
        <div className="flex gap-6 pb-4">
          {recentPayees.map((payee) => (
            <div key={payee.id} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-2">
                <payee.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {payee.name}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PayeesCarousel;
