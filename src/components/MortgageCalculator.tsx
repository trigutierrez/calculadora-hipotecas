import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgageForm from "./MortgageForm";
import AppraisalCalculator from "./AppraisalCalculator";

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

          {/* Llavero - Top Left Corner */}
          <div className="absolute top-8 left-2 md:left-8 lg:left-12 float" style={{ animationDelay: '0s' }}>
            <img
              src="/stickers/keychain.png"
              alt="Keychain sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Porta-lápices - Top Right Corner */}
          <div className="absolute top-12 right-2 md:right-8 lg:right-12 float" style={{ animationDelay: '1.5s' }}>
            <img
              src="/stickers/pencil-holder.png"
              alt="Pencil holder sticker"
              className="w-36 md:w-44 lg:w-52 drop-shadow-2xl"
            />
          </div>

          {/* Maleta - Left Side */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-4 lg:left-8 float" style={{ animationDelay: '2s' }}>
            <img
              src="/stickers/suitcase.png"
              alt="Suitcase sticker"
              className="w-40 md:w-52 lg:w-60 drop-shadow-2xl"
            />
          </div>

          {/* Rollo de cinta - Right Side Upper */}
          <div className="absolute top-1/3 right-2 md:right-6 lg:right-12 float" style={{ animationDelay: '3s' }}>
            <img
              src="/stickers/tape.png"
              alt="Tape sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Billetera - Bottom Left */}
          <div className="absolute bottom-8 left-4 md:left-12 lg:left-20 float" style={{ animationDelay: '1s' }}>
            <img
              src="/stickers/wallet.png"
              alt="Wallet sticker"
              className="w-36 md:w-44 lg:w-52 drop-shadow-2xl"
            />
          </div>

          {/* Buzón - Bottom Right */}
          <div className="absolute bottom-12 right-4 md:right-12 lg:right-20 float" style={{ animationDelay: '2.2s' }}>
            <img
              src="/stickers/mailbox.png"
              alt="Mailbox sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Carpeta/Tablero - Left Side Upper */}
          <div className="absolute top-44 left-2 md:left-6 lg:left-10 float hidden md:block" style={{ animationDelay: '1.2s' }}>
            <img
              src="/stickers/folder.png"
              alt="Folder sticker"
              className="w-36 md:w-44 lg:w-52 drop-shadow-2xl"
            />
          </div>

          {/* Caja tetrabrik - Bottom Center-Right */}
          <div className="absolute bottom-24 right-1/4 float hidden md:block" style={{ animationDelay: '2.8s' }}>
            <img
              src="/stickers/box.png"
              alt="Box sticker"
              className="w-36 md:w-44 lg:w-52 drop-shadow-2xl"
            />
          </div>

          {/* Caja almacenaje - Right Side Upper */}
          <div className="absolute top-48 right-2 md:right-6 lg:right-10 float hidden lg:block" style={{ animationDelay: '0.8s' }}>
            <img
              src="/stickers/storage-crate.png"
              alt="Storage crate sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Globo - Left Side */}
          <div className="absolute top-1/3 left-2 md:left-4 lg:left-8 float hidden md:block" style={{ animationDelay: '1.7s' }}>
            <img
              src="/stickers/balloon.png"
              alt="Balloon sticker"
              className="w-28 md:w-36 lg:w-44 drop-shadow-2xl"
            />
          </div>

          {/* Carpetas documentos - Right Lower Area */}
          <div className="absolute bottom-1/3 right-2 md:right-8 float hidden md:block" style={{ animationDelay: '2.3s' }}>
            <img
              src="/stickers/file-folders.png"
              alt="File folders sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Nevera - Bottom Left Area */}
          <div className="absolute bottom-1/4 left-1/4 float hidden lg:block" style={{ animationDelay: '3.2s' }}>
            <img
              src="/stickers/fridge.png"
              alt="Fridge sticker"
              className="w-28 md:w-36 lg:w-44 drop-shadow-2xl"
            />
          </div>

          {/* Caja organizadora - Right Side Mid */}
          <div className="absolute top-2/3 right-2 md:right-6 lg:right-10 float hidden lg:block" style={{ animationDelay: '0.3s' }}>
            <img
              src="/stickers/organizer-box.png"
              alt="Organizer box sticker"
              className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
            />
          </div>

          {/* Bolsa de papel - Bottom Center-Left */}
          <div className="absolute bottom-8 left-1/3 float hidden lg:block" style={{ animationDelay: '2.6s' }}>
            <img
              src="/stickers/paper-bag.png"
              alt="Paper bag sticker"
              className="w-28 md:w-36 lg:w-44 drop-shadow-2xl"
            />
          </div>

          {/* Estrellas decorativas */}
          <div className="absolute top-1/2 left-16 text-yellow-400 float hidden md:block" style={{ animationDelay: '0.5s' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>
          <div className="absolute bottom-48 right-16 text-yellow-400 float hidden md:block" style={{ animationDelay: '1.8s' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>
          <div className="absolute bottom-1/3 left-8 text-yellow-400 float hidden lg:block" style={{ animationDelay: '2.5s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/>
            </svg>
          </div>

          {/* Background blurs */}
          <div className="absolute top-20 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-12 px-4 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="hipotecas" className="w-full">
              {/* Tabs Navigation */}
              <div className="flex justify-center mb-10 px-2">
                <TabsList className="bg-white/80 backdrop-blur-sm border border-primary/10 shadow-lg rounded-full p-1 flex-wrap h-auto gap-1">
                  <TabsTrigger
                    value="hipotecas"
                    className="rounded-full px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-nowrap"
                  >
                    Hipotecas
                  </TabsTrigger>
                  <TabsTrigger
                    value="tasacion"
                    className="rounded-full px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-nowrap"
                  >
                    Tasación
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab: Hipotecas */}
              <TabsContent value="hipotecas" className="space-y-12 data-[state=inactive]:hidden" forceMount>
                {/* Header */}
                <div className="text-center space-y-6 animate-slide-up">
                  {/* Title */}
                  <div className="space-y-3">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
                      Compara tu hipoteca
                      <span className="block text-primary">antes de hacer match</span>
                    </h1>
                    <p className="text-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                      Compara ofertas y calcula tus pagos mensuales de forma sencilla
                    </p>
                  </div>

                  {/* Stats badges */}
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-medium text-foreground/80">Cálculo instantáneo</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
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
                    Los cálculos son orientativos. No somos ningún banco y solo queremos ayudarte, por lo que esto no es ninguna oferta.
                  </p>
                </div>
              </TabsContent>

              {/* Tab: Tasación */}
              <TabsContent value="tasacion" className="data-[state=inactive]:hidden" forceMount>
                <AppraisalCalculator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MortgageCalculator;
