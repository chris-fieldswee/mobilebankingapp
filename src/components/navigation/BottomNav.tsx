
import { Home, Card, LineChart, Bulb, Badge } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
// Removed useTranslation and translation references

const BottomNav = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Card, label: "Accounts", path: "/transactions" }, // Replaced Send with Card, label is "Accounts"
    { icon: Badge, label: "Budgets", path: "/budgets" }, // Replaced Card icon with Badge for "Budgets"
    { icon: LineChart, label: "Insights", path: "/insights" }, // Added LineChart icon for "Insights"
    { icon: Bulb, label: "Advisor", path: "/advisor" }, // Bulb is used instead of MessageSquare for Advisor
  ];

  return (
    <nav className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-lg border-t">
      <div className="container max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-1 px-3 rounded-lg relative no-underline text-foreground",
              location.pathname === item.path && "text-primary"
            )}
          >
            <div className="relative">
              <item.icon className="h-5 w-5 mb-1" />
            </div>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
