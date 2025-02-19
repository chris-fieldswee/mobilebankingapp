
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const accounts = [
  { currency: "USD", balance: "12,750.00", symbol: "$" },
  { currency: "GBP", balance: "9,840.00", symbol: "£" },
  { currency: "PLN", balance: "42,500.00", symbol: "zł" },
];

const AccountsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev + 1) % accounts.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + accounts.length) % accounts.length);
    }
  };

  const account = accounts[activeIndex];

  return (
    <Card className="p-6 mb-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
      <div 
        className="transition-transform duration-300"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          
          const handleTouchEnd = (e: TouchEvent) => {
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? 'left' : 'right');
            }
          };
          
          document.addEventListener('touchend', handleTouchEnd, { once: true });
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <h2 className="text-2xl font-semibold">
              {account.symbol}{account.balance}
            </h2>
            <p className="text-sm mt-1 opacity-80">{account.currency}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex -mx-1">
        {accounts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-opacity ${
              index === activeIndex
                ? "bg-primary-foreground opacity-90"
                : "bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default AccountsCarousel;
