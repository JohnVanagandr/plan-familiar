import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCheck2,
} from "lucide-react";

// Íconos predeterminados por variante usando Lucide
const DEFAULT_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  confirm: HelpCircle,
  yesno: HelpCircle,
  consent: FileCheck2,
};

export const Alert = ({
  text = "",
  icon: IconProp,
  variant = "success",
  isVisible = false,
  onClose = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  autoClose = true,
  confirmText,
  cancelText,
  className = "",
  consentText = "",
  checkboxLabel = "He leído y acepto el tratamiento de mis datos personales",
} = {}) => {
  const actionVariants = ["confirm", "yesno", "consent"];
  const isActionVariant = actionVariants.includes(variant);
  const isConsent = variant === "consent";

  const [aceptado, setAceptado] = useState(false);

  useEffect(() => {
    setAceptado(false);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !autoClose || isActionVariant) return;
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [isVisible, autoClose, isActionVariant, onClose]);

  if (!isVisible) return null;

  const clasesBase =
    "size-full fixed inset-0 z-100 flex items-center justify-center bg-white/60 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]";

  const variantColors = {
    success: "text-emerald-600",
    error: "text-red-600",
    confirm: "text-[#0770CC]",
    yesno: "text-[#0770CC]",
    consent: "text-[#0770CC]",
  };

  const defaultTexts = {
    confirm: { confirm: "Confirmar", cancel: "Cancelar" },
    yesno: { confirm: "Sí", cancel: "No" },
    consent: { confirm: "Aceptar y continuar", cancel: "Cancelar" },
  };

  const finalConfirmText =
    confirmText ?? defaultTexts[variant]?.confirm ?? "Confirmar";
  const finalCancelText =
    cancelText ?? defaultTexts[variant]?.cancel ?? "Cancelar";

  const iconColor = variantColors[variant] || variantColors.success;
  const finalClasses = `${clasesBase} ${className}`.trim();
  const confirmDisabled = isConsent && !aceptado;

  // Determinar el ícono a renderizar (Componente o String)
  const IconComponent = IconProp || DEFAULT_ICONS[variant] || DEFAULT_ICONS.success;

  return (
    <div
      className={finalClasses}
      onClick={!isActionVariant ? onClose : undefined}
    >
      <div
        className={`relative flex w-[90%] ${
          isConsent ? "max-w-lg" : "max-w-sm"
        } flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-2xl animate-[popUp_0.3s_ease-out]`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/svg/ilustracion_ave_a.svg"
          alt=""
          className="absolute -top-10 w-25 -left-5 pointer-events-none select-none"
        />
        <img
          src="/svg/ilustracion_ave_b.svg"
          alt=""
          className="absolute -bottom-5 w-25 -right-12 pointer-events-none select-none"
        />

        {/* Renderizado dinámico del ícono */}
        <div className="flex items-center justify-center">
          {typeof IconComponent === "string" ? (
            <i
              className={`${IconComponent} text-6xl ${iconColor} animate-[iconPop_0.5s_ease-out]`}
            />
          ) : (
            <IconComponent
              className={`size-16 stroke-[1.75] ${iconColor} animate-[iconPop_0.5s_ease-out]`}
            />
          )}
        </div>

        <span className="text-center text-lg font-bold text-slate-800 leading-snug">
          {text}
        </span>

        {isConsent && (
          <>
            <div className="w-full max-h-48 overflow-y-auto text-left text-sm text-slate-600 border border-slate-200 rounded-2xl p-4 leading-relaxed bg-slate-50">
              {consentText}
            </div>

            <label className="flex items-start gap-2.5 w-full text-left text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={aceptado}
                onChange={(e) => setAceptado(e.target.checked)}
                className="mt-0.5 size-4 rounded border-slate-300 text-azul focus:ring-azul"
              />
              <span>{checkboxLabel}</span>
            </label>
          </>
        )}

        {isActionVariant && (
          <div className="flex w-full gap-3 mt-2">
            <button
              type="button"
              className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800"
              onClick={() => {
                onCancel();
                onClose();
              }}
            >
              {finalCancelText}
            </button>

            <button
              type="button"
              disabled={confirmDisabled}
              className={`flex-1 rounded-full py-3 text-sm font-semibold text-white transition-all ${
                confirmDisabled
                  ? "bg-slate-300 cursor-not-allowed opacity-60"
                  : "bg-(--color_azul) hover:bg-azul shadow-md shadow-azul/20"
              }`}
              onClick={() => {
                if (confirmDisabled) return;
                onConfirm();
                onClose();
              }}
            >
              {finalConfirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};