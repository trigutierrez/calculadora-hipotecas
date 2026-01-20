import { useState, useEffect } from "react";
import { X, Download, Building2, Percent, Calendar, Shield, Euro } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

interface CalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlyInsurance: number;
  totalInsurance: number;
}

interface MortgageFormProps {
  onRemove?: () => void;
  showRemove?: boolean;
  formIndex?: number;
}

const MortgageForm = ({ onRemove, showRemove = false, formIndex = 1 }: MortgageFormProps) => {
  const [bank, setBank] = useState<string>("");
  const [bankLogo, setBankLogo] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [annualInsurance, setAnnualInsurance] = useState<string>("");
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Cálculo automático cuando cambian los valores
  useEffect(() => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);
    const insurance = parseFloat(annualInsurance) || 0;

    if (principal > 0 && annualRate > 0 && years > 0) {
      const monthlyRate = annualRate / 100 / 12;
      const numberOfPayments = years * 12;

      const monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      const totalInsurance = insurance * years;
      const totalCost = totalPayment + totalInsurance;

      const monthlyInsurance = insurance / 12;

      setResults({
        monthlyPayment,
        totalInterest,
        totalCost,
        monthlyInsurance,
        totalInsurance,
      });
    } else {
      setResults(null);
    }
  }, [loanAmount, interestRate, loanTerm, annualInsurance]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen no puede superar los 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBankLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = results
    ? [
        {
          name: "Préstamo",
          value: parseFloat(loanAmount),
        },
        {
          name: "Intereses",
          value: results.totalInterest,
        },
        {
          name: "Seguros",
          value: results.totalInsurance,
        },
      ]
    : [];

  const COLORS = ["hsl(152, 69%, 40%)", "hsl(200, 80%, 50%)", "hsl(35, 95%, 55%)"];

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Título izquierda
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen de la hipoteca', 15, 20);

    // Fecha debajo del título
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 15, 28);

    // Nombre del banco grande arriba derecha
    if (bank) {
      doc.setFontSize(18);
      doc.setTextColor(44, 62, 80);
      doc.setFont('helvetica', 'bold');
      doc.text(bank, pageWidth - 15, 20, { align: 'right' });
    }

    // Logo del banco si existe
    if (bankLogo) {
      try {
        doc.addImage(bankLogo, 'PNG', pageWidth - 45, 25, 30, 12);
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
      }
    }

    // Caja del pago mensual
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 40, pageWidth - 30, 30, 3, 3, 'FD');

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Vas a pagar aproximadamente al mes', 20, 52);

    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(results.monthlyPayment + results.monthlyInsurance), 20, 64);

    // Tabla datos de la hipoteca
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Datos de la hipoteca', 15, 85);

    const inputData = [
      ['Importe del préstamo', formatCurrency(parseFloat(loanAmount))],
      ['Tipo de interés anual', `${interestRate}%`],
      ['Plazo del préstamo', `${loanTerm} años`],
      ['Seguro anual', annualInsurance ? formatCurrency(parseFloat(annualInsurance)) : 'No incluido'],
    ];

    autoTable(doc, {
      startY: 90,
      head: [['Concepto', 'Valor']],
      body: inputData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5, font: 'helvetica' },
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 'auto', halign: 'right', fontStyle: 'bold' }
      },
      alternateRowStyles: { fillColor: [250, 250, 250] }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 12;

    // Tabla desglose de costes
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Desglose de costes', 15, finalY);

    const resultsData = [
      ['Cuota mensual (capital + intereses)', formatCurrency(results.monthlyPayment)],
      ['Seguro mensual', formatCurrency(results.monthlyInsurance)],
      ['Total intereses a pagar', formatCurrency(results.totalInterest)],
      [`Total seguros (${loanTerm} años)`, formatCurrency(results.totalInsurance)],
      ['Coste total de la hipoteca', formatCurrency(results.totalCost)],
    ];

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Concepto', 'Valor']],
      body: resultsData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5, font: 'helvetica' },
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 'auto', halign: 'right', fontStyle: 'bold' }
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      didParseCell: (data) => {
        if (data.row.index === 4 && data.section === 'body') {
          data.cell.styles.fillColor = [44, 62, 80];
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    doc.setFont('helvetica', 'italic');
    doc.text('Esto es un ejemplo generado con los datos que has introducido. No es una oferta oficial.', pageWidth / 2, pageHeight - 10, { align: 'center' });

    const fileName = bank ? `Hipoteca_${bank.replace(/\s+/g, '_')}.pdf` : 'Hipoteca.pdf';
    doc.save(fileName);

    toast.success("PDF descargado correctamente");
  };

  return (
    <div className="space-y-4">
      {/* Main Calculator Card */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {bankLogo ? (
              <img src={bankLogo} alt="Logo del banco" className="h-10 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {bank || `Hipoteca ${formIndex}`}
              </h2>
              <p className="text-sm text-muted-foreground">Detalles del préstamo</p>
            </div>
          </div>
          {showRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
              onClick={onRemove}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Bank Name Input */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-medium">Banco</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                    ?
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Nombre del banco que te ofrece la hipoteca</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="Ej: BBVA, Santander..."
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="border-0 bg-transparent text-lg font-semibold placeholder:text-muted-foreground/50 focus-visible:ring-0 p-0 h-auto"
              />
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                    Logo
                  </div>
                </label>
                {bankLogo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBankLogo("")}
                    className="h-7 w-7 p-0 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Loan Amount - Main Input */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-primary" />
              <Label className="text-sm text-muted-foreground font-medium">Importe del préstamo</Label>
            </div>
            <Input
              type="number"
              placeholder="150000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="border-0 bg-transparent text-3xl font-bold number-display placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 h-auto"
            />
            {loanAmount && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(loanAmount) || 0)}
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-3 hover:bg-muted/50 transition-colors border-2 border-transparent focus-within:border-primary">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-primary" />
              <Label className="text-sm text-muted-foreground font-medium">Interés anual (%)</Label>
            </div>
            <Input
              type="number"
              step="0.01"
              placeholder="3.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="border-0 bg-transparent text-3xl font-bold number-display placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 h-auto"
            />
          </div>

          {/* Loan Term Selection */}
          <div className="bg-muted/30 rounded-2xl p-4 space-y-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <Label className="text-sm text-muted-foreground font-medium">Plazo del préstamo</Label>
              </div>
              <span className="text-2xl font-bold text-primary">{loanTerm} años</span>
            </div>
            <Slider
              value={[parseInt(loanTerm)]}
              onValueChange={(value) => setLoanTerm(value[0].toString())}
              min={5}
              max={40}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 años</span>
              <span>40 años</span>
            </div>
          </div>

          {/* Monthly Payment Result - BIG AND CLEAR */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 space-y-2 border-2 border-primary/20">
            <Label className="text-sm text-primary font-semibold uppercase tracking-wide">Pago mensual</Label>
            <p className="text-5xl md:text-6xl font-bold number-display text-primary">
              {results ? formatNumber(results.monthlyPayment) : "0,00"}
              <span className="text-2xl ml-2">€</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Capital + Intereses (sin seguros)
            </p>
          </div>

          {/* Insurance Section */}
          <div className="bg-amber-50 rounded-2xl p-4 space-y-3 border border-amber-200/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <Label className="text-sm text-amber-700 font-medium">Coste de los seguros al año</Label>
            </div>
            <Input
              type="number"
              placeholder="1200"
              value={annualInsurance}
              onChange={(e) => setAnnualInsurance(e.target.value)}
              className="border-0 bg-transparent text-2xl font-bold number-display placeholder:text-amber-300 focus-visible:ring-0 p-0 h-auto text-amber-700"
            />
            {results && parseFloat(annualInsurance) > 0 && (
              <div className="pt-2 border-t border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-700">Total seguros ({loanTerm} años)</span>
                  <span className="text-lg font-bold text-amber-700">
                    {formatCurrency(results.totalInsurance)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-amber-600">Seguro mensual</span>
                  <span className="text-sm font-semibold text-amber-600">
                    {formatCurrency(results.monthlyInsurance)}/mes
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-5 bg-foreground text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Interés total ({loanTerm} años)</span>
            <span className="font-semibold">
              {results ? formatCurrency(results.totalInterest) : "---"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Coste total de la hipoteca</span>
            <span className="text-2xl font-bold">
              {results ? formatCurrency(results.totalCost) : "---"}
            </span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-4 animate-slide-up">
          {/* Download PDF Button */}
          <Button
            onClick={generatePDF}
            className="w-full py-6 rounded-2xl bg-foreground hover:bg-foreground/90 text-white font-semibold text-base gap-3"
          >
            <Download className="w-5 h-5" />
            Descargar resumen PDF
          </Button>

          {/* Chart Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 overflow-hidden">
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Distribución del coste</h3>
                  <p className="text-sm text-muted-foreground">Desglose visual de tu hipoteca</p>
                </div>
                {(bank || bankLogo) && (
                  <div className="text-right flex flex-col items-end gap-1">
                    {bankLogo && (
                      <img src={bankLogo} alt="Logo del banco" className="h-8 w-auto object-contain" />
                    )}
                    {bank && (
                      <p className="text-sm font-semibold text-foreground">{bank}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="px-4">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "1rem",
                      boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend Details */}
            <div className="px-6 pb-6 space-y-3">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{formatCurrency(item.value)}</p>
                    <p className="text-xs text-muted-foreground">
                      {((item.value / results.totalCost) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageForm;
