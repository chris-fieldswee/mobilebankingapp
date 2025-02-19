
import { Search, Bell, ChevronDown, BarChart2, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>New payment received</DropdownMenuItem>
              <DropdownMenuItem>Card transaction alert</DropdownMenuItem>
              <DropdownMenuItem>Security update</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-full">
            <BarChart2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
