
import React, { useEffect } from 'react';

const FloatingChatbot = () => {
  useEffect(() => {
    // This creates the ElevenLabs chatbot widget element
    const chatbotElement = document.createElement('elevenlabs-convai');
    chatbotElement.setAttribute('agent-id', '6Q5kvljL4qqvVyJ3GNYC');
    
    // Add the chatbot to the DOM
    document.body.appendChild(chatbotElement);
    
    // Cleanup function to remove the element when component unmounts
    return () => {
      try {
        if (chatbotElement && chatbotElement.parentNode) {
          document.body.removeChild(chatbotElement);
        }
      } catch (error) {
        console.error('Error removing chatbot widget:', error);
      }
    };
  }, []);

  // This component doesn't render anything itself, it just injects the chatbot
  return null;
};

export default FloatingChatbot;
