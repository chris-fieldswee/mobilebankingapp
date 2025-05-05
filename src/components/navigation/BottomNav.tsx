
import { Home, CreditCard, BarChart3, PieChart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ElevenLabsChatbot from "../chat/ElevenLabsChatbot";

const BottomNav = () => {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  // Order: Home, Accounts, Insights, Budgets, Advisor -> Now changing Advisor to Chat
  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: CreditCard, label: "Accounts", path: "/accounts" },
    { icon: BarChart3, label: "Insights", path: "/insights" },
    { icon: PieChart, label: "Budgets", path: "/goals-budgets" },
    { icon: MessageSquare, label: "Chat", path: "#", action: () => setShowChatbot(!showChatbot) },
  ];

  return (
    <>
      {showChatbot && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-end justify-center pb-20">
          <div className="relative w-full max-w-md h-[80vh] bg-white rounded-t-xl shadow-lg">
            <button 
              onClick={() => setShowChatbot(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 z-50"
              aria-label="Close chatbot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Financial Assistant</h2>
            </div>
            <ElevenLabsChatbot agentId="6Q5kvljL4qqvVyJ3GNYC" className="w-full h-full" />
          </div>
        </div>
      )}
      <nav className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container max-w-md mx-auto px-4 py-4 h-16 flex items-center justify-around">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action ? item.action : undefined}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-lg relative no-underline text-foreground",
                location.pathname === item.path && !item.action && "text-primary"
              )}
            >
              {item.path && !item.action ? (
                <Link
                  to={item.path}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5 mb-1" />
                  </div>
                  <span className="text-xs">{item.label}</span>
                </Link>
              ) : (
                <>
                  <div className="relative">
                    <item.icon className="h-5 w-5 mb-1" />
                  </div>
                  <span className="text-xs">{item.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
