
import { Home, Send, MessageSquare, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Send, label: "Payments", path: "/transactions" },
  { icon: MessageSquare, label: "Advisor", path: "/advisor", hasNotification: true },
  { icon: CreditCard, label: "Card", path: "/platinum-card-offer" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center py-1 px-3 rounded-lg hover:bg-accent/50 relative no-underline",
                isActive ? "text-primary" : "text-foreground"
              )
            }
          >
            <div className="relative">
              <item.icon className="h-5 w-5 mb-1" />
              {item.hasNotification && (
                <div className="absolute -top-1 -right-1 w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
                  <span className="absolute inline-flex w-full h-full rounded-full bg-red-500" />
                </div>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
