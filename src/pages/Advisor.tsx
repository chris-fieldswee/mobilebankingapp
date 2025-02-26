
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Exciting news, Ali Al-Faisal! We noticed you recently booked a flight with Riyadh Air. Let's make sure you're all set for a smooth journey!",
      sender: "advisor"
    },
    {
      id: 2,
      text: t('advisor.suggestions.travel'),
      sender: "advisor",
      options: [
        {
          text: t('advisor.suggestions.insurance'),
          action: () => handleOptionSelect("insurance")
        },
        {
          text: t('advisor.suggestions.exchange'),
          action: () => handleOptionSelect("exchange")
        }
      ]
    }
  ]);

  const handleOptionSelect = (option: "exchange" | "insurance") => {
    if (option === "insurance") {
      const insuranceMessage: Message = {
        id: Date.now(),
        text: t('advisor.messages.insurance'),
        sender: "advisor"
      };

      const followUpMessage: Message = {
        id: Date.now() + 1,
        text: t('advisor.messages.insuranceFollowUp'),
        sender: "advisor",
        options: [
          {
            text: t('advisor.actions.showCoverage'),
            action: () => navigate("/insurance")
          },
          {
            text: t('advisor.actions.later'),
            action: () => null
          }
        ]
      };

      setMessages(prev => [...prev, insuranceMessage, followUpMessage]);
    } else {
      const exchangeMessage: Message = {
        id: Date.now(),
        text: t('advisor.messages.exchange'),
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
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center relative">
              <span className="text-lg font-semibold text-primary z-10">Z</span>
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"
                style={{
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-full bg-secondary" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold">{t('advisor.name')}</h2>
              <p className="text-sm text-muted-foreground">{t('advisor.title')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="h-full pt-14 pb-4 overflow-auto">
        <div className="max-w-md mx-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              <div className="flex flex-col gap-3">
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4",
                    message.sender === "advisor" 
                      ? "bg-secondary ml-0 mr-auto rounded-bl-none" 
                      : "bg-primary text-primary-foreground ml-auto mr-0 rounded-br-none"
                  )}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
                {message.options && (
                  <div className="flex flex-col gap-2 items-end">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start h-auto py-3 px-4 w-[85%] ml-auto hover:bg-primary hover:text-primary-foreground whitespace-normal"
                        onClick={option.action}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Advisor;
