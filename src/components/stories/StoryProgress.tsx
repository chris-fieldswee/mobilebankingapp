
interface StoryProgressProps {
  totalStories: number;
  activeStory: number;
  progress: number;
}

export const StoryProgress = ({ totalStories, activeStory, progress }: StoryProgressProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex gap-1 p-4">
      {Array.from({ length: totalStories }).map((_, index) => (
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
  );
};
