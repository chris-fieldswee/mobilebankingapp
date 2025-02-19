
import { Button } from "@/components/ui/button";
import { Plus, Send, FileText } from "lucide-react";

const QuickActions = () => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    {[
      { icon: Plus, label: "Add Money" },
      { icon: Send, label: "Transfer" },
      { icon: FileText, label: "Details" },
    ].map((action) => (
      <Button
        key={action.label}
        variant="outline"
        className="flex flex-col h-auto py-4 hover:bg-secondary"
      >
        <action.icon className="h-5 w-5 mb-2" />
        <span className="text-xs">{action.label}</span>
      </Button>
    ))}
  </div>
);

export default QuickActions;
