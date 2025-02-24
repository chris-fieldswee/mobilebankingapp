
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, CreditCard, MapPin, ShoppingBag } from "lucide-react";
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
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[0.95rem]">-﷼8,800</h1>
              <p className="text-primary-foreground/70">Harvey Nichols</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-36">
        <div className="max-w-md mx-auto px-4 space-y-6 pb-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Date & Time</span>
                <span>February 24, 15:35</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  Completed
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
              <Button 
                variant="ghost" 
                className="text-primary px-0"
                onClick={() => window.open('https://maps.google.com/?q=Harvey+Nichols+Riyadh', '_blank')}
              >
                Open in Maps
              </Button>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f57989a2-ebdd-4203-af38-d49a8058ef06.png" 
                alt="Map location" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Prince Muhammad Bin Abdulaziz Rd, Al Olaya, Riyadh 12214, Saudi Arabia
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
                👕 Apparel
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This month at Harvey Nichols</p>
                <p className="text-lg font-medium">﷼8,800</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
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
