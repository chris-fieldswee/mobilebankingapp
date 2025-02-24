
import { Bell, DollarSign, CreditCard, Calendar, AlertCircle, XCircle, ShieldCheck, UserCheck, FileText, AlertOctagon, TrendingDown, Gift, Star, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotificationItem = ({ 
  title, 
  description, 
  time, 
  icon: Icon,
  type = "default" 
}: { 
  title: string; 
  description: string; 
  time: string; 
  icon: any;
  type?: "default" | "warning" | "success" | "error";
}) => {
  const getIconColor = () => {
    switch (type) {
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-secondary/50 transition-colors">
      <div className="flex gap-3">
        <div className={`h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0 ${getIconColor()}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium">{title}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{time}</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const notifications = [
  {
    icon: DollarSign,
    title: "Payment Received",
    description: "You received 2,500﷼ from Ahmed Al-Fasal.",
    time: "Just now",
    type: "success"
  },
  {
    icon: CreditCard,
    title: "Harvey Nichols Purchase",
    description: "Purchase at Harvey Nichols for 8,800﷼.",
    time: "5 mins ago"
  },
  {
    icon: CreditCard,
    title: "Danube Gourmet Purchase",
    description: "Purchase at Danube Gourmet for 1,200﷼.",
    time: "15 mins ago"
  },
  {
    icon: AlertOctagon,
    title: "Low Balance Alert",
    description: "Your account balance is below 5,000﷼. Consider adding funds.",
    time: "30 mins ago",
    type: "warning"
  },
  {
    icon: XCircle,
    title: "Payment Failed",
    description: "Your payment of 800﷼ to Helpling failed. Please update your payment method.",
    time: "45 mins ago",
    type: "error"
  },
  {
    icon: ShieldCheck,
    title: "Security Update",
    description: "Your password was changed successfully.",
    time: "1 hour ago",
    type: "success"
  },
  {
    icon: UserCheck,
    title: "New Device Login",
    description: "New login detected from iPhone 16 in Riyadh. Verify it's you.",
    time: "2 hours ago",
    type: "warning"
  },
  {
    icon: FileText,
    title: "Statement Available",
    description: "Your February statement is now available.",
    time: "3 hours ago"
  },
  {
    icon: AlertCircle,
    title: "Budget Alert",
    description: "You're nearing your Entertainment budget. You have 500﷼ remaining.",
    time: "4 hours ago",
    type: "warning"
  },
  {
    icon: AlertOctagon,
    title: "Over Budget",
    description: "You've exceeded your Dining budget for this month.",
    time: "5 hours ago",
    type: "error"
  },
  {
    icon: TrendingDown,
    title: "Spending Change",
    description: "Spent 2,000﷼ less on dining this month",
    time: "6 hours ago",
    type: "success"
  },
  {
    icon: Gift,
    title: "New Offer",
    description: "A new offer is available at VOX Cinemas. View details.",
    time: "7 hours ago"
  },
  {
    icon: Star,
    title: "Rewards Points",
    description: "You have 15,000 rewards points. Redeem them now!",
    time: "8 hours ago"
  },
  {
    icon: Send,
    title: "Payment Sent",
    description: "Your scheduled payment of 3,500﷼ to Mercedes-Benz has been sent.",
    time: "9 hours ago",
    type: "success"
  }
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-56px)] mt-14">
        <main className="max-w-md mx-auto">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              icon={notification.icon}
              title={notification.title}
              description={notification.description}
              time={notification.time}
              type={notification.type as "default" | "warning" | "success" | "error"}
            />
          ))}
        </main>
      </ScrollArea>
    </div>
  );
};

export default Notifications;
