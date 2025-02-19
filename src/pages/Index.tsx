
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const AccountsCarousel = () => (
  <Card className="p-6 mb-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm opacity-80">Total Balance</p>
        <h2 className="text-2xl font-semibold">$12,750.00</h2>
      </div>
      <Button variant="ghost" size="sm" className="text-primary-foreground">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex -mx-1">
      <div className="w-2 h-2 mx-1 rounded-full bg-primary-foreground opacity-90" />
      <div className="w-2 h-2 mx-1 rounded-full bg-primary-foreground/30" />
      <div className="w-2 h-2 mx-1 rounded-full bg-primary-foreground/30" />
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <ScrollArea className="h-[calc(100vh-120px)] mt-14 mb-16">
        <main className="max-w-md mx-auto px-4 py-6">
          <AccountsCarousel />
          <QuickActions />
          
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
        </main>
      </ScrollArea>
      
      <BottomNav />
    </div>
  );
};

export default Index;
