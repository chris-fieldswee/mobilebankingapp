
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: "advisor" | "user";
  options?: {
    text: string;
    action?: () => void;
  }[];
};

const Advisor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Exciting news, Ali Al-Faisal! We noticed you recently booked a flight with Riyadh Air. Let's make sure you're all set for a smooth journey!",
      sender: "advisor"
    },
    {
      id: 2,
      text: "Did you know that your SAB Premier World Mastercard comes with exclusive travel benefits?\n\n• Discounted Foreign Exchange Rates for international transactions\n\n• Complimentary Travel Insurance including trip cancellations, medical coverage, and lost baggage protection",
      sender: "advisor",
      options: [
        {
          text: "Explore discounted foreign exchange rates",
          action: () => handleOptionSelect("exchange")
        },
        {
          text: "Tell me more about travel insurance",
          action: () => handleOptionSelect("insurance")
        }
      ]
    }
  ]);

  const navigate = useNavigate();

  const handleOptionSelect = (option: "exchange" | "insurance") => {
    if (option === "insurance") {
      const insuranceMessage: Message = {
        id: Date.now(),
        text: "Great choice! Your SAB Premier World Mastercard includes complimentary travel insurance when you book your trip using the card. Here's what's covered:\n\n• Baggage Loss: Up to SAR 11,250\n\n• Trip Cancellation: Up to SAR 28,125\n\n• Personal Accident Coverage: Up to SAR 1,875,000\n\n• Medical Emergency & Evacuation: Up to SAR 1,875,000",
        sender: "advisor"
      };

      const followUpMessage: Message = {
        id: Date.now() + 1,
        text: "Would you like to review your full travel insurance policy and activate coverage?",
        sender: "advisor",
        options: [
          {
            text: "Yes, show my coverage details",
            action: () => navigate("/insurance")
          },
          {
            text: "Not now, I'll deal with it later",
            action: () => null
          }
        ]
      };

      setMessages(prev => [...prev, insuranceMessage, followUpMessage]);
    } else {
      const exchangeMessage: Message = {
        id: Date.now(),
        text: "With your SAB Premier World Mastercard, you get preferential exchange rates on all international transactions. This means you save on every purchase you make abroad!",
        sender: "advisor"
      };

      setMessages(prev => [...prev, exchangeMessage]);
    }
  };

  return (
    <div className="fixed inset-0 bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-purple-600">A</span>
            </div>
            <div>
              <h2 className="font-semibold">Ana</h2>
              <p className="text-sm text-muted-foreground">Financial Advisor</p>
            </div>
          </div>
        </div>
      </header>

      <main className="h-full pt-14 pb-4 overflow-auto">
        <div className="max-w-md mx-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl p-4",
                  message.sender === "advisor" 
                    ? "bg-secondary ml-0 mr-auto" 
                    : "bg-primary text-primary-foreground ml-auto mr-0"
                )}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
              {message.options && (
                <div className="mt-4 space-y-2 max-w-[85%]">
                  {message.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 px-4"
                      onClick={option.action}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Advisor;
