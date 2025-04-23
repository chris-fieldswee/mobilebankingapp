
import { Search, Bell, Zap, User, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="container max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link to="/dashboard">
        <Button variant="ghost" size="icon" className="rounded-full p-0 bg-[#f1f0fb]">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f1f0fb]">
            <User className="h-6 w-6 text-primary" />
          </span>
        </Button>
        </Link>

        <Link to="/search" className="flex-1">
          <Button
            variant="secondary"
            className="w-full justify-start text-muted-foreground font-normal"
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
          </Button>
        </Link>

        <div className="flex items-center space-x-3">
          <Link 
            to="/stories" 
            className="rounded-full relative p-2"
          >
            <Zap className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full" />
          </Link>
          
          <Link 
            to="/notifications" 
            className="rounded-full relative p-2"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full" />
          </Link>

          {/* Award icon (not linked) */}
          <span className="rounded-full p-2 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
