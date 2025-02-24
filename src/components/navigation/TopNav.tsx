import { CircleUserRound, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-7 w-7" />
        </Button>
        
        <Link to="/search" className="flex-1">
          <Button
            variant="secondary"
            className="w-full justify-start text-muted-foreground font-normal"
          >
            <Search className="mr-2 h-4 w-4" />
            Search insights and transactions...
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
