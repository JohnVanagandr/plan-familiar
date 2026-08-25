export const IconBox = ({
  icon: Icon,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses = "flex items-center justify-center font-bold shrink-0";
  
  const variants = {
    primary: "bg-[#0770CC]/10 text-[#0770CC]",
    accent: "bg-[#FF6600]/10 text-[#FF6600]",
    success: "bg-emerald-500/10 text-emerald-600",
    neutral: "bg-slate-900/5 text-slate-900",
    purple: "bg-purple-500/10 text-purple-600",
  };

  const sizes = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-12 h-12 rounded-2xl",
    lg: "w-14 h-14 rounded-2xl",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  const finalClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

  return (
    <div className={finalClasses} {...props}>
      {Icon && <Icon className={iconSizes[size] || iconSizes.md} />}
    </div>
  );
};