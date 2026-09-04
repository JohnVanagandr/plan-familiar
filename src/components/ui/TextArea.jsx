import { useId } from 'react';
import { CircleAlert } from 'lucide-react';

export const Textarea = ({
  label,
  icon: Icon,
  error,
  variant = "primary",
  size = "md",
  className = "",
  id,
  disabled,
  rows = 3,
  ...props
}) => {
  const reactId = useId();
  const textareaId = id || reactId;

  // Usamos rounded-3xl en lugar de rounded-full para que mantenga el estilo suave pero permita múltiples líneas
  const baseClasses = `w-full min-h-[240px] rounded-3xl border outline-none transition-all duration-300 ease-out placeholder:text-slate-400 resize-y ${
    disabled ? "cursor-not-allowed opacity-60 bg-slate-50" : "cursor-text"
  }`;

  const variants = {
    primary: error
      ? "border-red-500 bg-white text-slate-900 caret-red-600 hover:border-red-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/15 shadow-sm shadow-red-500/10"
      : "border-slate-200 bg-white text-slate-900 caret-[#0770CC] hover:border-slate-300 focus:border-[#0770CC] focus:ring-4 focus:ring-[#0770CC]/15 shadow-sm shadow-slate-200/50",

    ghost: "border-transparent bg-slate-50 text-slate-900 caret-[#0770CC] hover:bg-slate-100 focus:bg-white focus:border-[#0770CC] focus:ring-4 focus:ring-[#0770CC]/15",
  };

  const sizes = {
    sm: Icon ? "pl-9 pr-3 py-2 text-xs" : "px-3 py-2 text-xs",
    md: Icon ? "pl-11 pr-4 py-3 text-sm" : "px-4 py-3 text-sm",
    lg: Icon ? "pl-12 pr-5 py-4 text-base" : "px-5 py-4 text-base",
  };

  // En el textarea el ícono se alinea arriba (top) para acompañar la primera línea de texto
  const iconSizes = { sm: "size-4 left-3 top-3", md: "size-5 left-3.5 top-3.5", lg: "size-5 left-4 top-4" };
  const iconColor = error ? "text-red-500" : "text-slate-400";

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className={`text-[11px] font-bold uppercase tracking-wider ml-0.5 flex items-center gap-1 ${disabled ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
          {error && <span className="text-red-500 text-lg leading-none mt-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className={`absolute pointer-events-none ${iconSizes[size] || iconSizes.md} ${iconColor}`} />
        )}

        <textarea
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className={finalClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
      </div>

      {error && (
        <span id={`${textareaId}-error`} className="text-xs text-red-500 font-medium ml-0.5 animate-in fade-in slide-in-from-top-1 flex gap-2 items-center">
          <CircleAlert className="size-4 shrink-0"/>
          {error}
        </span>
      )}
    </div>
  );
};

export default Textarea;