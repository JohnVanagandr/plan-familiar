import { useId, useState } from 'react';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  icon: Icon,
  error,
  variant = "primary",
  size = "md",
  className = "",
  id,
  disabled,
  type = "text",
  ...props
}) => {
  const reactId = useId();
  const inputId = id || reactId;

  const [showPassword, setShowPassword] = useState(false);
  const currentType = (type === "password" && showPassword) ? "text" : type;

  const baseClasses = `w-full rounded-full border outline-none transition-all duration-300 ease-out placeholder:text-slate-400 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] ${
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

  const iconSizes = { sm: "size-4 left-3", md: "size-5 left-3.5", lg: "size-5 left-4" };
  const iconColor = error ? "text-red-500" : "text-slate-400";

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${type === "password" ? "pr-11" : ""} ${className}`.trim();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className={`text-[11px] font-bold uppercase tracking-wider ml-0.5 flex items-center gap-1 ${disabled ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
          {error && <span className="text-red-500 text-lg leading-none mt-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className={`absolute top-1/2 -translate-y-1/2 ${iconSizes[size] || iconSizes.md} ${iconColor}`} />
        )}

        <input
          id={inputId}
          type={currentType}
          disabled={disabled}
          className={finalClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {error && (
        <span id={`${inputId}-error`} className="text-xs text-red-500 font-medium ml-0.5 animate-in fade-in slide-in-from-top-1 flex gap-2 items-center">
          <CircleAlert className="size-4 shrink-0"/>
          {error}
        </span>
      )}
    </div>
  );
};