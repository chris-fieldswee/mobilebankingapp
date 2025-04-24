import React from 'react'; // Added React import
import {
  Bell, DollarSign, CreditCard, Calendar, AlertCircle, XCircle,
  ShieldCheck, UserCheck, FileText, AlertOctagon, TrendingDown, Gift,
  Star, Send, ChevronLeft, Package,
  Award, CalendarClock, Target, TrendingUp, // Now includes TrendingUp
  ShoppingCart, ShoppingBag, Utensils, Car // Now includes ShoppingCart, ShoppingBag, Car
} from "lucide-react"; 
import { ScrollArea } from "@/components/ui/scroll-area";// Make sure ALL needed icons are listed hereimport { ScrollArea } from "@/components/ui/scroll-area";
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

  // Refined notifications data for SAR context
  const notificationsData = [
    { icon: DollarSign, title: "Salary Received", description: `Your salary payment of SAR 60,000 was received in SAB Current Account.`, time: "Just now", type: "success" },
    { icon: ShoppingBag, title: "Purchase at Jarir Bookstore", description: `SAR 190.00 spent from Al Rajhi Current Account.`, time: "5m ago" },
    { icon: Car, title: "Ride with Uber", description: `SAR 66.50 paid from Riyad Bank Current Account.`, time: "45m ago" },
    { icon: AlertCircle, title: "Budget Alert: Food & Drink", description: `You've spent SAR 785.50 of your SAR 800 monthly budget.`, time: "2h ago", type: "warning" }, // Relates to mockBudgetsV1 b2
    { icon: TrendingUp, title: "Goal Progress: Emergency Fund", description: `You're 78% towards your SAR 20,000 goal! Keep it up!`, time: "5h ago", type: "success" }, // Relates to mockGoalsV1 g1
    { icon: CalendarClock, title: "Upcoming: Netflix", description: `Your SAR 69 Netflix subscription payment is due May 16.`, time: "1d ago" }, // Relates to mockSubscriptionsV1
    { icon: AlertOctagon, title: "Over Budget: Groceries", description: `You've exceeded your SAR 1500 Groceries budget.`, time: "1d ago", type: "error" }, // Relates to mockBudgetsV1 b1
    { icon: ShieldCheck, title: "Security Tip", description: "Enable Two-Factor Authentication for enhanced account security.", time: "2d ago" },
    { icon: FileText, title: "Statement Ready", description: "Your April statement for SAB Current Account is available.", time: "3d ago" },
    { icon: ShoppingCart, title: "Purchase at Tamimi Markets", description: `SAR 287.50 spent from SAB Current Account.`, time: "3d ago" },
    { icon: Send, title: "Transfer Completed", description: `SAR 2,000 transferred to SNB Savings Account.`, time: "4d ago", type: "success" }, // Relates to inc1
    { icon: UserCheck, title: "New Device Login", description: "Login detected from Safari on macOS near Dammam. Was this you?", time: "5d ago", type: "warning" },
    { icon: Star, title: "Goal Achieved: New Laptop!", description: `Congratulations! You've saved SAR 7,000 for your new laptop!`, time: "1w ago", type: "success" }, // Assumes Goal g3 is achieved based on mock data calculation
    { icon: AlertOctagon, title: "Low Balance Warning", description: `Your Al Rajhi Current Account balance (SAR 12,500) is below your SAR 15,000 alert threshold.`, time: "1w ago", type: "warning" }, // Relates to acc2 balance
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