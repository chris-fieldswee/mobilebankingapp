interface StoryProgressProps {
  totalFrames: number;
  currentFrameIndex: number;
}

export const StoryProgress = ({ totalFrames, currentFrameIndex }: StoryProgressProps) => {
  // Define the desired blue color string for Tailwind arbitrary values
  const activeColorClass = "bg-[rgb(28,78,216)]";
  // Define the inactive color (same blue with 30% opacity)
  const inactiveColorClass = "bg-[rgb(28,78,216)]/30"; // Uses Tailwind opacity modifier

  return (
    // Adjusted padding and gap slightly
    <div className="absolute top-0 left-0 right-0 flex gap-1.5 p-3 z-20">
      {Array.from({ length: totalFrames }).map((_, index) => (
        <div
          key={index}
          // --- CHANGE HERE: Updated background color classes ---
          className={`h-1 flex-1 rounded-full ${
            index === currentFrameIndex ? activeColorClass : inactiveColorClass // Use defined color classes
          }`}
        >
          {/* No inner div needed */}
        </div>
      ))}
    </div>
  );
};

// Note: No default export needed if exported directly as named export above
// export default StoryProgress; // Remove if not needed