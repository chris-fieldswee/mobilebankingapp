
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const PlatinumCardOffer = () => {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b bg-background fixed top-0 left-0 right-0 z-10">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Platinum Card Offer</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-20 pb-8">
        <div className="space-y-6">
          <div className="flex justify-center p-6">
            <img
              src="https://source.unsplash.com/random/800x500?creditcard"
              alt="SAB Platinum Credit Card"
              className="w-full max-w-[300px] rounded-xl shadow-lg"
            />
          </div>

          <Card className="p-6 space-y-6">
            <p className="text-lg">
              Based on your spending and banking profile, we're offering you an exclusive upgrade to the SAB Platinum Credit Card, with a first-year annual fee waiver just for you!
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold">Complimentary Airport Lounge Access</h3>
                <p className="text-muted-foreground">
                  Enjoy exclusive access to 1,200+ airport lounges worldwide.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">Up to 3% Cashback on International Spending</h3>
                <p className="text-muted-foreground">
                  Earn more on travel, dining, and shopping abroad.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">Personalized APR: 1.5% Monthly</h3>
                <p className="text-muted-foreground">
                  A tailored rate based on your financial profile.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">Special Travel Perks</h3>
                <p className="text-muted-foreground">
                  Discounted hotel bookings, car rentals, and premium concierge services.
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full" size="lg">
                Upgrade Now
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Explore Full Benefits
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PlatinumCardOffer;
