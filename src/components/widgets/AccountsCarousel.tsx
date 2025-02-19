
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const accounts = [
  {
    id: 1,
    title: "Total Balance",
    amount: "12,540",
    change: "+2.3%",
    currency: "PLN"
  },
  {
    id: 2,
    title: "Main Account",
    amount: "8,250",
    change: "+1.2%",
    currency: "PLN"
  },
  {
    id: 3,
    title: "Savings",
    amount: "3,290",
    change: "+0.8%",
    currency: "PLN"
  },
  {
    id: 4,
    title: "Investment Account",
    amount: "1,000",
    change: "+3.5%",
    currency: "PLN"
  }
];

const AccountsCarousel = () => {
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
    <div className="mb-6">
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        >
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="w-full flex-none snap-start p-6"
            >
              <p className="text-sm text-muted-foreground">{account.title}</p>
              <h2 className="text-2xl font-semibold mt-1">
                {account.currency} {account.amount}
              </h2>
              <p className="text-sm text-emerald-500 mt-1">
                {account.change} this month
              </p>
            </Card>
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
    </div>
  );
};

export default AccountsCarousel;
