
import { useEffect, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stories = [
  {
    id: 1,
    image: "/story_1.gif",
    type: "image"
  },
  {
    id: 2,
    image: "https://source.unsplash.com/random/800x1200?money",
    title: "Invest better",
    type: "image"
  },
  {
    id: 3,
    image: "https://source.unsplash.com/random/800x1200?business",
    title: "Track expenses",
    type: "image"
  },
  {
    id: 4,
    image: "https://source.unsplash.com/random/800x1200?banking",
    title: "Grow wealth",
    type: "image"
  },
];

const STORY_DURATION = 5000; // 5 seconds per story

const Stories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    
    if (!isPaused) {
      const startTime = Date.now() - (progress / 100 * STORY_DURATION);
      const newIntervalId = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = (elapsedTime / STORY_DURATION) * 100;
        
        if (newProgress >= 100) {
          setProgress(0);
          setActiveStory((prev) => {
            if (prev === stories.length - 1) {
              window.history.back();
              return prev;
            }
            return prev + 1;
          });
        } else {
          setProgress(newProgress);
        }
      }, 16);

      setIntervalId(newIntervalId);
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeStory, isPaused]);

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleTap = (e: React.MouseEvent) => {
    const x = e.clientX;
    const width = window.innerWidth;
    
    if (x < width / 2) {
      if (activeStory > 0) {
        setProgress(0);
        setActiveStory(prev => prev - 1);
      }
    } else {
      if (activeStory < stories.length - 1) {
        setProgress(0);
        setActiveStory(prev => prev + 1);
      } else {
        window.history.back();
      }
    }
  };

  const currentStory = stories[activeStory];

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="h-full w-full relative"
        onClick={handleTap}
      >
        {currentStory.type === "video" ? (
          <iframe
            src={currentStory.video}
            className="absolute inset-0 w-full h-full"
            allow="autoplay"
            frameBorder="0"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${currentStory.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-4 z-10">
          {stories.map((_, index) => (
            <div 
              key={index}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div 
                className="h-full bg-white transition-all duration-[16ms] ease-linear origin-left"
                style={{
                  transform: `scaleX(${index === activeStory ? progress / 100 : index < activeStory ? 1 : 0})`,
                }} 
              />
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 p-4 pt-8 z-10 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={togglePause}
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-white text-2xl font-semibold">
            {currentStory.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Stories;
