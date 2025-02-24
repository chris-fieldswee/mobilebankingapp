
interface CircularProgressBarProps {
  percentage: number;
  strokeWidth: number;
  availableColor: string;
  spentColor: string;
}

export const CircularProgressBar = ({ 
  percentage, 
  strokeWidth, 
  availableColor, 
  spentColor 
}: CircularProgressBarProps) => {
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-full h-full -rotate-90">
      <circle
        className="stroke-current"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx="50%"
        cy="50%"
        style={{ stroke: availableColor }}
      />
      <circle
        className="stroke-current transition-all duration-500 ease-in-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx="50%"
        cy="50%"
        style={{ stroke: spentColor }}
      />
    </svg>
  );
};
