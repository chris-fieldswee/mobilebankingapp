
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryProgress } from "@/components/stories/StoryProgress";
import { StoryControls } from "@/components/stories/StoryControls";
import { stories } from "@/components/stories/StoryData";

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
          <StoryProgress
            totalStories={stories.length}
            activeStory={activeStory}
            progress={progress}
          />
          <StoryControls
            isPaused={isPaused}
            onNavigateHome={handleNavigateHome}
            onTogglePause={togglePause}
          />
        </div>
      </div>
    </div>
  );
};

export default Stories;
