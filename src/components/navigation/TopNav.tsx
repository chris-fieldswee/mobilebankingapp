
import { Search, Bell, Zap, BarChart2, CircleUserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link 
          to="/profile" 
          className="rounded-full p-2 hover:bg-accent"
        >
          <CircleUserRound className="h-7 w-7" />
        </Link>
        
        <Link 
          to="/search"
          className="flex-1 max-w-[180px] no-underline"
        >
          <div className="relative cursor-pointer">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-8 h-9 bg-secondary pointer-events-none"
              readOnly
            />
          </div>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link 
            to="/stories" 
            className="rounded-full relative p-2 hover:bg-accent no-underline"
          >
            <Zap className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Link>
          
          <Link 
            to="/notifications" 
            className="rounded-full relative p-2 hover:bg-accent no-underline"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Link>

          <Link 
            to="/insights" 
            className="rounded-full p-2 hover:bg-accent no-underline"
          >
            <BarChart2 className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
