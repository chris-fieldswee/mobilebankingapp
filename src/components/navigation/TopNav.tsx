
import { Search, Bell, Zap, BarChart2, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-7 w-7" />
        </Button>
        
        <div className="flex-1 max-w-[180px]" onClick={() => navigate('/search')}>
          <div className="relative cursor-pointer">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-8 h-9 bg-secondary pointer-events-none"
              readOnly
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/stories">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Zap className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
          
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </Link>

          <Link to="/insights">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BarChart2 className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
