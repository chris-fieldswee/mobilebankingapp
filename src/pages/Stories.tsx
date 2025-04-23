import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyFramesData } from "@/components/stories/StoryData";
import { StoryProgress } from "@/components/stories/StoryProgress";
import { Button } from "@/components/ui/button";
import { X, Image as ImageIcon, ArrowRight } from "lucide-react";

const Stories = () => {
  const navigate = useNavigate();
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const totalFrames = storyFramesData.length;
  const currentFrame = storyFramesData[currentFrameIndex];

  const goToNextFrame = () => {
    if (currentFrameIndex < totalFrames - 1) {
      setCurrentFrameIndex(prev => prev + 1);
    } else {
      handleClose(); // Close after the last frame
    }
  };

  const handleClose = () => {
    navigate(-1); // Go back in history
  };

  const handleCtaClick = (link: string | undefined) => {
    if (link) {
      navigate(link);
    }
  };

  // Define the desired blue color string for Tailwind
  const primaryButtonBg = "bg-[rgb(28,78,216)]";
  // Define a slightly darker shade for hover (adjust as needed)
  const primaryButtonHoverBg = "hover:bg-[rgb(23,62,173)]";

  return (
    // Constrain width, center, set height and layout
    <div className="relative max-w-md mx-auto h-screen bg-background flex flex-col overflow-hidden shadow-lg border border-gray-200">

      {/* Progress Indicator & Close Button */}
      <StoryProgress totalFrames={totalFrames} currentFrameIndex={currentFrameIndex} />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-2 z-20 text-muted-foreground hover:bg-black/10"
        onClick={handleClose}
        aria-label="Close stories"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Main Content Area (Image + Text + CTA) */}
      <div className="flex flex-col items-center justify-center text-center flex-grow px-6 py-16">

         {/* Image Placeholder Area */}
         <div className="w-80 h-80 rounded-lg flex items-center justify-center text-muted-foreground mb-6 overflow-hidden">
           <img
             src={currentFrame.imageSrc}
             alt={`Story Frame ${currentFrame.id}`}
             className="w-full h-full object-cover"
             onError={(e) => (e.currentTarget.src = "/placeholder.svg")} // Fallback placeholder
           />
         </div>

         {/* Text Content */}
         <div className="prose prose-sm dark:prose-invert max-w-full">
           {currentFrame.text}
         </div>

         {/* CTA Button (conditional) */}
         {currentFrame.cta && (
           <Button
             className="mt-6 rounded-full bg-[#2663eb] " // Default primary button style from Shadcn
             onClick={() => handleCtaClick(currentFrame.cta?.link)}
           >
             {currentFrame.cta.text}
           </Button>
         )}
      </div>

      {/* --- UPDATED: Next/Finish Button Styling --- */}
      <Button
         size="icon"
         // Applied specific background color, hover state, kept rounding and size
         className={`absolute bottom-6 right-4 z-20 rounded-full text-white ${primaryButtonBg} ${primaryButtonHoverBg} w-12 h-12`}
         onClick={goToNextFrame}
         aria-label={currentFrameIndex === totalFrames - 1 ? "Finish stories" : "Next story"}
       >
         <ArrowRight className="h-6 w-6" />
       </Button>

    </div>
  );
};

export default Stories;