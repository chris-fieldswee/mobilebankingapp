
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stories = [
  {
    id: 1,
    image: "https://source.unsplash.com/random/800x1200?finance",
    title: "Save smarter",
  },
  {
    id: 2,
    image: "https://source.unsplash.com/random/800x1200?money",
    title: "Invest better",
  },
  {
    id: 3,
    image: "https://source.unsplash.com/random/800x1200?business",
    title: "Track expenses",
  },
  {
    id: 4,
    image: "https://source.unsplash.com/random/800x1200?banking",
    title: "Grow wealth",
  },
];

const STORY_DURATION = 5000; // 5 seconds per story

const Stories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    
    const startTime = Date.now();
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
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeStory]);

  const handleTap = (e: React.MouseEvent) => {
    const x = e.clientX;
    const width = window.innerWidth;
    
    if (x < width / 2) {
      // Tap left side
      if (activeStory > 0) {
        setProgress(0);
        setActiveStory(prev => prev - 1);
      }
    } else {
      // Tap right side
      if (activeStory < stories.length - 1) {
        setProgress(0);
        setActiveStory(prev => prev + 1);
      } else {
        window.history.back();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="h-full w-full relative"
        style={{
          backgroundImage: `url(${stories[activeStory].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={handleTap}
      >
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

        <div className="absolute top-0 left-0 right-0 p-4 pt-8 z-10">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-white text-2xl font-semibold">
            {stories[activeStory].title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Stories;
