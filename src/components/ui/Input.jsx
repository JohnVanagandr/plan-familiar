import { useId } from 'react';

export const Input = ({
  label,
  error,
  variant = "primary",
  size = "md",
  className = "",
  id,
  disabled,
  ...props
}) => {
  const reactId = useId();
  const inputId = id || reactId;

  const baseClasses = `w-full rounded-xl border outline-none transition-all duration-300 ease-out placeholder:text-slate-400 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] ${
    disabled ? "cursor-not-allowed opacity-60 bg-slate-50" : "cursor-text"
  }`;
  
  const variants = {
    primary: error 
      ? "border-red-500 bg-white text-slate-900 caret-red-600 hover:border-red-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/15 shadow-sm shadow-red-500/10" 
      : "border-slate-200 bg-white text-slate-900 caret-[#0770CC] hover:border-slate-300 focus:border-[#0770CC] focus:ring-4 focus:ring-[#0770CC]/15 shadow-sm shadow-slate-200/50",
    
    ghost: "border-transparent bg-slate-50 text-slate-900 caret-[#0770CC] hover:bg-slate-100 focus:bg-white focus:border-[#0770CC] focus:ring-4 focus:ring-[#0770CC]/15",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
  };

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className={`text-[11px] font-bold uppercase tracking-wider ml-0.5 flex items-center gap-1 ${disabled ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
          {error && <span className="text-red-500 text-lg leading-none mt-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input 
          id={inputId} 
          disabled={disabled}
          className={finalClasses} 
          {...props} 
        />
      </div>

      {error && (
        <span className="text-xs text-red-500 font-medium ml-0.5 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};