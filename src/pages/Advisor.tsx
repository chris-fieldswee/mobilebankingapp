
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialMessage = "Hi there, I'm Ana, your personal financial advisor. I've been reviewing your spending insights and noticed that your dining expenses last month were 30% above your average. This trend might be impacting your savings goals. Would you like some tailored recommendations based on your recent activity?";

const followUpMessage = "Based on your recent insights, here's a personalized suggestion: consider setting a dedicated dining budget to help you control these costs. I've seen that by reducing your dining out by just a couple of times a month, you could potentially save around $100 per month. I can help you set up a dining budget alert in the app and provide you with meal planning tips that match your tastes. Would you like to set that up now?";

type Message = {
  id: number;
  text: string;
  sender: "advisor" | "user";
};

const Advisor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: initialMessage, sender: "advisor" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const advisorMessage: Message = {
        id: Date.now() + 1,
        text: followUpMessage,
        sender: "advisor"
      };
      setMessages(prev => [...prev, advisorMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center gap-4">
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

      <main className="flex-1 overflow-auto pt-24 pb-24">
        <div className="max-w-md mx-auto px-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl p-4",
                message.sender === "advisor" 
                  ? "bg-secondary ml-0 mr-auto" 
                  : "bg-primary text-primary-foreground ml-auto mr-0"
              )}
            >
              {message.text}
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Advisor;
