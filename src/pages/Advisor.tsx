import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Paperclip, X, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: number;
  text: string;
  sender: "advisor" | "user";
  isSelectionMessage?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
  }>;
  action?: {
    paymentUrl: string;
    actionName: string;
  };
};

type UploadedFile = {
  id: string;
  name: string;
  size: number;
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch("http://localhost:5005/documents/upload", {
	// const response = await fetch("https://intense-ocean-72847-b75a6f991933.herokuapp.com/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return {
        id: data.documentId || data.id || String(Date.now()),
        name: data.fileName || file.name,
        size: data.size || file.size,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const sendMessageToApi = async (text: string, documentIds?: string[]): Promise<{text: string; action?: {paymentUrl: string; actionName: string}}> => {
    try {
      const response = await fetch("http://localhost:5005/chat", {
	// const response = await fetch("https://intense-ocean-72847-b75a6f991933.herokuapp.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(text),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return {
        text: data.response || "Sorry, I didn't understand that.",
        action: data.action
      };
    } catch (error) {
      console.error("Error calling chat API:", error);
      return { text: "Something went wrong. Please try again later." };
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUserMessage = useCallback(async (userText: string) => {
    // Upload files first if any
    let attachments: UploadedFile[] = [];
    if (selectedFiles.length > 0) {
      setUploading(true);
      const uploadPromises = selectedFiles.map(file => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      attachments = results.filter((result): result is UploadedFile => result !== null);
      setUploading(false);
      setUploadedFiles(attachments);
      setSelectedFiles([]);
    }

    const userMessage: Message = {
      id: generateId(),
      text: userText,
      sender: "user",
      isSelectionMessage: true,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    const documentIds = attachments.map(file => file.id);
    // Append document references to the message text
    let messageWithDocRefs = userText;
    if (documentIds.length > 0) {
      const docRefs = documentIds.map(id => `[document:${id}]`).join(' ');
      messageWithDocRefs = userText + " " + docRefs;
    }
    
    const advisorResponse = await sendMessageToApi(messageWithDocRefs, documentIds);

    // Replace host in paymentUrl with current window.location.host
    let processedAction = advisorResponse.action;
    if (processedAction?.paymentUrl) {
      try {
        const url = new URL(processedAction.paymentUrl);
        url.host = window.location.host;
		url.protocol = window.location.protocol;
        processedAction = {
          ...processedAction,
          paymentUrl: url.toString()
        };
      } catch (error) {
        console.warn("Could not parse paymentUrl:", error);
      }
    }

    const advisorMessage: Message = {
      id: generateId(),
      text: advisorResponse.text,
      sender: "advisor",
      action: processedAction,
    };

    setMessages(prev => [...prev, advisorMessage]);
    setLoading(false);
    setUploadedFiles([]);
  }, [selectedFiles]);

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
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((file) => (
                      <div
                        key={file.id}
                        className={cn(
                          "flex items-center gap-2 text-xs p-2 rounded",
                          message.sender === "user"
                            ? "bg-blue-600/20 text-white"
                            : "bg-muted-foreground/10"
                        )}
                      >
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-[10px] opacity-70">
                          ({(file.size / 1024).toFixed(1)}KB)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {message.action && (
                  <div className="mt-3">
                    <Button
                      onClick={() => window.location.href = message.action.paymentUrl}
                      className="w-full"
                      variant={message.sender === "advisor" ? "default" : "secondary"}
                    >
                      Review Transaction
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-muted-foreground text-sm">Advisor is typing...</div>
          )}
        </div>
      </ScrollArea>

      <div className="w-full max-w-md border-t bg-white">
        {selectedFiles.length > 0 && (
          <div className="p-3 border-b space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Files to upload:</div>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted rounded-md p-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {(file.size / 1024).toFixed(1)}KB
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeSelectedFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4">
          <form
            onSubmit={e => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("userInput") as HTMLInputElement;
              const value = input.value.trim();
              if (value || selectedFiles.length > 0) {
                handleUserMessage(value || "Here are the files");
                input.value = "";
              }
            }}
            className="flex gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading || uploading}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <input
              name="userInput"
              className="flex-1 border rounded px-3 py-2 text-sm"
              placeholder="Type your message..."
              disabled={loading || uploading}
            />
            <Button type="submit" disabled={loading || uploading}>
              {uploading ? "Uploading..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advisor;
