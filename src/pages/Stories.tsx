
import { useEffect, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
    image: "/lovable-uploads/aead3ba0-f187-4bf1-a324-d92c56c716ae.png",
    type: "image",
    title: "Hi, Ali Al-Faisal!"
  },
  {
    id: 2,
    image: "/lovable-uploads/55b8aacc-ac74-425b-a367-206ed860bdf7.png",
    type: "image",
    title: "Your Spending at a Glance"
  },
  {
    id: 3,
    image: "/lovable-uploads/22d72c91-cf8e-41d4-9e9e-ad5fcc1669a5.png",
    type: "image",
    title: "Your Savings"
  },
  {
    id: 4,
    image: "/lovable-uploads/be9f9fa5-58fc-4c6a-ba38-78811c4c749a.png",
    type: "image",
    title: "A Well-Deserved Reward?"
  },
  {
    id: 5,
    image: "/lovable-uploads/2badca8c-d65a-490e-b0d7-ded319a801de.png",
    type: "image",
    title: "Strengthening Your Financial Safety Net"
  },
  {
    id: 6,
    image: "/lovable-uploads/67e2af54-4e6c-4843-97fd-115ed7d6d3f2.png",
    type: "image",
    title: "Your Financial Health Score"
  },
  {
    id: 7,
    image: "/lovable-uploads/397ff494-6c9d-4079-858b-d1a66bb3eeb2.png",
    type: "image",
    title: "Make Your Money Work Harder"
  },
  {
    id: 8,
    image: "/lovable-uploads/47f74f19-d2f1-4d99-ab82-8127025002e9.png",
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
    <div className="fixed inset-0 bg-black">
      <div 
        className="h-full w-full relative"
        onClick={handleTap}
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-black"
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

          <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center pointer-events-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={handleNavigateHome}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
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
        </div>
      </div>
    </div>
  );
};

export default Stories;
