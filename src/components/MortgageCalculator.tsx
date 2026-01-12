import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import MortgageForm from "./MortgageForm";

const MortgageCalculator = () => {
  const [mortgageCount, setMortgageCount] = useState<number>(1);

  const addComparison = () => {
    setMortgageCount((prev) => prev + 1);
  };

  const removeComparison = (index: number) => {
    if (mortgageCount > 1) {
      setMortgageCount((prev) => prev - 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Decorative Stickers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {/* Llavero - Top Left */}
          <div className="absolute top-16 left-4 md:left-12 lg:left-20 float" style={{ animationDelay: '0s' }}>
            <img
              src="/stickers/keychain.png"
              alt="Keychain sticker"
              className="w-24 md:w-32 lg:w-36 drop-shadow-2xl"
            />
          </div>

          {/* Porta-lápices - Top Right */}
          <div className="absolute top-20 right-4 md:right-12 lg:right-24 float" style={{ animationDelay: '1.5s' }}>
            <img
              src="/stickers/pencil-holder.png"
              alt="Pencil holder sticker"
              className="w-28 md:w-36 lg:w-40 drop-shadow-2xl"
            />
          </div>

          {/* Maleta - Left Middle */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-6 lg:left-16 float hidden md:block" style={{ animationDelay: '2s' }}>
            <img
              src="/stickers/suitcase.png"
              alt="Suitcase sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Rollo de cinta - Right Middle */}
          <div className="absolute top-2/3 -translate-y-1/2 right-2 md:right-8 lg:right-20 float hidden md:block" style={{ animationDelay: '3s' }}>
            <img
              src="/stickers/tape.png"
              alt="Tape sticker"
              className="w-24 md:w-28 lg:w-32 drop-shadow-2xl"
            />
          </div>

          {/* Billetera - Bottom Left */}
          <div className="absolute bottom-24 left-8 md:left-16 lg:left-28 float hidden lg:block" style={{ animationDelay: '1s' }}>
            <img
              src="/stickers/wallet.png"
              alt="Wallet sticker"
              className="w-28 md:w-32 lg:w-36 drop-shadow-2xl"
            />
          </div>

          {/* Buzón - Bottom Right */}
          <div className="absolute bottom-32 right-8 md:right-16 lg:right-28 float hidden lg:block" style={{ animationDelay: '2.2s' }}>
            <img
              src="/stickers/mailbox.png"
              alt="Mailbox sticker"
              className="w-24 md:w-28 lg:w-32 drop-shadow-2xl"
            />
          </div>

          {/* Carpeta - Top Center-Left */}
          <div className="absolute top-32 left-1/4 float hidden xl:block" style={{ animationDelay: '1.2s' }}>
            <img
              src="/stickers/folder.png"
              alt="Folder sticker"
              className="w-24 md:w-28 drop-shadow-2xl"
            />
          </div>

          {/* Caja - Bottom Center-Right */}
          <div className="absolute bottom-40 right-1/3 float hidden xl:block" style={{ animationDelay: '2.8s' }}>
            <img
              src="/stickers/box.png"
              alt="Box sticker"
              className="w-28 md:w-32 drop-shadow-2xl"
            />
          </div>

          {/* Estrellas decorativas */}
          <div className="absolute top-40 left-1/4 text-yellow-400 float" style={{ animationDelay: '0.5s' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>
          <div className="absolute bottom-48 right-1/3 text-yellow-400 float" style={{ animationDelay: '1.8s' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>
          <div className="absolute top-1/3 left-1/2 text-yellow-400 float hidden lg:block" style={{ animationDelay: '2.5s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>

          {/* Background blurs */}
          <div className="absolute top-20 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-12 px-4 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-6 animate-slide-up">
              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  Decide tu hipoteca
                  <span className="block text-primary">con IA</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                  Compara ofertas y calcula tus pagos mensuales de forma sencilla
                </p>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground/80">Calculo instantaneo</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-foreground/80">Compara hasta 4 hipotecas</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium text-foreground/80">Exporta a PDF</span>
                </div>
              </div>
            </div>

            {/* Mortgage Forms Grid */}
            <div className={`grid gap-8 ${mortgageCount > 1 ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
              {Array.from({ length: mortgageCount }).map((_, index) => (
                <div
                  key={index}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MortgageForm
                    onRemove={() => removeComparison(index)}
                    showRemove={mortgageCount > 1}
                    formIndex={index + 1}
                  />
                </div>
              ))}
            </div>

            {/* Add Comparison Button */}
            {mortgageCount < 4 && (
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button
                  onClick={addComparison}
                  size="lg"
                  variant="outline"
                  className="gap-3 px-8 py-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-base font-semibold">Comparar otra hipoteca</span>
                </Button>
              </div>
            )}

            {/* Footer info */}
            <div className="text-center pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-muted-foreground">
                Los calculos son orientativos y no constituyen una oferta vinculante
              </p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MortgageCalculator;
