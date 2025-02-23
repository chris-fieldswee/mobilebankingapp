
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Unlock Elite Benefits with the SAB Platinum Credit Card",
    image: "https://source.unsplash.com/random/800x600?creditcard",
    subtitle: null,
    link: "/platinum-card-offer"
  },
  {
    id: 2,
    title: "Dine at Partner Restaurant",
    subtitle: "Get 15% cashback when you pay with your SAB Credit Card",
    image: "https://source.unsplash.com/random/800x600?restaurant",
    link: null
  },
  {
    id: 3,
    title: "Loans at competitive rates",
    subtitle: "Put your plans into action with Loans",
    image: "https://source.unsplash.com/random/800x600?stairs",
    link: null
  }
];

const OffersCarousel = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!isVisible) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 1 : -1;
      const newOffer = Math.min(Math.max(currentOffer + direction, 0), offers.length - 1);
      setCurrentOffer(newOffer);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const renderOfferContent = (offer: typeof offers[0]) => {
    const content = (
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${offer.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-lg font-semibold mb-1">
            {offer.title}
          </h3>
          {offer.subtitle && (
            <p className="text-white/80 text-sm">
              {offer.subtitle}
            </p>
          )}
        </div>
      </div>
    );

    if (offer.link) {
      return (
        <Link to={offer.link} className="block w-full h-full">
          {content}
        </Link>
      );
    }

    return content;
  };

  return (
    <div className="mb-6 w-full">
      <Card className="relative overflow-hidden w-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div 
          className="flex overflow-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex w-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentOffer * 100}%)` }}
          >
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="w-full flex-shrink-0 min-h-[200px]"
                style={{ aspectRatio: "16/9" }}
              >
                {renderOfferContent(offer)}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentOffer ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentOffer(index)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OffersCarousel;
