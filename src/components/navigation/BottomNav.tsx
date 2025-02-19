
import { Home, Send, MessageSquare, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Send, label: "Payments" },
  { icon: MessageSquare, label: "Advisor" },
  { icon: CreditCard, label: "Card" },
];

const BottomNav = () => {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {menuItems.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "flex flex-col items-center py-1 px-3 rounded-lg hover:bg-transparent",
              active === index && "text-primary"
            )}
            onClick={() => setActive(index)}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
