
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const UpcomingPayments = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Upcoming Payments</h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-56px)] mt-14">
        <main className="max-w-md mx-auto">
          <div className="p-4">
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold mb-4">Subscriptions</h3>
                <Card className="p-6">
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
                          <p className="font-medium">Spotify Premium</p>
                          <p className="text-sm text-muted-foreground">Due in 5 days</p>
                        </div>
                      </div>
                      <span className="text-destructive font-medium">-$9.99</span>
                    </div>
                  </div>
                </Card>
              </section>

              <section>
                <h3 className="font-semibold mb-4">Anticipated Payments</h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Electricity Bill</p>
                          <p className="text-sm text-muted-foreground">Expected next week</p>
                        </div>
                      </div>
                      <span className="text-destructive font-medium">~$85.00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Internet Bill</p>
                          <p className="text-sm text-muted-foreground">Expected in 2 weeks</p>
                        </div>
                      </div>
                      <span className="text-destructive font-medium">~$45.00</span>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default UpcomingPayments;
