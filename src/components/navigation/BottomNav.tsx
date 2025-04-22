
import { Home, CreditCard, BarChart3, PieChart, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  // Order: Home, Accounts, Insights, Budgets, Advisor
  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: CreditCard, label: "Accounts", path: "/accounts" },
    { icon: BarChart3, label: "Insights", path: "/insights" },
    { icon: PieChart, label: "Budgets", path: "/goals-budgets" },
    { icon: Lightbulb, label: "Advisor", path: "/advisor" },
  ];

  return (
    <nav className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-lg">
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
