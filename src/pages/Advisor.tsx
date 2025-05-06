import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  text: string;
  sender: "advisor" | "user";
  isSelectionMessage?: boolean;
};

const Advisor = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: "Hello, how can I help you?",
      sender: "advisor",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const generateId = () => Date.now() + Math.random();

  const scrollToBottom = () => {
    const scrollElement = scrollAreaRef.current;
    if (scrollElement) {
      const viewport = scrollElement.querySelector<HTMLDivElement>(':scope > div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      } else {
        scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToApi = async (text: string): Promise<string> => {
    try {
      const response = await fetch("https://intense-ocean-72847-b75a6f991933.herokuapp.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(text),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.response || "Sorry, I didn’t understand that.";
    } catch (error) {
      console.error("Error calling chat API:", error);
      return "Something went wrong. Please try again later.";
    }
  };

  const handleUserMessage = useCallback(async (userText: string) => {
    const userMessage: Message = {
      id: generateId(),
      text: userText,
      sender: "user",
      isSelectionMessage: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    const advisorResponseText = await sendMessageToApi(userText);

    const advisorMessage: Message = {
      id: generateId(),
      text: advisorResponseText,
      sender: "advisor",
    };

    setMessages(prev => [...prev, advisorMessage]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">
      <header className="w-full max-w-md sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center border">
              <span className="text-base font-semibold text-primary">A</span>
            </div>
            <div>
              <h2 className="font-semibold text-sm">Advisor</h2>
              <p className="text-xs text-muted-foreground">SAB Travel Advisor</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 w-full max-w-md bg-background" ref={scrollAreaRef}>
        <div className="p-4 space-y-4 pb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex flex-col gap-2 ${message.sender === 'advisor' ? 'items-start' : 'items-end'}`}>
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3 shadow-sm",
                  message.sender === "advisor"
                    ? "bg-muted text-foreground rounded-bl-none"
                    : "bg-[#2663eb] text-primary-foreground rounded-br-none",
                  message.isSelectionMessage ? "opacity-90 italic" : ""
                )}
              >
                <p className="whitespace-pre-line font-light text-md">{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-muted-foreground text-sm">Advisor is typing...</div>
          )}
        </div>
      </ScrollArea>

      <div className="w-full max-w-md p-4 border-t bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem("userInput") as HTMLInputElement;
            const value = input.value.trim();
            if (value) {
              handleUserMessage(value);
              input.value = "";
            }
          }}
          className="flex gap-2"
        >
          <input
            name="userInput"
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Type your message..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Advisor;
