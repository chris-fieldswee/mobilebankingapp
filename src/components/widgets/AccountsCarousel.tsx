import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import AccountBalanceCard from "./AccountBalanceCard"; // Import the card component

// --- CHANGE HERE: Updated interface to use changePercent ---
interface Account {
  id: number;
  logo: string;
  title: string;
  amount: number;
  symbol: string;
  changePercent?: string; // Expect changePercent string from Index.tsx
  accountType?: "checking" | "savings" | "credit";
}

interface AccountsCarouselProps {
  accounts: Account[];
}

const AccountsCarousel = ({ accounts }: AccountsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = accounts.length > 0 ? accounts.length : 1;

  const itemWidthClass = "w-[75%]";
  const gapClass = "mr-4";
  const gapValue = 16;
  const containerPaddingClass = "px-4";
  const containerPaddingValue = 16;

  // Scroll and State Logic (Use existing correct versions of these handlers)
  const scrollToPage = useCallback((pageIndex: number) => {
    if (scrollRef.current && accounts.length > 0) {
      const validPageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
      const containerElement = scrollRef.current;
      const firstItemElement = containerElement.children[0] as HTMLElement;
      if (firstItemElement) {
          const itemEffectiveWidth = (containerElement.clientWidth - containerPaddingValue * 2) * 0.75;
          const scrollLeftTarget = validPageIndex * (itemEffectiveWidth + gapValue);
          containerElement.scrollTo({ left: scrollLeftTarget, behavior: 'smooth' });
          if (currentPage !== validPageIndex) setCurrentPage(validPageIndex);
      }
    }
  }, [accounts.length, totalPages, currentPage, gapValue, containerPaddingValue]); // Ensure accounts.length is stable if accounts ref changes

  const handleScroll = useCallback(() => {
     if (scrollRef.current && accounts.length > 0) {
        const containerElement = scrollRef.current;
        const firstItemElement = containerElement.children[0] as HTMLElement;
        if(firstItemElement) {
            const scrollLeft = containerElement.scrollLeft;
            const itemEffectiveWidth = (containerElement.clientWidth - containerPaddingValue * 2) * 0.75;
            const calculatedPage = Math.round(scrollLeft / (itemEffectiveWidth + gapValue));
            const validPage = Math.max(0, Math.min(calculatedPage, totalPages - 1));
            if (validPage !== currentPage) setCurrentPage(validPage);
        }
     }
  }, [accounts.length, totalPages, currentPage, gapValue, containerPaddingValue]); // Ensure accounts.length is stable

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const currentTouch = e.touches[0].clientX;
      const diff = touchStart - currentTouch;
      if (Math.abs(diff) > 50) {
          const direction = diff > 0 ? 1 : -1;
          const newPage = Math.min(Math.max(currentPage + direction, 0), totalPages - 1);
          if (newPage !== currentPage) { scrollToPage(newPage); }
          setTouchStart(null);
      }
  };
  const handleTouchEnd = () => { setTouchStart(null); };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);


  return (
    <div className="mb-6">
      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={scrollRef}
          className={`flex overflow-x-hidden snap-x snap-mandatory scroll-smooth touch-pan-x ${containerPaddingClass} no-scrollbar`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className={`${itemWidthClass} flex-shrink-0 snap-start ${index < accounts.length - 1 ? gapClass : ''}`}
            >
              {/* --- CORRECTED PROPS PASSED TO AccountBalanceCard --- */}
              <AccountBalanceCard
                className="progress-bar-gradient text-white h-full"
                name={account.title}
                balance={account.amount}
                currency={account.symbol}
                // --- CHANGE HERE: Pass changePercent, not change ---
                changePercent={account.changePercent || ""} // Pass the string prop
                accountType={account.accountType ?? "checking"}
                bankLogo={account.logo}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots container */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            aria-label={`Go to account ${index + 1}`}
            className={`w-2 h-2 p-0 rounded-full transition-colors ${
              currentPage === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => scrollToPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

AccountsCarousel.displayName = "AccountsCarousel";

export default AccountsCarousel;