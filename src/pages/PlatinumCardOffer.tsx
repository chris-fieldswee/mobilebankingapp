
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const PlatinumCardOffer = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b bg-background fixed top-0 left-0 right-0 z-10">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t('platinum.title')}</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pt-20 pb-8 px-4">
        <div className="space-y-6">
          <div>
            <img
              src="/lovable-uploads/1b0cef9c-0b62-4186-8303-8505724fa8c3.png"
              alt={t('platinum.header')}
              className="w-full"
            />
          </div>

          <Card className="p-6 space-y-6">
            <p className="text-lg">
              {t('offers.cardOffer')}
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold">{t('platinum.benefits.lounge.title')}</h3>
                <p className="text-muted-foreground">
                  {t('platinum.benefits.lounge.description')}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">{t('platinum.benefits.cashback.title')}</h3>
                <p className="text-muted-foreground">
                  {t('platinum.benefits.cashback.description')}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">{t('platinum.benefits.apr.title')}</h3>
                <p className="text-muted-foreground">
                  {t('platinum.benefits.apr.description')}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">{t('platinum.benefits.travel.title')}</h3>
                <p className="text-muted-foreground">
                  {t('platinum.benefits.travel.description')}
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full" size="lg">
                {t('actions.upgrade')}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                {t('actions.explore')}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PlatinumCardOffer;
