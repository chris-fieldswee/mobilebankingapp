import React from "react"; // Import React for JSX
import { Search, Bell, Zap, Award } from "lucide-react"; // Removed User icon
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <>
      {/* Add styles for the pulsing animation */}
      <style>
        {`
          @keyframes pulse-blue {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.9); }
          }
          .animate-pulse-blue {
            animation: pulse-blue 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Profile Link with Image */}
          <Link to="/dashboard" aria-label="Go to dashboard">
            {/* Changed Button to simple div for image container */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <img
                src="/ahmed.png" // Path to the user image in the public folder
                alt="User profile picture"
                className="w-full h-full object-cover" // Ensure image covers the area
                // Add onError handler for fallback if needed
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/40x40/f1f0fb/60A5FA?text=A'; // Example placeholder
                    target.alt = 'User profile placeholder';
                }}
              />
            </div>
          </Link>

          {/* Search Button */}
          <Link to="/search" className="flex-1" aria-label="Search">
            <Button
              variant="secondary"
              className="w-full justify-start text-muted-foreground font-normal h-10" // Standardized height
            >
              <Search className="mr-2 h-4 w-4" />
              Search...
            </Button>
          </Link>

          {/* Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2"> {/* Reduced spacing slightly */}
            {/* Stories/Zap Icon with Pulsing Dot */}
            <Link
              to="/stories"
              className="rounded-full relative p-2 hover:bg-accent transition-colors"
              aria-label="View stories"
            >
              <Zap className="h-6 w-6" />
              {/* Added animate-pulse-blue class */}
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full animate-pulse-blue" />
            </Link>

            {/* Notifications/Bell Icon (Dot Removed) */}
            <Link
              to="/notifications"
              className="rounded-full relative p-2 hover:bg-accent transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-6 w-6" />
              {/* Removed the span for the blue dot */}
            </Link>

            {/* Award Icon (Not interactive for now) */}
            <span className="rounded-full p-2 flex items-center justify-center" aria-label="View awards">
              <Award className="h-6 w-6" />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
