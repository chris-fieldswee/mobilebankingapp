
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
  const radius = 125 - strokeWidth / 2; // Increased radius for larger circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-full h-full -rotate-90">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
          <stop offset="100%" style={{ stopColor: "#3B82F6" }} />
        </linearGradient>
      </defs>
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
