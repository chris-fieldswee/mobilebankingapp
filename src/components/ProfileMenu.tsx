
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ProfileMenu = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col space-y-2 p-4">
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">Theme</span>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileMenu;
