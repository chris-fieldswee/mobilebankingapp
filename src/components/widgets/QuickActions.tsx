
import { Button } from "@/components/ui/button";
import { Plus, Send, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const QuickActions = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { icon: Plus, label: t('actions.addMoney') },
        { icon: Send, label: t('actions.transfer') },
        { icon: FileText, label: t('actions.details') },
      ].map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="flex flex-col h-auto py-4 hover:bg-secondary dark:hover:bg-blue-800/20 transition-colors"
        >
          <action.icon className="h-5 w-5 mb-2" />
          <span className="text-xs">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
