
import { Home, CreditCard, BarChart3, PieChart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ElevenLabsChatbot from "../chat/ElevenLabsChatbot";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BottomNav = () => {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  // Order: Home, Accounts, Insights, Budgets, Chat
  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: CreditCard, label: "Accounts", path: "/accounts" },
    { icon: BarChart3, label: "Insights", path: "/insights" },
    { icon: PieChart, label: "Budgets", path: "/goals-budgets" },
    { icon: MessageSquare, label: "Chat", path: "#", action: () => setShowChatbot(true) },
  ];

  return (
    <>
      <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
        <DialogContent className="w-full max-w-md h-[75vh] p-0 sm:rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Financial Assistant</h2>
            <button 
              onClick={() => setShowChatbot(false)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close chatbot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-hidden">
            <ElevenLabsChatbot agentId="6Q5kvljL4qqvVyJ3GNYC" className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
      
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
