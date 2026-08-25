import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  shape = "default",
  type = "button",
  fullWidth = false, 
  isLoading = false, 
  disabled = false,
  className = "",
  ...props
}) => {
  // 1. Clases Base: Agregado whitespace-nowrap para evitar saltos de línea con iconos
  const baseClasses = "relative inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide cursor-pointer transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden select-none whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none";

  // 2. Diccionario Óptico: Sombras coloreadas integradas
  const variants = {
    primary: "bg-[#0770CC] text-white border border-transparent shadow-sm shadow-[#0770CC]/20 hover:bg-[#065da8] hover:shadow-md hover:shadow-[#0770CC]/30 hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    
    accent: "bg-[#FF6600] text-white border border-transparent shadow-sm shadow-[#FF6600]/20 hover:bg-[#e05b00] hover:shadow-md hover:shadow-[#FF6600]/30 hover:-translate-y-0.5 focus-visible:ring-[#FF6600]",
    
    secondary: "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-[#0770CC]/50 hover:text-[#0770CC] hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    
    danger: "bg-red-500 text-white border border-transparent shadow-sm shadow-red-500/20 hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-red-500",
    
    success: "bg-emerald-500 text-white border border-transparent shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-emerald-500",
    
    "outline-primary": "border-2 border-[#0770CC] text-[#0770CC] bg-transparent hover:bg-[#0770CC] hover:text-white hover:shadow-sm hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    
    "outline-secondary": "border-2 border-slate-200 text-slate-600 bg-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 focus-visible:ring-slate-300",
    
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-300",
    
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-lg focus-visible:ring-white",

    sidebar: "bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-sm font-medium"
  };

  // 3. Diccionario Espacial
  const sizes = {
    sm: shape === "circle" ? "w-8 h-8 text-xs" : "px-3 py-1.5 text-xs",
    md: shape === "circle" ? "w-10 h-10 text-sm" : "px-5 py-2.5 text-sm",
    lg: shape === "circle" ? "w-12 h-12 text-base" : "px-6 py-3 text-base"
  };

  // 4. Diccionario de Siluetas
  const shapes = {
    default: "rounded-xl",
    pill: "rounded-full",
    square: "rounded-md", 
    circle: "rounded-full" 
  };

  // 5. Ensamblaje Lógico
  const widthClass = fullWidth ? "w-full" : "";
  const isButtonDisabled = disabled || isLoading;

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${shapes[shape] || shapes.default} ${widthClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={finalClasses}
      disabled={isButtonDisabled}
      aria-disabled={isButtonDisabled ? true : undefined}
      {...props}
    >
      {/* Interfaz de carga dinámica */}
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      
      {/* Contenido sin span extra para que Flexbox gestione el gap correctamente con los iconos */}
      {children}
    </button>
  );
};