
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'es', name: 'Español', dir: 'ltr' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = languages.find(lang => lang.code === lng)?.dir || 'ltr';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="mb-4">Select Language</SheetTitle>
        </SheetHeader>
        <div className="space-y-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={i18n.language === lang.code ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LanguageSelector;
