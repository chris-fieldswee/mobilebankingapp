import { ArrowLeft, BadgePercent, Landmark, Percent, Plane, ShieldCheck } from "lucide-react"; // Example icons - choose relevant ones
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card"; // Only Card needed here if CardContent etc. not used directly
import { useEffect } from "react";

const PlatinumCardOffer = () => {

  // Content object including the 4 specified benefits
  const content = {
      title: "Platinum Card Offer",
      headerAlt: "SAB Platinum Credit Card Offer",
      // Main offer text (as provided previously)
      cardOffer: "Based on your spending and banking profile, we’re offering you an exclusive upgrade to the SAB Platinum Credit Card, with a first-year annual fee waiver just for you!",
      benefits: {
          // Benefit 1: Lounge Access
          lounge: {
              title: "Complimentary Airport Lounge Access",
              description: "Enjoy exclusive access to 1,200+ airport lounges worldwide.",
              icon: Plane // Example Lucide icon
          },
          // Benefit 2: Cashback
          cashback: {
              title: "Up to 3% Cashback on international spending",
              description: "Earn more on travel, dining, and shopping abroad.",
              icon: Percent // Example Lucide icon
          },
          // Benefit 3: APR
          apr: {
              title: "Personalized APR: 1.5% monthly",
              description: "A tailored rate based on your financial profile.",
              icon: BadgePercent // Example Lucide icon
          },
          // Benefit 4: Travel Perks
          travel: {
              title: "Special Travel Perks",
              description: "Discounted hotel bookings, car rentals, and premium concierge services.",
              icon: ShieldCheck // Example Lucide icon (representing security/benefits)
          },
      },
      // Actions
      actions: {
          upgrade: "Upgrade Now",
          explore: "Explore Other Cards",
      },
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Standard V1 Page Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header (Constrained Width, Sticky) */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         <div className="flex items-center h-14 px-4">
           <Link to="/dashboard"> {/* Adjust link if needed */}
            <Button variant="ghost" size="icon" aria-label="Go back" className="mr-2 shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold flex-1 truncate pr-2">{content.title}</h1>
         </div>
       </header>

       {/* Scrollable Main Content Area */}
       <main className="w-full max-w-md flex-1 bg-background shadow-sm overflow-y-auto">
         <div className="space-y-6 pb-8">
          {/* Hero Image */}
          <div>
            <img
              src="/lovable-uploads/1b0cef9c-0b62-4186-8303-8505724fa8c3.png" // Ensure this path is correct
              alt={content.headerAlt}
              className="w-full object-cover aspect-[3/1] sm:aspect-[2/1]" // Adjust aspect ratio
            />
          </div>

          {/* Content Card */}
           <div className="px-4 md:px-6 space-y-6">
              {/* Using Card component directly for grouping */}
              <Card className="p-5 sm:p-6 space-y-6">
                {/* Offer Text */}
                <h2 className="text-xl font-semibold">Exclusive Platinum Upgrade</h2>
                <p className="text-base text-muted-foreground">
                  {content.cardOffer}
                </p>

                {/* Benefits Section */}
                <div className="space-y-5 border-t border-border pt-5">
                   <h3 className="text-base font-semibold mb-1">Your Exclusive Benefits:</h3>
                   {/* Map over benefits object for cleaner rendering */}
                   {Object.entries(content.benefits).map(([key, benefit]) => {
                       const IconComponent = benefit.icon; // Get the icon component
                       return (
                         <div key={key} className="flex items-start gap-3">
                           {IconComponent && ( // Render icon if provided
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                               <IconComponent className="h-4 w-4" />
                             </div>
                           )}
                           {!IconComponent && ( // Fallback div if no icon
                               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0 mt-0.5 border"></div>
                           )}
                           <div className="space-y-0.5 flex-1">
                             <h4 className="font-medium text-sm">{benefit.title}</h4>
                             <p className="text-sm text-muted-foreground">
                               {benefit.description}
                             </p>
                           </div>
                         </div>
                       );
                   })}
                </div>

                {/* Action Buttons */}
                <div className="pt-5 space-y-3 border-t border-border">
                  <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 px-8 w-full rounded-full bg-[#2663eb] text-[white]" size="lg">
                    {content.actions.upgrade}
                  </Button>
                  <Button variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 px-8 w-full rounded-full bg-white text-primary hover:bg-white/90" size="lg">
                    {content.actions.explore}
                  </Button>
                </div>
              </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlatinumCardOffer;