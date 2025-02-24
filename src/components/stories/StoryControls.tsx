
import { ArrowLeft, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryControlsProps {
  isPaused: boolean;
  onNavigateHome: (e: React.MouseEvent) => void;
  onTogglePause: (e: React.MouseEvent) => void;
}

export const StoryControls = ({ isPaused, onNavigateHome, onTogglePause }: StoryControlsProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center pointer-events-auto">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-black hover:bg-black/10"
        onClick={onNavigateHome}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-black hover:bg-black/10"
        onClick={onTogglePause}
      >
        {isPaused ? (
          <Play className="h-6 w-6" />
        ) : (
          <Pause className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};
