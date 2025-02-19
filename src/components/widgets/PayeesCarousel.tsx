
import { User2, Coffee, ShoppingBag, Car, Pizza, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(recentPayees.length / 3);

  const scrollToPage = (pageIndex: number) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: pageIndex * scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      setCurrentPage(Math.round(scrollLeft / width));
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-4">Recent Payees</h3>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden snap-x snap-mandatory pb-4 px-4 mb-4 scroll-smooth"
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
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 p-0 rounded-full ${
                currentPage === index ? 'bg-primary' : 'bg-secondary'
              }`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayeesCarousel;
