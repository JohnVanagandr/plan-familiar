export const Badge = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
  ...props
}) => {
  // 1. Clases Base: Alineación de iconos, sin salto de línea y transiciones suaves
  const baseClasses = "inline-flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out select-none whitespace-nowrap";

  // 2. Diccionario de Variantes
  const variants = {
    primary: "bg-[#0770CC]/10 text-[#0770CC] border border-[#0770CC]/10",
    accent: "bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/10",
    neutral: "bg-slate-900/10 text-slate-800 border border-slate-900/10",
    success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/10",
    
    // Variantes sólidas con sombras de color emitido
    "solid-primary": "bg-[#0770CC] text-white shadow-sm shadow-[#0770CC]/20",
    "solid-accent": "bg-[#FF6600] text-white shadow-sm shadow-[#FF6600]/20",
    
    // Variante Glass mejorada
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-sm"
  };

  // 3. Tamaños
  const sizes = {
    xs: "px-2 py-0.5 text-[9px]",
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs"
  };

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.sm} ${className}`.trim();

  return (
    <span className={finalClasses} {...props}>
      {children}
    </span>
  );
};