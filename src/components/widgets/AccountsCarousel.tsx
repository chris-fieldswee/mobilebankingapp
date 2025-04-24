// src/components/dashboard/AccountsCarousel.tsx

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import AccountBalanceCard from "./AccountBalanceCard";
// --- Import the SHARED AccountV1 interface ---
import { AccountV1 } from "@/data/goalsBudgetsData"; // Adjust path if needed

// --- REMOVED Local Account interface definition ---
// interface Account {
//   id: number; // <-- This was the problem (expected number)
//   logo: string;
//   title: string;
//   amount: number;
//   symbol: string;
//   changePercent?: string;
//   accountType?: "checking" | "savings" | "credit";
// }

// --- Use AccountV1 in Props ---
interface AccountsCarouselProps {
  accounts: AccountV1[]; // <-- Use the imported AccountV1 interface
}

const AccountsCarousel = ({ accounts }: AccountsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  // Ensure totalPages calculation works even if accounts is empty initially
  const totalPages = Math.max(1, accounts.length);

  const itemWidthClass = "w-[75%]"; // Use fixed width percentage
  const gapClass = "mr-4"; // Use margin for gap
  const gapValue = 16; // 1rem = 16px for calculation
  const containerPaddingClass = "px-4"; // Tailwind class for padding
  const containerPaddingValue = 16; // Value matching the padding class (px-4 -> 1rem -> 16px)


  // Scroll and State Logic (Use existing correct versions of these handlers)
  const scrollToPage = useCallback((pageIndex: number) => {
    if (scrollRef.current && accounts.length > 0) {
      const validPageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
      const containerElement = scrollRef.current;
      // Ensure clientWidth is read *after* element is potentially rendered
      if(containerElement.clientWidth > 0) {
          const itemEffectiveWidth = (containerElement.clientWidth - containerPaddingValue * 2) * 0.75; // 75% width calculation
          // Ensure item width is positive before calculating scroll
          if (itemEffectiveWidth > 0) {
             const scrollLeftTarget = validPageIndex * (itemEffectiveWidth + gapValue);
             containerElement.scrollTo({ left: scrollLeftTarget, behavior: 'smooth' });
             // Update state only if page actually changes to prevent infinite loops
             setCurrentPage(validPageIndex); // Update state directly here if logic requires it
          }
      }
    }
  }, [accounts.length, totalPages, gapValue, containerPaddingValue]); // Removed currentPage from deps

  const handleScroll = useCallback(() => {
     if (scrollRef.current && accounts.length > 0) {
        const containerElement = scrollRef.current;
         if(containerElement.clientWidth > 0) {
            const scrollLeft = containerElement.scrollLeft;
            const itemEffectiveWidth = (containerElement.clientWidth - containerPaddingValue * 2) * 0.75;
             if (itemEffectiveWidth > 0) {
                const calculatedPage = Math.round(scrollLeft / (itemEffectiveWidth + gapValue));
                const validPage = Math.max(0, Math.min(calculatedPage, totalPages - 1));
                // Use functional update to avoid stale state issues if needed elsewhere
                setCurrentPage(prevPage => {
                    // console.log(`Scroll detected: scrollLeft=${scrollLeft}, calculatedPage=${calculatedPage}, validPage=${validPage}, prevPage=${prevPage}`);
                    return validPage;
                });
            }
         }
     }
  }, [accounts.length, totalPages, gapValue, containerPaddingValue]); // Removed currentPage from deps


  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const currentTouch = e.touches[0].clientX;
      const diff = touchStart - currentTouch;
      // Increased threshold slightly for less sensitivity
      if (Math.abs(diff) > 60) {
          const direction = diff > 0 ? 1 : -1;
          // Use functional update for currentPage if relying on previous state
          setCurrentPage(prevPage => {
              const newPage = Math.min(Math.max(prevPage + direction, 0), totalPages - 1);
              if (newPage !== prevPage) {
                  scrollToPage(newPage);
              }
              return newPage; // Return new page to update state
          })
          setTouchStart(null); // Reset touch start after swipe action
      }
  };
   const handleTouchEnd = () => { setTouchStart(null); };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Debounce scroll handler slightly to avoid excessive state updates
      let scrollTimeout: NodeJS.Timeout;
      const debouncedScrollHandler = () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(handleScroll, 100); // Adjust debounce time as needed
      }
      scrollElement.addEventListener('scroll', debouncedScrollHandler, { passive: true });
      return () => {
          clearTimeout(scrollTimeout);
          scrollElement.removeEventListener('scroll', debouncedScrollHandler);
      }
    }
  }, [handleScroll]);


  return (
    <div className="mb-6">
      <div className="relative overflow-hidden"> {/* Removed rounded-lg if not desired */}
        <div
          ref={scrollRef}
          // Removed scroll-smooth for touch handling compatibility, use JS scroll instead
          className={`flex overflow-x-auto snap-x snap-mandatory touch-pan-x no-scrollbar`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {accounts.map((account, index) => ( // account is now type AccountV1
            <div
              key={account.id} // Use string ID here
              className={`${itemWidthClass} flex-shrink-0 snap-start ${index < accounts.length - 1 ? gapClass : ''}`}
            >
              {/* Pass props matching AccountV1 and expected by AccountBalanceCard */}
              <AccountBalanceCard
                className="progress-bar-gradient text-white h-full" // Example class
                accountId={account.id} // Pass string ID
                name={account.name} // Use account.name
                balance={account.balance} // Use account.balance
                currency={account.currency} // Use account.currency
                changePercent={account.changePercent || ""} // Use account.changePercent
                accountType={account.accountType ?? "checking"}
                bankLogo={account.logoUrl} // Use account.logoUrl
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots container */}
      <div className="flex justify-center gap-2 mt-4">
        {/* Create dots based on potentially dynamic totalPages */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            aria-label={`Go to account ${index + 1}`}
            className={`w-2 h-2 p-0 rounded-full transition-colors ${
              currentPage === index ? 'bg-[#235fdf]' : 'bg-gray-300 hover:bg-gray-400'
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