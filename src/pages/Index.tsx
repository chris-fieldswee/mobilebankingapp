import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus, Send, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const mockSpendingData = [
  { day: "1", amount: 120 },
  { day: "5", amount: 80 },
  { day: "10", amount: 200 },
  { day: "15", amount: 150 },
  { day: "20", amount: 180 },
  { day: "25", amount: 90 },
  { day: "30", amount: 140 },
];

const accounts = [
  { currency: "USD", balance: "12,750.00", symbol: "$" },
  { currency: "GBP", balance: "9,840.00", symbol: "£" },
  { currency: "PLN", balance: "42,500.00", symbol: "zł" },
];

const AccountsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev + 1) % accounts.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + accounts.length) % accounts.length);
    }
  };

  const account = accounts[activeIndex];

  return (
    <Card className="p-6 mb-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
      <div 
        className="transition-transform duration-300"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          
          const handleTouchEnd = (e: TouchEvent) => {
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? 'left' : 'right');
            }
          };
          
          document.addEventListener('touchend', handleTouchEnd, { once: true });
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <h2 className="text-2xl font-semibold">
              {account.symbol}{account.balance}
            </h2>
            <p className="text-sm mt-1 opacity-80">{account.currency}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex -mx-1">
        {accounts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-opacity ${
              index === activeIndex
                ? "bg-primary-foreground opacity-90"
                : "bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

const SpendingChallengeWidget = () => (
  <Card className="p-6 mb-6 bg-gradient-to-br from-green-500/10 to-yellow-500/10">
    <div className="flex flex-col">
      <h3 className="font-semibold mb-3">Your Spending Challenge</h3>
      <div className="h-2 w-full bg-secondary rounded-full mb-3">
        <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">$1,450 spent</span>
        <span className="text-muted-foreground">$2,000 goal</span>
      </div>
      <p className="text-sm text-green-600 font-medium">
        You're 70% to your goal – keep it up!
      </p>
    </div>
  </Card>
);

const SpendingChart = () => (
  <Card className="p-6 mb-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
    <h3 className="font-semibold mb-4">Spent This Month</h3>
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockSpendingData}>
          <XAxis 
            dataKey="day" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            style={{ opacity: 0.8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

const QuickActions = () => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    {[
      { icon: Plus, label: "Add Money" },
      { icon: Send, label: "Transfer" },
      { icon: FileText, label: "Details" },
    ].map((action) => (
      <Button
        key={action.label}
        variant="outline"
        className="flex flex-col h-auto py-4 hover:bg-secondary"
      >
        <action.icon className="h-5 w-5 mb-2" />
        <span className="text-xs">{action.label}</span>
      </Button>
    ))}
  </div>
);

const TransactionItem = ({ merchant, amount, date }: any) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
        {merchant[0]}
      </div>
      <div>
        <p className="font-medium">{merchant}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
    <span className={amount.startsWith('-') ? 'text-destructive' : 'text-green-600'}>
      {amount}
    </span>
  </div>
);

const UpcomingTransactions = () => (
  <Card className="p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Upcoming Transactions</h3>
      <Button variant="ghost" size="sm">
        See all
      </Button>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Netflix Subscription</p>
            <p className="text-sm text-muted-foreground">Due in 3 days</p>
          </div>
        </div>
        <span className="text-destructive font-medium">-$14.99</span>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Gym Membership</p>
            <p className="text-sm text-muted-foreground">Due in 5 days</p>
          </div>
        </div>
        <span className="text-destructive font-medium">-$29.99</span>
      </div>
    </div>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <TopNav />
      
      <ScrollArea className="h-[calc(100vh-120px)] mt-14">
        <main className="max-w-md mx-auto px-4 py-6">
          <AccountsCarousel />
          <QuickActions />
          <SpendingChallengeWidget />
          <SpendingChart />
          
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Transactions</h3>
              <Button variant="ghost" size="sm">
                See all
              </Button>
            </div>
            
            <div className="divide-y">
              <TransactionItem
                merchant="Spotify"
                amount="-$9.99"
                date="Today"
              />
              <TransactionItem
                merchant="Amazon"
                amount="-$25.50"
                date="Yesterday"
              />
              <TransactionItem
                merchant="Salary"
                amount="+$3,500.00"
                date="Mar 1"
              />
            </div>
          </Card>
          
          <UpcomingTransactions />
        </main>
      </ScrollArea>
      
      <BottomNav />
    </div>
  );
};

export default Index;
