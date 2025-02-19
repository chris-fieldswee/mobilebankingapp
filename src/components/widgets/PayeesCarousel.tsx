
import { ScrollArea } from "@/components/ui/scroll-area";
import { User2, Coffee, ShoppingBag, Car, Pizza, CreditCard } from "lucide-react";
import { useRef } from "react";

const recentPayees = [
  { id: 1, name: "John Doe", icon: User2 },
  { id: 2, name: "Starbucks", icon: Coffee },
  { id: 3, name: "Amazon", icon: ShoppingBag },
  { id: 4, name: "Uber", icon: Car },
  { id: 5, name: "Domino's", icon: Pizza },
  { id: 6, name: "Sarah M.", icon: CreditCard },
];

const PayeesCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-6 overflow-hidden">
      <h3 className="font-semibold mb-4">Recent Payees</h3>
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-4"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {recentPayees.map((payee) => (
          <div 
            key={payee.id} 
            className="flex flex-col items-center shrink-0 w-[calc(33.333%-0.75rem)] snap-start first:ml-0"
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-2">
              <payee.icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap text-center">
              {payee.name}
            </span>
          </div>
        ))}
        <div className="shrink-0 w-4" aria-hidden="true" />
      </div>
    </div>
  );
};

export default PayeesCarousel;
