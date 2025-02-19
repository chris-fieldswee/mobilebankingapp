
import { Card } from "@/components/ui/card";
import { Wallet, Landmark, CreditCard, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const accounts = [
  { 
    id: 1,
    title: "Total Wealth",
    amount: "12,540",
    items: [
      { icon: Wallet, label: "Cash", amount: "3,540" },
      { icon: Landmark, label: "Savings", amount: "9,000" },
    ]
  },
  {
    id: 2,
    title: "Accounts",
    amount: "3,540",
    items: [
      { icon: CreditCard, label: "Main", amount: "2,340" },
      { icon: Wallet, label: "Cash", amount: "1,200" },
    ]
  },
  {
    id: 3,
    title: "Investments",
    amount: "9,000",
    items: [
      { icon: Landmark, label: "Stocks", amount: "5,500" },
      { icon: PiggyBank, label: "Bonds", amount: "3,500" },
    ]
  },
  {
    id: 4,
    title: "Savings",
    amount: "9,000",
    items: [
      { icon: PiggyBank, label: "Emergency", amount: "5,000" },
      { icon: Landmark, label: "Goals", amount: "4,000" },
    ]
  },
];

const TotalWealth = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = accounts.length;

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
    <Card className="p-6 mb-6">
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        >
          {accounts.map((account) => (
            <div 
              key={account.id}
              className="w-full flex-none snap-start"
            >
              <h3 className="font-semibold mb-4">{account.title}</h3>
              <div className="text-2xl font-semibold mb-4">zł {account.amount}</div>
              <div className="space-y-3">
                {account.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <span className="font-medium">zł {item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
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
    </Card>
  );
};

export default TotalWealth;
