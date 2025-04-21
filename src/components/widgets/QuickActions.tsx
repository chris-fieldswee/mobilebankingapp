
import { Button } from "@/components/ui/button";
import { Plus, ArrowRightLeft, Info } from "lucide-react";

const iconBg = "flex items-center justify-center w-10 h-10 rounded-full bg-[#DBE9FE] mb-2";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { icon: Plus, label: 'Add Money' },
        { icon: ArrowRightLeft, label: 'Transfer' },
        { icon: Info, label: 'Details' },
        { icon: Plus, label: 'More' },
      ].map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="flex flex-col h-auto py-4 hover:bg-transparent border-0 bg-transparent"
        >
          <span className={iconBg}>
            <action.icon className="h-5 w-5 text-[#1C4ED8]" />
          </span>
          <span className="text-xs">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
