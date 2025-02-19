
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { ChevronLeft, Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingPayments = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNav />
      <main className="flex-1 overflow-auto pt-20 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold">Upcoming Payments</h2>
          </div>
          
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
      <BottomNav />
    </div>
  );
};

export default UpcomingPayments;
