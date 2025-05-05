
import { useEffect } from "react";

interface ElevenLabsChatbotProps {
  agentId: string;
  className?: string;
}

const ElevenLabsChatbot = ({ agentId, className }: ElevenLabsChatbotProps) => {
  useEffect(() => {
    // Create the chatbot element if it doesn't exist
    if (!document.querySelector("elevenlabs-convai")) {
      const chatbotElement = document.createElement("elevenlabs-convai");
      chatbotElement.setAttribute("agent-id", agentId);
      
      // Find the container and append the chatbot
      const container = document.getElementById("chatbot-container");
      if (container) {
        container.appendChild(chatbotElement);
      }
    }
  }, [agentId]);

  return <div id="chatbot-container" className={className}></div>;
};

export default ElevenLabsChatbot;
