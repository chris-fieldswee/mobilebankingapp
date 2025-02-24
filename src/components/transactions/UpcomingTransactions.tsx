
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingTransactions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Upcoming Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/upcoming-payments')}>
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
              <p className="font-medium">Tuition Fee</p>
              <p className="text-sm text-muted-foreground">Due in 5 days</p>
            </div>
          </div>
          <span className="text-destructive font-medium">-﷼80,000</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Play className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Netflix Subscription</p>
              <p className="text-sm text-muted-foreground">Due in 3 days</p>
            </div>
          </div>
          <span className="text-destructive font-medium">-﷼45</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Spotify Premium</p>
              <p className="text-sm text-muted-foreground">Due in 7 days</p>
            </div>
          </div>
          <span className="text-destructive font-medium">-﷼20</span>
        </div>
      </div>
    </Card>
  );
};

export default UpcomingTransactions;
