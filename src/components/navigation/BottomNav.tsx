
import { Home, CreditCard, PieChart, BarChart3, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Accounts", path: "/transactions" }, // Using CreditCard instead of Card
    { icon: PieChart, label: "Budgets", path: "/budgets" }, // Using PieChart instead of Badge
    { icon: BarChart3, label: "Insights", path: "/insights" }, // Using BarChart3 instead of LineChart
    { icon: Lightbulb, label: "Advisor", path: "/advisor" }, // Using Lightbulb instead of Bulb
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
