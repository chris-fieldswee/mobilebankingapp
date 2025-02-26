
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const recentPayees = {
  en: [
    { id: 1, name: "John Smith", icon: User2 },
    { id: 2, name: "Mary Johnson", icon: User2 },
    { id: 3, name: "David Wilson", icon: User2 },
    { id: 4, name: "Sarah Brown", icon: User2 },
    { id: 5, name: "Michael Davis", icon: User2 },
    { id: 6, name: "Emma Taylor", icon: User2 },
  ],
  ar: [
    { id: 1, name: "فاطمة الفيصل", icon: User2 },
    { id: 2, name: "أحمد الفيصل", icon: User2 },
    { id: 3, name: "سعيد الفيصل", icon: User2 },
    { id: 4, name: "نورة الفيصل", icon: User2 },
    { id: 5, name: "خالد الراشد", icon: User2 },
    { id: 6, name: "ليلى القحطاني", icon: User2 },
  ],
  es: [
    { id: 1, name: "Juan García", icon: User2 },
    { id: 2, name: "María Rodríguez", icon: User2 },
    { id: 3, name: "Carlos López", icon: User2 },
    { id: 4, name: "Ana Martínez", icon: User2 },
    { id: 5, name: "José Sánchez", icon: User2 },
    { id: 6, name: "Laura Torres", icon: User2 },
  ]
};

const PayeesCarousel = () => {
  const { t, i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const currentPayees = recentPayees[i18n.language as keyof typeof recentPayees] || recentPayees.en;
  const totalPages = Math.ceil(currentPayees.length / 3);
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
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
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
      <h3 className="font-semibold mb-4">{t("payees.recentPayees")}</h3>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden snap-x snap-mandatory pb-4 px-4 mb-4 scroll-smooth touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentPayees.map((payee) => (
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
