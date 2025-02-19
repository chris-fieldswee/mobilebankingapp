
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotificationItem = ({ title, description, time }: { title: string; description: string; time: string }) => (
  <div className="p-4 border-b last:border-b-0">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-medium">{title}</h3>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

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
          <NotificationItem
            title="New Payment Received"
            description="You received $50.00 from John Doe"
            time="2 mins ago"
          />
          <NotificationItem
            title="Card Transaction Alert"
            description="Purchase at Amazon.com for $25.50"
            time="1 hour ago"
          />
          <NotificationItem
            title="Security Update"
            description="Your password was changed successfully"
            time="2 hours ago"
          />
          <NotificationItem
            title="Account Statement"
            description="Your February statement is now available"
            time="1 day ago"
          />
        </main>
      </ScrollArea>
    </div>
  );
};

export default Notifications;
