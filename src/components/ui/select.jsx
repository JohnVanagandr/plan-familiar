import { useId } from "react";
import ReactSelect from "react-select";
import { CircleAlert } from "lucide-react";

export function Select({
  label,
  icon: Icon,
  error,
  value,
  name,
  arrayOptions = [],
  onChange,
  placeholder,
  variant = "primary",
  size = "md",
  className = "",
  id,
  disabled = false,
  ...props
}) {
  const reactId = useId();
  const selectId = id || reactId;

  const handleSelectChange = (selected) => {
    onChange({
      target: {
        name: name,
        value: String(selected ? selected.value : ""),
      },
    });
  };

  const selectedOption =
    arrayOptions.find((opt) => String(opt.value) === String(value)) ?? null;

  // Estilos base para el contenedor principal del select
  const baseClasses = `w-full rounded-full border transition-all duration-300 ease-out flex items-center relative ${
    disabled ? "cursor-not-allowed opacity-60 bg-slate-50" : ""
  }`;

  const variants = {
    primary: error
      ? "border-red-500 bg-white text-slate-900 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/15 shadow-sm shadow-red-500/10"
      : "border-slate-200 bg-white text-slate-900 focus-within:border-[#0770CC] focus-within:ring-4 focus-within:ring-[#0770CC]/15 shadow-sm shadow-slate-200/50 hover:border-slate-300",

    ghost:
      "border-transparent bg-slate-50 text-slate-900 focus-within:bg-white focus-within:border-[#0770CC] focus-within:ring-4 focus-within:ring-[#0770CC]/15 hover:bg-slate-100",
  };

  const sizes = {
    sm: Icon ? "pl-9 pr-3 py-1.5 text-xs" : "px-3 py-1.5 text-xs",
    md: Icon ? "pl-11 pr-4 py-2.5 text-sm" : "px-4 py-2.5 text-sm",
    lg: Icon ? "pl-12 pr-5 py-3.5 text-base" : "px-5 py-3.5 text-base",
  };

  const iconSizes = {
    sm: "size-4 left-3",
    md: "size-5 left-3.5",
    lg: "size-5 left-4",
  };
  const iconColor = error ? "text-red-500" : "text-slate-400";

  const containerClasses = `${baseClasses} ${
    variants[variant] || variants.primary
  } ${sizes[size] || sizes.md} ${className}`.trim();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label homologado con el Input */}
      {label && (
        <label
          htmlFor={selectId}
          className={`text-[11px] font-bold uppercase tracking-wider ml-0.5 flex items-center gap-1 ${
            disabled ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {label}
          {error && (
            <span className="text-red-500 text-lg leading-none mt-1">*</span>
          )}
        </label>
      )}

      <div className={containerClasses}>
        {/* Ícono dinámico pasado como componente de Lucide */}
        {Icon && (
          <Icon
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-10 ${
              iconSizes[size] || iconSizes.md
            } ${iconColor}`}
          />
        )}

        <ReactSelect
          id={selectId}
          instanceId={selectId}
          isDisabled={disabled}
          unstyled
          className="w-full"
          classNames={{
            control: () => "min-h-[24px] w-full bg-transparent",
            placeholder: () => "text-slate-400 w-full text-start",
            singleValue: () => "text-slate-900 text-start",
            input: () => "text-slate-900",
            menu: () =>
              "bg-white text-slate-900 rounded-2xl p-2 mt-2 shadow-lg border border-slate-100 overflow-hidden z-50",
            option: ({ isFocused, isSelected }) =>
              `px-3 py-2 cursor-pointer rounded-xl mb-0.5 text-sm transition-colors ${
                isSelected
                  ? "bg-[#0770CC] text-white"
                  : isFocused
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-700"
              }`,
            indicatorSeparator: () => "hidden",
          }}
          styles={{
            control: (base) => ({ ...base, minHeight: "24px" }),
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          placeholder={placeholder}
          value={selectedOption}
          options={arrayOptions}
          onChange={handleSelectChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        />
      </div>

      {/* Mensaje de error homologado con el Input */}
      {error && (
        <span
          id={`${selectId}-error`}
          className="text-xs text-red-500 font-medium ml-0.5 animate-in fade-in slide-in-from-top-1 flex gap-1.5 items-center"
        >
          <CircleAlert className="size-4 shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}