
import { Home, Send, MessageSquare, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Send, label: "Payments", path: "/transactions" },
  { icon: MessageSquare, label: "Advisor", path: "/advisor", hasNotification: true },
  { icon: CreditCard, label: "Card", path: "/" },
];

const BottomNav = () => {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {menuItems.map((item, index) => (
          <Link key={item.label} to={item.path} className="relative">
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-lg hover:bg-transparent",
                active === index && "text-primary"
              )}
              onClick={() => setActive(index)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {item.hasNotification && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
