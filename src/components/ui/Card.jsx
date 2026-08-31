export const Card = ({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}) => {
  // Clases Base: Overflow, display y física de animación encapsulada
  const baseClasses = "group relative rounded-3xl transition-all duration-500 ease-out flex flex-col overflow-hidden";

  // Diccionario Óptico: Controla exclusivamente colores, bordes y sombras
  const variants = {
    default: "bg-white border border-slate-200 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-[#0770CC]/10 hover:border-[#0770CC]/30 hover:-translate-y-1",
    
    editorial: "bg-gradient-to-b from-white to-slate-50/50 hover:shadow-2xl hover:shadow-[#0770CC]/10 hover:border-[#0770CC]/40 hover:-translate-y-1.5",
    
    glass: "bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-200/40 hover:bg-white/80 hover:-translate-y-1",
    
    // Nueva variante para fondos oscuros o layouts de autenticación
    "glass-subtle": "bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner hover:bg-white/10 hover:-translate-y-1"
  };

  // Diccionario Espacial: Controla la respiración interna del componente
  const paddings = {
    none: "",
    sm: "p-5",
    md: "p-8",
    lg: "p-10"
  };

  const finalClasses = `${baseClasses} ${variants[variant] || variants.default} ${paddings[padding] || paddings.md} ${className}`.trim();

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
};