import { Bell, DollarSign, CreditCard, Calendar, AlertCircle, XCircle, ShieldCheck, UserCheck, FileText, AlertOctagon, TrendingDown, Gift, Star, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// REMOVED: import { useTranslation } from "react-i18next";

const NotificationItem = ({
  title,
  description,
  time,
  icon: Icon,
  type = "default"
}: {
  title: string;
  description: string;
  time: string; // Time is now passed directly as processed English string
  icon: React.ElementType; // Use React.ElementType for component icons
  type?: "default" | "warning" | "success" | "error";
}) => {
  // Determine color based on type (optional styling)
  // const iconColor = type === "warning" ? "text-yellow-500" : type === "error" ? "text-destructive" : type === "success" ? "text-emerald-500" : "text-muted-foreground";

  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-secondary/50 transition-colors">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <Icon className={`h-5 w-5 text-muted-foreground`} /> {/* Apply color dynamically if needed */}
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

// Helper function to get relative time (more robust than simple replacement)
// This is a simplified example, consider using a library like `date-fns` for real relative time
const formatRelativeTime = (timeString: string): string => {
    if (timeString === "Just now") return "Just now";
    const matchMins = timeString.match(/^(\d+)\s+mins\s+ago$/);
    if (matchMins) return `${matchMins[1]} mins ago`;
    const matchHour = timeString.match(/^(\d+)\s+hour\s+ago$/);
    if (matchHour) return `${matchHour[1]} hour${parseInt(matchHour[1]) > 1 ? 's' : ''} ago`; // Handle plural
    return timeString; // Fallback
};

const Notifications = () => {
  // REMOVED: const { t } = useTranslation();

  // Hardcoded English notifications data
  const notificationsData = [
    {
      icon: DollarSign,
      title: "Payment Received",
      description: `You have received €2,500`,
      time: "Just now", // Use relative time strings directly
      type: "success"
    },
    {
      icon: CreditCard,
      title: "Purchase at Harvey Nichols",
      description: `Purchase at Harvey Nichols: €8,800`,
      time: "5 mins ago"
    },
    {
      icon: CreditCard,
      title: "Purchase at Danube Gourmet",
      description: `Purchase at Danube Gourmet: €1,200`,
      time: "15 mins ago"
    },
    {
      icon: AlertOctagon,
      title: "Low Balance Alert",
      description: `Your account balance is below €5,000.`,
      time: "30 mins ago",
      type: "warning"
    },
    {
      icon: XCircle,
      title: "Payment Failed",
      description: `Payment of €800 for Helpling failed.`,
      time: "45 mins ago",
      type: "error"
    },
    {
      icon: ShieldCheck,
      title: "Password Changed",
      description: "Your password was successfully changed.",
      time: "1 hour ago",
      type: "success"
    },
    {
      icon: UserCheck,
      title: "New Device Login",
      description: "A login occurred from a new device.",
      time: "2 hours ago",
      type: "warning"
    },
    {
      icon: FileText,
      title: "Statement Available",
      description: "Your monthly statement is now available.",
      time: "3 hours ago"
    },
    {
      icon: AlertCircle,
      title: "Budget Alert",
      description: `You are nearing your budget limit (€500 remaining).`,
      time: "4 hours ago",
      type: "warning"
    },
    {
      icon: AlertOctagon,
      title: "Over Budget Alert",
      description: "You have exceeded your monthly budget.",
      time: "5 hours ago",
      type: "error"
    },
    {
      icon: TrendingDown, // Icon might not perfectly match text - review needed
      title: "Spending Change Alert",
      description: `Your spending decreased by €2,000 compared to last month.`,
      time: "6 hours ago",
      type: "success"
    },
    {
      icon: Gift,
      title: "New Offer Available",
      description: "Check out the latest offers available for you.",
      time: "7 hours ago"
    },
    {
      icon: Star,
      title: "Rewards Points Update",
      description: `You have earned 15,000 rewards points.`,
      time: "8 hours ago"
    },
    {
      icon: Send,
      title: "Payment Sent",
      description: `Payment of €3,500 sent to Mercedes-Benz.`,
      time: "9 hours ago",
      type: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col"> {/* Use flex layout */}
      <header className="flex-shrink-0 z-10 bg-background/80 backdrop-blur-lg border-b"> {/* Adjust z-index, remove fixed */}
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2" aria-label="Go back">
              <svg // Keep using SVG or import ChevronLeft from lucide-react
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
           {/* Hardcoded title */}
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </header>

      {/* Ensure ScrollArea works correctly within flex layout */}
      <ScrollArea className="flex-1">
        <main className="max-w-md mx-auto">
          {notificationsData.map((notification, index) => (
            <NotificationItem
              key={index}
              icon={notification.icon}
              title={notification.title}
              description={notification.description}
              time={formatRelativeTime(notification.time)} // Format time if needed
              type={notification.type as "default" | "warning" | "success" | "error"}
            />
          ))}
           {/* Add padding at the bottom if content is hidden by nav bars etc. */}
           <div className="h-16"></div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default Notifications;