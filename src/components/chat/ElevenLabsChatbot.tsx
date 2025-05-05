
import { useEffect, useState } from "react";

interface ElevenLabsChatbotProps {
  agentId: string;
  className?: string;
}

const ElevenLabsChatbot = ({ agentId, className }: ElevenLabsChatbotProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create the chatbot element if it doesn't exist
    if (!document.querySelector("elevenlabs-convai")) {
      try {
        const chatbotElement = document.createElement("elevenlabs-convai");
        chatbotElement.setAttribute("agent-id", agentId);
        
        // Find the container and append the chatbot
        const container = document.getElementById("chatbot-container");
        if (container) {
          container.appendChild(chatbotElement);
          console.log("ElevenLabs chatbot element added to container");
          setIsLoaded(true);
        } else {
          console.error("Chatbot container not found");
        }
      } catch (error) {
        console.error("Error initializing ElevenLabs chatbot:", error);
      }
    } else {
      setIsLoaded(true);
    }
  }, [agentId]);

  return (
    <div 
      id="chatbot-container" 
      className={`min-h-[300px] ${className}`}
      style={{ position: "relative" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p>Loading chatbot...</p>
        </div>
      )}
    </div>
  );
};

export default ElevenLabsChatbot;
