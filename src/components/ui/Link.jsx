import { Link as RouterLink } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const Link = ({
  href,
  children,
  variant = "link",
  size = "md",
  shape = "default",
  fullWidth = false, 
  isLoading = false, 
  disabled = false,
  className = "",
  ...props
}) => {
  const isButtonLike = variant !== "link";

  // 1. Base Clases: Añadimos `whitespace-nowrap` para evitar que el icono salte a la segunda línea
  const linkBaseClasses = "inline-flex items-center gap-1.5 cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0770CC] focus-visible:ring-offset-2 hover:underline underline-offset-4 decoration-transparent hover:decoration-current whitespace-nowrap";
  
  // 1. Base Clases: `whitespace-nowrap` también en los botones
  const buttonBaseClasses = "relative inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide cursor-pointer transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden select-none whitespace-nowrap";
  
  const baseClasses = isButtonLike ? buttonBaseClasses : linkBaseClasses;

  // Diccionario Óptico
  const variants = {
    link: "text-[#0770CC] hover:text-[#065da8] font-medium",
    primary: "bg-[#0770CC] text-white border border-transparent shadow-sm shadow-[#0770CC]/20 hover:bg-[#065da8] hover:shadow-md hover:shadow-[#0770CC]/30 hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    accent: "bg-[#FF6600] text-white border border-transparent shadow-sm shadow-[#FF6600]/20 hover:bg-[#e05b00] hover:shadow-md hover:shadow-[#FF6600]/30 hover:-translate-y-0.5 focus-visible:ring-[#FF6600]",
    secondary: "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-[#0770CC]/50 hover:text-[#0770CC] hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-300",
    "outline-primary": "border-2 border-[#0770CC] text-[#0770CC] bg-transparent hover:bg-[#0770CC] hover:text-white hover:shadow-sm hover:-translate-y-0.5 focus-visible:ring-[#0770CC]",
    "outline-secondary": "border-2 border-slate-200 text-slate-600 bg-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 focus-visible:ring-slate-300",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-lg focus-visible:ring-white"
  };

  const sizes = isButtonLike ? {
    sm: shape === "circle" ? "w-8 h-8 text-xs" : "px-3 py-1.5 text-xs",
    md: shape === "circle" ? "w-10 h-10 text-sm" : "px-5 py-2.5 text-sm",
    lg: shape === "circle" ? "w-12 h-12 text-base" : "px-6 py-3 text-base"
  } : {};

  const shapes = isButtonLike ? {
    default: "rounded-xl",
    pill: "rounded-full",
    square: "rounded-md", 
    circle: "rounded-full" 
  } : {};

  const isLinkDisabled = disabled || isLoading;
  const disabledClasses = isLinkDisabled ? "opacity-70 cursor-not-allowed pointer-events-none" : "";
  const widthClass = (fullWidth && isButtonLike) ? "w-full" : "";

  const finalClasses = `${baseClasses} ${variants[variant] || variants.link} ${isButtonLike ? (sizes[size] || sizes.md) : ""} ${isButtonLike ? (shapes[shape] || shapes.default) : ""} ${widthClass} ${disabledClasses} ${className}`.trim();

  // 2. Contenido Dinámico: Retiramos el <span> extra alrededor de {children}
  // Ahora Flexbox (gap-2) puede identificar el texto y el icono como elementos separados y alinearlos perfecto.
  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </>
  );

  const handleClick = (e) => {
    if (isLinkDisabled) {
      e.preventDefault();
      return;
    }
    if (props.onClick) props.onClick(e);
  };

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={finalClasses} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <RouterLink to={href} className={finalClasses} onClick={handleClick} {...props}>
      {content}
    </RouterLink>
  );
};