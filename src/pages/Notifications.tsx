
import { Bell, DollarSign, CreditCard, Calendar, AlertCircle, XCircle, ShieldCheck, UserCheck, FileText, AlertOctagon, TrendingDown, Gift, Star, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-secondary/50 transition-colors">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-muted-foreground" />
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

const getTimeTranslation = (time: string, t: any) => {
  if (time.includes("mins")) {
    return time.replace("mins", t('time.mins')).replace("ago", t('time.ago'));
  }
  if (time.includes("hour")) {
    return time.replace("hour", t('time.hour')).replace("ago", t('time.ago'));
  }
  if (time.includes("Just now")) {
    return t('time.justNow');
  }
  return time;
};

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    {
      icon: DollarSign,
      title: t('notifications.transactions.paymentReceived'),
      description: t('notifications.transactions.receivedAmount', { amount: '2,500' }),
      time: t('time.justNow'),
      type: "success"
    },
    {
      icon: CreditCard,
      title: t('notifications.transactions.harveyPurchase'),
      description: t('notifications.transactions.purchaseAt', { store: 'Harvey Nichols', amount: '8,800' }),
      time: "5 mins ago"
    },
    {
      icon: CreditCard,
      title: t('notifications.transactions.danubePurchase'),
      description: t('notifications.transactions.purchaseAt', { store: 'Danube Gourmet', amount: '1,200' }),
      time: "15 mins ago"
    },
    {
      icon: AlertOctagon,
      title: t('notifications.alerts.lowBalance'),
      description: t('notifications.alerts.lowBalanceDesc', { amount: '5,000' }),
      time: "30 mins ago",
      type: "warning"
    },
    {
      icon: XCircle,
      title: t('notifications.alerts.paymentFailed'),
      description: t('notifications.alerts.paymentFailedDesc', { amount: '800', service: 'Helpling' }),
      time: "45 mins ago",
      type: "error"
    },
    {
      icon: ShieldCheck,
      title: t('notifications.security.passwordChanged'),
      description: t('notifications.security.passwordChangedDesc'),
      time: "1 hour ago",
      type: "success"
    },
    {
      icon: UserCheck,
      title: t('notifications.security.newLogin'),
      description: t('notifications.security.newLoginDesc'),
      time: "2 hours ago",
      type: "warning"
    },
    {
      icon: FileText,
      title: t('notifications.statements.available'),
      description: t('notifications.statements.availableDesc'),
      time: "3 hours ago"
    },
    {
      icon: AlertCircle,
      title: t('notifications.budget.alert'),
      description: t('notifications.budget.alertDesc', { amount: '500' }),
      time: "4 hours ago",
      type: "warning"
    },
    {
      icon: AlertOctagon,
      title: t('notifications.budget.overBudget'),
      description: t('notifications.budget.overBudgetDesc'),
      time: "5 hours ago",
      type: "error"
    },
    {
      icon: TrendingDown,
      title: t('notifications.spending.change'),
      description: t('notifications.spending.changeDesc', { amount: '2,000' }),
      time: "6 hours ago",
      type: "success"
    },
    {
      icon: Gift,
      title: t('notifications.offers.new'),
      description: t('notifications.offers.newDesc'),
      time: "7 hours ago"
    },
    {
      icon: Star,
      title: t('notifications.rewards.points'),
      description: t('notifications.rewards.pointsDesc', { points: '15,000' }),
      time: "8 hours ago"
    },
    {
      icon: Send,
      title: t('notifications.transactions.paymentSent'),
      description: t('notifications.transactions.paymentSentDesc', { amount: '3,500', recipient: 'Mercedes-Benz' }),
      time: "9 hours ago",
      type: "success"
    }
  ];

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
          <h1 className="text-lg font-semibold">{t('notifications.title')}</h1>
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
              time={getTimeTranslation(notification.time, t)}
              type={notification.type as "default" | "warning" | "success" | "error"}
            />
          ))}
        </main>
      </ScrollArea>
    </div>
  );
};

export default Notifications;
