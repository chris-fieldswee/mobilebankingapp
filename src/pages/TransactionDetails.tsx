
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, CreditCard, MapPin, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const TransactionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <header className="flex-none fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary-foreground"
            onClick={() => navigate(-1)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">-zł 11.61</h1>
              <p className="text-primary-foreground/70">Lidl</p>
            </div>
            <Card className="bg-white/10 border-0 p-3">
              <p className="text-xs text-primary-foreground/70">This month at Lidl</p>
              <p className="text-sm font-medium">zł 156.42</p>
            </Card>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-36">
        <div className="max-w-md mx-auto px-4 space-y-6 pb-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Date & Time</span>
                <span>Yesterday, 22:19</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                  Pending
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Card</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>General ··1018</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Location</span>
              </div>
              <Button variant="ghost" className="text-primary px-0">Open in Maps</Button>
            </div>
            <div className="aspect-video w-full rounded-lg bg-muted">
              {/* Map integration would go here */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Map View
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Plastyczna 12, 02-449 Warsaw, Poland
            </p>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Statement</span>
              <Button variant="ghost" className="text-primary px-0">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Category</p>
                <p className="text-sm text-muted-foreground">Helps you track spending</p>
              </div>
              <Button variant="outline" className="gap-2">
                🛒 Groceries
              </Button>
            </div>
          </Card>

          <div className="text-center p-4">
            <Button variant="ghost" className="text-muted-foreground">
              Exclude from analytics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionDetails;
