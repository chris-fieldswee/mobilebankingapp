import React from 'react'; // Added React import
import { Bell, DollarSign, CreditCard, Calendar, AlertCircle, XCircle, ShieldCheck, UserCheck, FileText, AlertOctagon, TrendingDown, Gift, Star, Send, ChevronLeft } from "lucide-react"; // Added ChevronLeft
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Keep Link if using it for back button

// Notification Item Component (Keep as is)
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
  icon: React.ElementType;
  type?: "default" | "warning" | "success" | "error";
}) => {
  // Optional: Define icon colors based on type if desired
  // const typeClasses = {
  //   warning: "text-yellow-600 bg-yellow-500/10",
  //   error: "text-red-600 bg-red-500/10",
  //   success: "text-green-600 bg-green-500/10",
  //   default: "text-muted-foreground bg-secondary"
  // }
  // const iconBgClass = typeClasses[type] || typeClasses.default;
  // const iconColorClass = iconBgClass.split(' ')[0]; // Extract text color

  return (
    // Using border-border for consistency
    <div className="p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
      <div className="flex gap-3 items-start"> {/* Align items start */}
        {/* Use consistent muted background for icon */}
        <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-muted border flex items-center justify-center shrink-0 mt-0.5`}>
           {/* Use muted-foreground, maybe vary color based on type later */}
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground`} />
        </div>
        <div className="flex-1">
          {/* Title and Time */}
          <div className="flex justify-between items-center mb-0.5"> {/* Reduced mb */}
            <h3 className="font-medium text-sm leading-snug">{title}</h3> {/* Adjusted text size/leading */}
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{time}</span>
          </div>
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-normal">{description}</p> {/* Adjusted leading */}
        </div>
      </div>
    </div>
  );
};

// Helper function (Keep as is)
const formatRelativeTime = (timeString: string): string => {
    // ... (implementation unchanged) ...
    if (timeString === "Just now") return "Just now";
    const matchMins = timeString.match(/^(\d+)\s+mins\s+ago$/);
    if (matchMins) return `${matchMins[1]}m ago`; // Shorter format
    const matchHour = timeString.match(/^(\d+)\s+hour(?:s)?\s+ago$/); // Allow plural 'hours'
    if (matchHour) return `${matchHour[1]}h ago`; // Shorter format
    return timeString; // Fallback
};


// Main Notifications Page Component
const Notifications = () => {

  // Hardcoded English notifications data (Keep as is)
  const notificationsData = [
     { icon: DollarSign, title: "Payment Received", description: `You have received €2,500`, time: "Just now", type: "success" },
     { icon: CreditCard, title: "Purchase at Harvey Nichols", description: `Purchase at Harvey Nichols: €8,800`, time: "5 mins ago" },
     { icon: CreditCard, title: "Purchase at Danube Gourmet", description: `Purchase at Danube Gourmet: €1,200`, time: "15 mins ago" },
     { icon: AlertOctagon, title: "Low Balance Alert", description: `Your account balance is below €5,000.`, time: "30 mins ago", type: "warning" },
     { icon: XCircle, title: "Payment Failed", description: `Payment of €800 for Helpling failed.`, time: "45 mins ago", type: "error" },
     { icon: ShieldCheck, title: "Password Changed", description: "Your password was successfully changed.", time: "1 hour ago", type: "success" },
     { icon: UserCheck, title: "New Device Login", description: "A login occurred from a new device.", time: "2 hours ago", type: "warning" },
     { icon: FileText, title: "Statement Available", description: "Your monthly statement is now available.", time: "3 hours ago" },
     { icon: AlertCircle, title: "Budget Alert", description: `You are nearing your budget limit (€500 remaining).`, time: "4 hours ago", type: "warning" },
     { icon: AlertOctagon, title: "Over Budget Alert", description: "You have exceeded your monthly budget.", time: "5 hours ago", type: "error" },
     { icon: TrendingDown, title: "Spending Change Alert", description: `Your spending decreased by €2,000 compared to last month.`, time: "6 hours ago", type: "success" },
     { icon: Gift, title: "New Offer Available", description: "Check out the latest offers available for you.", time: "7 hours ago" },
     { icon: Star, title: "Rewards Points Update", description: `You have earned 15,000 rewards points.`, time: "8 hours ago" },
     { icon: Send, title: "Payment Sent", description: `Payment of €3,500 sent to Mercedes-Benz.`, time: "9 hours ago", type: "success" }
  ];

  return (
    // Standard V1 Page Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header (Constrained Width, Sticky) */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
         {/* Removed inner max-w-md div */}
         <div className="px-4 h-14 flex items-center">
           {/* Using Link with Lucide Icon */}
           <Link to="/dashboard"> {/* Adjust link destination as needed */}
            <Button variant="ghost" size="icon" className="mr-2 shrink-0" aria-label="Go back">
              <ChevronLeft className="h-5 w-5" /> {/* Use Lucide icon */}
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Notifications</h1>
         </div>
       </header>

      {/* Scrollable Content Area (Constrained Width) */}
      <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm"> {/* Apply max-w-md here */}
         {/* Remove max-w-md from main, add padding */}
        <main className="pb-16"> {/* Add padding bottom */}
          {notificationsData.length > 0 ? (
              notificationsData.map((notification, index) => (
                <NotificationItem
                  key={index}
                  icon={notification.icon}
                  title={notification.title}
                  description={notification.description}
                  time={formatRelativeTime(notification.time)}
                  type={notification.type as "default" | "warning" | "success" | "error"}
                />
              ))
          ) : (
              <p className="text-center text-muted-foreground p-10">No new notifications.</p> // Empty state
          )}
           {/* Removed extra padding div */}
        </main>
      </ScrollArea>
      {/* Add BottomNav here if Notifications is a main screen */}
      {/* <BottomNav /> */}
    </div>
  );
};

export default Notifications;