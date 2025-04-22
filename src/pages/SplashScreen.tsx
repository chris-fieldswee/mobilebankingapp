import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI Button

// REMOVED: three.js, @react-three/fiber, @react-three/drei imports

// Define the main SplashScreen component (Simplified)
const SplashScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the main dashboard route
    navigate('/dashboard');
  };

  return (
    // Main container: Constrained width, full height, flex layout, static gradient
    <div className="relative flex flex-col items-center justify-between h-screen w-full max-w-md mx-auto overflow-hidden bg-gradient-to-b from-blue-600 via-blue-500 to-teal-300 text-center p-6 shadow-lg">

      {/* Content Area (Logo + Tagline) - Centered */}
      {/* Removed z-10 as canvas is gone */}
      <div className="flex flex-col items-center justify-center flex-grow">
         <img
           src="/meniga-logo.png" // Ensure this path is correct in /public
           alt="Meniga Logo"
           className="w-32 h-auto mb-4" // Adjust size as needed
         />
         <p className="text-sm text-white/80"> {/* Adjusted text color */}
           Powered by Meniga
         </p>
      </div>

      {/* Button Area (Bottom) */}
      {/* Removed z-10 as canvas is gone */}
      <div className="w-full max-w-xs pb-8">
        <Button
          size="lg"
          className="w-full rounded-full bg-white text-primary hover:bg-white/90" // Adjusted button style
          onClick={handleGetStarted}
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;