
import { Home, Send, MessageSquare, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { icon: Home, label: t('nav.home'), path: "/" },
    { icon: Send, label: t('nav.payments'), path: "/transactions" },
    { icon: MessageSquare, label: t('nav.advisor'), path: "/advisor", hasNotification: true },
    { icon: CreditCard, label: t('nav.card'), path: "/platinum-card-offer" },
  ];

  return (
    <nav className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-lg border-t">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
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
              {item.hasNotification && (
                <div className="absolute -top-1 -right-1 w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-blue-600 opacity-75 animate-ping" />
                  <span className="absolute inline-flex w-full h-full rounded-full bg-blue-600" />
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
