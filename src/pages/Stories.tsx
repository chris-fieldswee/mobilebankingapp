
import { useEffect, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Story {
  id: number;
  image: string;
  type: "image";
  title: string;
}

const stories: Story[] = [
  {
    id: 1,
    image: "/lovable-uploads/09127187-7909-428d-a29c-f80f661375ef.png",
    type: "image",
    title: "Hi, Ali Al-Faisal!"
  },
  {
    id: 2,
    image: "/lovable-uploads/ffcd4cbe-0680-441f-a800-bbe3bad6681b.png",
    type: "image",
    title: "Your Spending at a Glance"
  },
  {
    id: 3,
    image: "/lovable-uploads/fa21669f-751d-432d-8309-21ffe2e0accc.png",
    type: "image",
    title: "Your Savings"
  },
  {
    id: 4,
    image: "/lovable-uploads/6a84698a-f3cd-4219-a036-7860a06a6d5c.png",
    type: "image",
    title: "A Well-Deserved Reward?"
  },
  {
    id: 5,
    image: "/lovable-uploads/894a2c5c-a09b-4e58-a9f7-de4e81435bdb.png",
    type: "image",
    title: "Strengthening Your Financial Safety Net"
  },
  {
    id: 6,
    image: "/lovable-uploads/0805a7ed-7e6c-469e-9b95-034e621c9ec4.png",
    type: "image",
    title: "Your Financial Health Score"
  },
  {
    id: 7,
    image: "/lovable-uploads/a6a7d1a2-32c6-49ba-bf12-b20bb082464e.png",
    type: "image",
    title: "Make Your Money Work Harder"
  },
  {
    id: 8,
    image: "/lovable-uploads/cf3b12e8-e3ec-400f-9277-e6c2721f8731.png",
    type: "image",
    title: "Wrapping Up & Looking Ahead"
  }
];

const STORY_DURATION = 5000; // 5 seconds per story

const Stories = () => {
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (isPaused) return;

      const elapsed = timestamp - startTime;
      const newProgress = (elapsed / STORY_DURATION) * 100;

      if (newProgress >= 100) {
        if (activeStory === stories.length - 1) {
          navigate('/', { replace: true });
          return;
        }
        setActiveStory(prev => prev + 1);
        setProgress(0);
        startTime = timestamp;
      } else {
        setProgress(newProgress);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeStory, isPaused, navigate]);

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
  };

  const handleNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/', { replace: true });
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
        navigate('/', { replace: true });
      }
    }
  };

  const currentStory = stories[activeStory];

  return (
    <div className="fixed inset-0 bg-white">
      <div 
        className="h-full w-full relative"
        onClick={handleTap}
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-white"
            style={{
              backgroundImage: `url(${currentStory.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-4">
            {stories.map((_, index) => (
              <div 
                key={index}
                className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden"
              >
                <div 
                  className="h-full bg-black/60 transition-all duration-[16ms] ease-linear origin-left"
                  style={{
                    transform: `scaleX(${index === activeStory ? progress / 100 : index < activeStory ? 1 : 0})`,
                  }} 
                />
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center pointer-events-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-black hover:bg-black/10"
              onClick={handleNavigateHome}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:bg-black/10"
              onClick={togglePause}
            >
              {isPaused ? (
                <Play className="h-6 w-6" />
              ) : (
                <Pause className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
