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

          {/* CASA CON OJOS - Top Left */}
          <div className="absolute top-16 left-4 md:left-12 lg:left-20 float" style={{ animationDelay: '0s' }}>
            <svg width="120" height="130" viewBox="0 0 120 130" className="drop-shadow-xl">
              {/* Cuerpo de la casa */}
              <rect x="20" y="55" width="80" height="65" rx="6" fill="#FF6B6B" stroke="#2D3436" strokeWidth="4"/>
              {/* Tejado */}
              <polygon points="60,5 5,60 115,60" fill="#FFE66D" stroke="#2D3436" strokeWidth="4" strokeLinejoin="round"/>
              {/* Puerta */}
              <rect x="45" y="80" width="30" height="40" rx="4" fill="#4ECDC4" stroke="#2D3436" strokeWidth="3"/>
              <circle cx="68" cy="100" r="3" fill="#2D3436"/>
              {/* Ventanas */}
              <rect x="28" y="65" width="20" height="18" rx="2" fill="#74B9FF" stroke="#2D3436" strokeWidth="3"/>
              <rect x="72" y="65" width="20" height="18" rx="2" fill="#74B9FF" stroke="#2D3436" strokeWidth="3"/>
              {/* Ojos grandes y expresivos */}
              <ellipse cx="45" cy="38" rx="12" ry="14" fill="white" stroke="#2D3436" strokeWidth="3"/>
              <ellipse cx="75" cy="38" rx="12" ry="14" fill="white" stroke="#2D3436" strokeWidth="3"/>
              <circle cx="48" cy="40" r="6" fill="#2D3436"/>
              <circle cx="78" cy="40" r="6" fill="#2D3436"/>
              <circle cx="50" cy="38" r="2" fill="white"/>
              <circle cx="80" cy="38" r="2" fill="white"/>
              {/* Cejas felices */}
              <path d="M33 28 Q45 22 55 28" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M65 28 Q75 22 87 28" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Chimenea */}
              <rect x="80" y="20" width="15" height="25" fill="#FF7675" stroke="#2D3436" strokeWidth="3"/>
            </svg>
          </div>

          {/* PORCENTAJE CON PIES - Top Right */}
          <div className="absolute top-20 right-4 md:right-12 lg:right-24 float" style={{ animationDelay: '1.5s' }}>
            <svg width="110" height="140" viewBox="0 0 110 140" className="drop-shadow-xl">
              {/* Cuerpo del porcentaje */}
              <circle cx="35" cy="35" r="22" fill="#A29BFE" stroke="#2D3436" strokeWidth="4"/>
              <circle cx="35" cy="35" r="10" fill="#DFE6E9" stroke="#2D3436" strokeWidth="2"/>
              <circle cx="75" cy="75" r="22" fill="#A29BFE" stroke="#2D3436" strokeWidth="4"/>
              <circle cx="75" cy="75" r="10" fill="#DFE6E9" stroke="#2D3436" strokeWidth="2"/>
              {/* Linea diagonal */}
              <line x1="25" y1="85" x2="85" y2="25" stroke="#2D3436" strokeWidth="6" strokeLinecap="round"/>
              {/* Ojos en el circulo superior */}
              <circle cx="30" cy="32" r="4" fill="#2D3436"/>
              <circle cx="42" cy="32" r="4" fill="#2D3436"/>
              <circle cx="31" cy="30" r="1.5" fill="white"/>
              <circle cx="43" cy="30" r="1.5" fill="white"/>
              {/* Sonrisa */}
              <path d="M28 42 Q36 48 44 42" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Piernas */}
              <rect x="25" y="95" width="12" height="30" rx="6" fill="#FDCB6E" stroke="#2D3436" strokeWidth="3"/>
              <rect x="45" y="95" width="12" height="30" rx="6" fill="#FDCB6E" stroke="#2D3436" strokeWidth="3"/>
              {/* Zapatos */}
              <ellipse cx="31" cy="128" rx="10" ry="6" fill="#FF7675" stroke="#2D3436" strokeWidth="3"/>
              <ellipse cx="51" cy="128" rx="10" ry="6" fill="#FF7675" stroke="#2D3436" strokeWidth="3"/>
            </svg>
          </div>

          {/* LLAVE CON OJOS - Left Middle */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-6 lg:left-16 float hidden md:block" style={{ animationDelay: '2s' }}>
            <svg width="130" height="70" viewBox="0 0 130 70" className="drop-shadow-xl">
              {/* Cabeza de la llave */}
              <circle cx="30" cy="35" r="26" fill="#00B894" stroke="#2D3436" strokeWidth="4"/>
              <circle cx="30" cy="35" r="12" fill="#2D3436"/>
              {/* Cuerpo de la llave */}
              <rect x="50" y="28" width="70" height="14" rx="4" fill="#00B894" stroke="#2D3436" strokeWidth="3"/>
              {/* Dientes */}
              <rect x="100" y="28" width="8" height="22" rx="2" fill="#00B894" stroke="#2D3436" strokeWidth="3"/>
              <rect x="112" y="28" width="8" height="18" rx="2" fill="#00B894" stroke="#2D3436" strokeWidth="3"/>
              {/* Ojos */}
              <ellipse cx="22" cy="30" rx="7" ry="8" fill="white" stroke="#2D3436" strokeWidth="2"/>
              <ellipse cx="40" cy="30" rx="7" ry="8" fill="white" stroke="#2D3436" strokeWidth="2"/>
              <circle cx="24" cy="31" r="4" fill="#2D3436"/>
              <circle cx="42" cy="31" r="4" fill="#2D3436"/>
              <circle cx="25" cy="29" r="1.5" fill="white"/>
              <circle cx="43" cy="29" r="1.5" fill="white"/>
              {/* Sonrisa */}
              <path d="M24 42 Q31 48 40 42" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Mejillas */}
              <circle cx="15" cy="38" r="4" fill="#FDCB6E" opacity="0.6"/>
              <circle cx="47" cy="38" r="4" fill="#FDCB6E" opacity="0.6"/>
            </svg>
          </div>

          {/* BOLI - Right Middle */}
          <div className="absolute top-2/3 -translate-y-1/2 right-2 md:right-8 lg:right-20 float hidden md:block" style={{ animationDelay: '3s' }}>
            <svg width="50" height="140" viewBox="0 0 50 140" className="drop-shadow-xl">
              {/* Tapa del boli */}
              <rect x="12" y="5" width="26" height="20" rx="4" fill="#74B9FF" stroke="#2D3436" strokeWidth="3"/>
              <rect x="18" y="0" width="14" height="10" rx="3" fill="#5B9BD5" stroke="#2D3436" strokeWidth="2"/>
              {/* Cuerpo del boli */}
              <rect x="10" y="25" width="30" height="85" rx="4" fill="#FF7675" stroke="#2D3436" strokeWidth="3"/>
              {/* Grip */}
              <rect x="12" y="80" width="26" height="20" rx="3" fill="#636E72" stroke="#2D3436" strokeWidth="2"/>
              {/* Punta */}
              <polygon points="25,140 10,110 40,110" fill="#FDCB6E" stroke="#2D3436" strokeWidth="3" strokeLinejoin="round"/>
              <polygon points="25,140 20,120 30,120" fill="#2D3436"/>
              {/* Ojos en el cuerpo */}
              <circle cx="18" cy="50" r="5" fill="white" stroke="#2D3436" strokeWidth="2"/>
              <circle cx="32" cy="50" r="5" fill="white" stroke="#2D3436" strokeWidth="2"/>
              <circle cx="19" cy="51" r="2.5" fill="#2D3436"/>
              <circle cx="33" cy="51" r="2.5" fill="#2D3436"/>
              {/* Sonrisa */}
              <path d="M18 62 Q25 68 32 62" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* Detalle decorativo */}
              <line x1="15" y1="35" x2="35" y2="35" stroke="#2D3436" strokeWidth="2"/>
              <line x1="15" y1="42" x2="35" y2="42" stroke="#2D3436" strokeWidth="2"/>
            </svg>
          </div>

          {/* BILLETE CON LENGUA - Bottom Left */}
          <div className="absolute bottom-24 left-8 md:left-16 lg:left-28 float hidden lg:block" style={{ animationDelay: '1s' }}>
            <svg width="140" height="90" viewBox="0 0 140 90" className="drop-shadow-xl">
              {/* Cuerpo del billete */}
              <rect x="5" y="10" width="130" height="70" rx="8" fill="#00B894" stroke="#2D3436" strokeWidth="4"/>
              {/* Borde interior */}
              <rect x="15" y="20" width="110" height="50" rx="4" fill="none" stroke="#2D3436" strokeWidth="2" strokeDasharray="6 3"/>
              {/* Simbolo euro grande */}
              <text x="100" y="58" textAnchor="middle" fill="#FDCB6E" fontSize="36" fontWeight="bold" stroke="#2D3436" strokeWidth="1">€</text>
              {/* Ojos */}
              <ellipse cx="40" cy="38" rx="12" ry="14" fill="white" stroke="#2D3436" strokeWidth="3"/>
              <ellipse cx="70" cy="38" rx="12" ry="14" fill="white" stroke="#2D3436" strokeWidth="3"/>
              <circle cx="43" cy="40" r="6" fill="#2D3436"/>
              <circle cx="73" cy="40" r="6" fill="#2D3436"/>
              <circle cx="45" cy="38" r="2" fill="white"/>
              <circle cx="75" cy="38" r="2" fill="white"/>
              {/* Cejas traviesas */}
              <path d="M28 26 Q40 20 52 26" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M58 26 Q70 20 82 26" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Boca abierta */}
              <ellipse cx="55" cy="60" rx="15" ry="10" fill="#2D3436"/>
              {/* Lengua sacada */}
              <ellipse cx="55" cy="68" rx="10" ry="12" fill="#FF7675" stroke="#2D3436" strokeWidth="2"/>
              <path d="M50 68 L55 78 L60 68" fill="#FF7675" stroke="#E17055" strokeWidth="1"/>
              {/* Mejillas */}
              <circle cx="25" cy="50" r="6" fill="#FDCB6E" opacity="0.5"/>
              <circle cx="85" cy="50" r="6" fill="#FDCB6E" opacity="0.5"/>
            </svg>
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
