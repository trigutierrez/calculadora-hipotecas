import { useState, useEffect } from "react";
import { Home, Euro } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AppraisalCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<string>("");
  const [appraisalValue, setAppraisalValue] = useState<string>("");
  const [mySavings, setMySavings] = useState<string>("");
  const [bankFinancing, setBankFinancing] = useState<number>(0);
  const [savingsNeeded, setSavingsNeeded] = useState<number>(0);

  useEffect(() => {
    const price = parseFloat(propertyPrice) || 0;
    const appraisal = parseFloat(appraisalValue) || 0;

    if (price > 0 && appraisal > 0) {
      const minValue = Math.min(price, appraisal);
      const financing = minValue * 0.80;
      setBankFinancing(financing);
      setSavingsNeeded(price - financing);
    } else {
      setBankFinancing(0);
      setSavingsNeeded(0);
    }
  }, [propertyPrice, appraisalValue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-6 animate-slide-up">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
            Calcula que el banco
            <span className="block text-primary">no te haga ghosting</span>
          </h1>
          <p className="text-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Descubre cuánto te financiará el banco y cuánto necesitas ahorrar
          </p>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 overflow-hidden">
        {/* Form */}
        <div className="px-6 py-6 space-y-4">
          {/* Precio de compra */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              <Label className="text-sm text-muted-foreground font-medium">Precio de compra de la vivienda</Label>
            </div>
            <Input
              type="number"
              placeholder="250000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              className="border-0 bg-transparent text-3xl font-bold placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 h-auto"
            />
            {propertyPrice && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(propertyPrice) || 0)}
              </p>
            )}
          </div>

          {/* Tasación */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-primary" />
              <Label className="text-sm text-muted-foreground font-medium">Tasación de la vivienda</Label>
            </div>
            <Input
              type="number"
              placeholder="260000"
              value={appraisalValue}
              onChange={(e) => setAppraisalValue(e.target.value)}
              className="border-0 bg-transparent text-3xl font-bold placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 h-auto"
            />
            {appraisalValue && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(appraisalValue) || 0)}
              </p>
            )}
          </div>

          {/* Ahorros que tengo */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-primary" />
              <Label className="text-sm text-muted-foreground font-medium">Ahorros que tengo</Label>
            </div>
            <Input
              type="number"
              placeholder="50000"
              value={mySavings}
              onChange={(e) => setMySavings(e.target.value)}
              className="border-0 bg-transparent text-3xl font-bold placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 h-auto"
            />
            {mySavings && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(mySavings) || 0)}
              </p>
            )}
          </div>
        </div>

        {/* Results - Siempre visibles */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* El banco financia */}
          <div className="px-6 py-8 bg-gradient-to-br from-primary/10 to-primary/5 border-t border-primary/10">
            <p className="text-sm font-medium text-muted-foreground mb-2">El banco suele financiar</p>
            <p className="text-4xl md:text-5xl font-bold text-primary">{formatCurrency(bankFinancing)}</p>
            <p className="text-sm text-muted-foreground mt-2">80% del valor menor</p>
          </div>

          {/* Ahorros necesarios */}
          {(() => {
            const myCurrentSavings = parseFloat(mySavings) || 0;
            const difference = myCurrentSavings - savingsNeeded;
            const hasSufficient = myCurrentSavings > 0 && difference >= 0;
            const isInsufficient = myCurrentSavings > 0 && difference < 0;

            return (
              <div className={`px-6 py-8 border-t ${
                hasSufficient
                  ? 'bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/10'
                  : isInsufficient
                    ? 'bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/10'
                    : 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/10'
              }`}>
                <p className="text-sm font-medium text-muted-foreground mb-2">Deberías tener ahorrado</p>
                <p className={`text-4xl md:text-5xl font-bold ${
                  hasSufficient ? 'text-green-600' : isInsufficient ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {formatCurrency(savingsNeeded)}
                </p>
                {hasSufficient && (
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    ¡Te sobran {formatCurrency(difference)}!
                  </p>
                )}
                {isInsufficient && (
                  <p className="text-sm text-red-600 mt-2 font-medium">
                    Te faltan {formatCurrency(Math.abs(difference))}
                  </p>
                )}
                {!hasSufficient && !isInsufficient && (
                  <p className="text-sm text-muted-foreground mt-2">Para la entrada</p>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          El banco financia el 80% del menor valor entre precio y tasación. Los cálculos son orientativos.
        </p>
      </div>
    </div>
  );
};

export default AppraisalCalculator;
