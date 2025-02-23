
import { Home, Send, MessageSquare, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Send, label: "Payments", path: "/transactions" },
  { icon: MessageSquare, label: "Advisor", path: "/advisor", hasNotification: true },
  { icon: CreditCard, label: "Card", path: "/" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path}
            className={cn(
              "flex flex-col items-center py-1 px-3 rounded-lg hover:bg-transparent relative no-underline",
              location.pathname === item.path ? "text-primary" : "text-foreground"
            )}
          >
            <div className="relative">
              <item.icon className="h-5 w-5 mb-1" />
              {item.hasNotification && (
                <div className="absolute -top-1 -right-1 w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  <span className="absolute inline-flex w-full h-full rounded-full bg-red-500"></span>
                </div>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
