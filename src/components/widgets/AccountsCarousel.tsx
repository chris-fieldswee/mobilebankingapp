
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const accounts = {
  en: [
    {
      id: 1,
      title: "Current Account",
      amount: "6,000",
      currency: "EUR",
      symbol: "€",
      change: "+2.3%"
    },
    {
      id: 2,
      title: "Savings Account",
      amount: "190,000",
      currency: "EUR",
      symbol: "€",
      change: "+1.8%"
    }
  ],
  ar: [
    {
      id: 1,
      title: "الحساب الجاري",
      amount: "36,500",
      currency: "SAR",
      symbol: "﷼",
      change: "+2.3%"
    },
    {
      id: 2,
      title: "حساب التوفير",
      amount: "890,000",
      currency: "SAR",
      symbol: "﷼",
      change: "+1.8%"
    }
  ],
  es: [
    {
      id: 1,
      title: "Cuenta Corriente",
      amount: "6,000",
      currency: "EUR",
      symbol: "€",
      change: "+2.3%"
    },
    {
      id: 2,
      title: "Cuenta de Ahorro",
      amount: "190,000",
      currency: "EUR",
      symbol: "€",
      change: "+1.8%"
    }
  ]
};

const AccountsCarousel = () => {
  const { i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const currentAccounts = accounts[i18n.language as keyof typeof accounts] || accounts.en;
  const totalPages = currentAccounts.length;
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 1 : -1;
      const newPage = Math.min(Math.max(currentPage + direction, 0), totalPages - 1);
      scrollToPage(newPage);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
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
      <Card className="relative progress-bar-gradient text-white p-6">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth touch-pan-x transition-transform duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentAccounts.map((account) => (
            <div
              key={account.id}
              className="w-full flex-none snap-start"
            >
              <p className="text-sm text-white/70">{account.title}</p>
              <h2 className="text-2xl font-semibold mt-1">
                {account.symbol}{account.amount}
              </h2>
              <p className="text-sm text-emerald-400 mt-1">
                {account.change} this month
              </p>
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
                currentPage === index ? 'bg-white' : 'bg-white/20'
              }`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AccountsCarousel;
