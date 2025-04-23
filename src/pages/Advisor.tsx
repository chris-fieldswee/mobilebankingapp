import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, CheckSquare, Square, XSquare } from "lucide-react"; // Icons for potential future use
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// Interface for message structure
type Message = {
  id: number;
  text: string;
  sender: "advisor" | "user";
  options?: {
    id: string; // Unique ID for option action
    text: string;
    action?: () => void; // Action to perform on click
  }[];
  isSelectionMessage?: boolean; // Flag to mark a user's selection message
};

// --- Strings precisely matching the new scenario ---
const advisorStrings = {
  advisorName: "Advisor",
  advisorTitle: "SAB Travel Advisor", // Updated title slightly
  // Step 1a: Greeting
  greeting: (name: string, airline: string) =>
    `Exciting news, ${name}! We noticed you recently booked a flight with ${airline}. Let’s make sure you’re all set for a smooth journey!`,
  // Step 1b: Card Intro & Benefits
  cardIntro: "Did you know that your SAB Premier World Mastercard comes with exclusive travel benefits?",
  benefitsList: `• Discounted Foreign Exchange Rates for international transactions\n• Complimentary Travel Insurance including trip cancellations, medical coverage, and lost baggage protection`,
  // Step 2: User Options
  initialOptions: [
    { id: "insurance", text: "Tell me more about travel insurance." }, // Option 2a
    { id: "forex", text: "Explore discounted foreign exchange rates." } // Option 2b
  ],
  // Step 3a: Insurance Response (Info + Coverage)
  insuranceSelectedConfirmation: "Tell me more about travel insurance.", // User selection text
  insuranceInfo: "Great choice! Your SAB Premier World Mastercard includes complimentary travel insurance when you book your trip using the card. Here's what's covered:",
  insuranceCoverage: `Baggage Loss: Up to SAR 11,250\nTrip Cancellation: Up to SAR 28,125\nPersonal Accident Coverage: Up to SAR 1,875,000\nMedical Emergency & Evacuation: Up to SAR 1,875,000`, // Separate points for clarity
  // Step 3b: Insurance Follow-up Question
  insuranceActivationPrompt: "Would you like to review your full travel insurance policy and activate coverage?",
  // Step 4: User Options
  insuranceActivationOptions: [
    { id: "show_coverage", text: "Yes, show my coverage details." },
    { id: "later", text: "Not now, I'll deal with it later." }
  ],
  // Forex Path (basic example, details not provided in scenario)
  forexSelectedConfirmation: "Explore discounted foreign exchange rates.", // User selection text
  forexInfo: "Okay, the SAB Premier World Mastercard offers competitive exchange rates automatically on international purchases. For cash exchange before your trip, visiting a SAB branch or partner exchange is recommended.",
  // Later Path
  laterSelectedConfirmation: "Not now, I'll deal with it later.", // User selection text
  laterMessage: "Alright. Feel free to ask if you need help later!",
  // Redirect message
  redirectingMessage: "Okay, redirecting you to the insurance details...",
};


const Advisor = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area viewport

  // Function to generate unique IDs
  const generateId = () => Date.now() + Math.random();

  // --- Initial Messages based on Scenario (using "Ahmed" as name) ---
  const initialMessages: Message[] = [
    {
      id: generateId(),
      text: advisorStrings.greeting("Ahmed", "Riyadh Air"), // Step 1a
      sender: "advisor",
    },
    {
      id: generateId(),
      text: advisorStrings.cardIntro, // Step 1b (Part 1)
      sender: "advisor",
    },
    {
      id: generateId(),
      text: advisorStrings.benefitsList, // Step 1b (Part 2 - Benefits)
      sender: "advisor",
      // Offer Step 2 options
      options: advisorStrings.initialOptions.map(opt => ({
        ...opt,
        action: () => handleOptionSelect(opt.id, opt.text)
      }))
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  // Track if the *current* set of options should be disabled (set to true once one is clicked)
  const [currentOptionsDisabled, setCurrentOptionsDisabled] = useState(false);

  // --- Auto-scroll Effect ---
  useEffect(() => {
     // Simple scroll to bottom - adjust if using a library component like ScrollArea
     const scrollElement = scrollAreaRef.current;
     if (scrollElement) {
        // For Shadcn ScrollArea, need to target the viewport
        const viewport = scrollElement.querySelector<HTMLDivElement>(':scope > div[data-radix-scroll-area-viewport]');
        if (viewport) {
           viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        } else {
           // Fallback for plain div
           scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
        }
     }
  }, [messages]);

  // --- Handle User Option Selection (Refined Flow) ---
  const handleOptionSelect = useCallback((optionId: string, optionText: string) => {
      // Find the last message to check if options belong to it (prevents clicking old options)
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.sender !== 'advisor' || !lastMessage.options || currentOptionsDisabled) {
          console.warn("Attempted to select an option that is not active.");
          return; // Prevent selecting options not tied to the last message or already handled
      }

      // 1. Disable current options visually and functionally
      setCurrentOptionsDisabled(true);

      // 2. Add User's selected message FIRST
      const userMessage: Message = {
        id: generateId(),
        text: optionText, // Use the text of the button they clicked
        sender: "user",
        isSelectionMessage: true,
      };

      // 3. Prepare Advisor's response(s)
      let advisorResponses: Message[] = [];
      let showNewOptions = false; // Flag to re-enable options if needed

      if (optionId === "insurance") { // Step 2a selected
        advisorResponses = [
          { id: generateId(), text: advisorStrings.insuranceInfo, sender: "advisor" }, // Step 3a (part 1)
          { id: generateId(), text: advisorStrings.insuranceCoverage, sender: "advisor" }, // Step 3a (part 2)
          { id: generateId(), text: advisorStrings.insuranceActivationPrompt, sender: "advisor", // Step 3b
            options: advisorStrings.insuranceActivationOptions.map(opt => ({ // Step 4 options
                ...opt,
                action: () => handleOptionSelect(opt.id, opt.text)
            }))
          }
        ];
        showNewOptions = true; // New options are presented
      }
      else if (optionId === "forex") { // Step 2b selected
         advisorResponses = [
            { id: generateId(), text: advisorStrings.forexInfo, sender: "advisor" }
            // No further options in this branch per scenario
         ];
      }
      else if (optionId === "show_coverage") { // Step 4a selected
          // Add redirect message BEFORE navigating
          advisorResponses = [{ id: generateId(), text: advisorStrings.redirectingMessage, sender: "advisor" }];
          // Perform navigation AFTER state update (or slightly delayed)
          setTimeout(() => navigate('/insurance-details'), 100); // Navigate to placeholder route
      }
      else if (optionId === "later") { // Step 4b selected
          advisorResponses = [{ id: generateId(), text: advisorStrings.laterMessage, sender: "advisor" }];
      }

      // 4. Update message state with user message and advisor response(s)
      setMessages(prev => [...prev, userMessage, ...advisorResponses]);

      // 5. Re-enable options ONLY if new options were added by the advisor
      setCurrentOptionsDisabled(!showNewOptions);

  }, [navigate, messages, currentOptionsDisabled]); // Update dependencies

  return (
    // Standard V1 Layout
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

      {/* Header (Constrained Width, Sticky) */}
      {/* --- Added sticky top-0 --- */}
      <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}> {/* Link back */}
            <ArrowLeft className="h-5 w-5" />
             <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center relative overflow-hidden border">
               <span className="text-base font-semibold text-primary z-10">A</span>
            </div>
            <div>
              <h2 className="font-semibold text-sm">{advisorStrings.advisorName}</h2>
              <p className="text-xs text-muted-foreground">{advisorStrings.advisorTitle}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Chat Area (Constrained Width) */}
       {/* Assign ref to the ScrollArea itself */}
      <ScrollArea className="flex-1 w-full max-w-md bg-background" ref={scrollAreaRef}>
        <div className="p-4 space-y-4 pb-6"> {/* Add padding bottom */}
          {messages.map((message, msgIndex) => (
            <div key={message.id} className={`flex flex-col gap-2 ${message.sender === 'advisor' ? 'items-start' : 'items-end'}`}>
              {/* Message Bubble */}
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3 shadow-sm",
                  message.sender === "advisor"
                    ? "bg-muted text-foreground rounded-bl-none"
                    : "bg-[#2663eb] text-primary-foreground rounded-br-none",
                   message.isSelectionMessage ? "opacity-90 italic" : "" // Style user selection slightly differently
                )}
              >
                <p className="whitespace-pre-line font-light text-md">{message.text}</p>
              </div>

              {/* Options Buttons */}
              {message.sender === 'advisor' &&
               message.options &&
               msgIndex === messages.length - 1 && // Only show options on the current last message
                ( // Render container only if options exist
                 <div className={`flex flex-col gap-2 items-end self-end mt-1 ${currentOptionsDisabled ? 'opacity-70' : ''}`}> {/* Align container and items to end (right) */}
                  {message.options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto py-2 px-3 w-auto max-w-[85%] bg-background hover:bg-accent whitespace-normal font-light text-md border-bg-accent text-primary disabled:opacity-100" // Button styles
                      onClick={option.action}
                      disabled={currentOptionsDisabled}
                    >
                       {option.text}
                    </Button>
                  ))}
                 </div>
               )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Advisor;