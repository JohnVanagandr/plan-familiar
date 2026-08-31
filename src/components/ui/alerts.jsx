import React, { useEffect, useState } from "react";

export const Alert = ({
    icon = 'ri-checkbox-circle-fill',
    text = '',
    variant = 'success',
    isVisible = false,
    onClose = () => {},
    onConfirm = () => {},
    onCancel = () => {},
    autoClose = true,
    confirmText,
    cancelText,
    className = '',
    consentText = '', // 🔹 texto largo de tratamiento de datos (solo para variant="consent")
    checkboxLabel = 'He leído y acepto el tratamiento de mis datos personales',
} = {}) => {

    const actionVariants = ['confirm', 'yesno', 'consent'];
    const isActionVariant = actionVariants.includes(variant);
    const isConsent = variant === 'consent';

    const [aceptado, setAceptado] = useState(false);

    // Reinicia el checkbox cada vez que se abre/cierra el modal
    useEffect(() => {
        setAceptado(false);
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible || !autoClose || isActionVariant) return;
        const timer = setTimeout(() => onClose(), 5000);
        return () => clearTimeout(timer);
    }, [isVisible, autoClose, isActionVariant, onClose]);

    if (!isVisible) return null;

    const clasesBase = "size-full fixed inset-0 z-100 flex items-center justify-center bg-(--color_blanco)/40 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]";

    const variants = {
        success: "text-green-700",
        confirm: "text-(--blue)",
        yesno:   "text-(--blue)",
        consent: "text-(--blue)",
        error:   "text-red-700",
    };

    const defaultTexts = {
        confirm: { confirm: 'Confirmar', cancel: 'Cancelar' },
        yesno:   { confirm: 'Sí', cancel: 'No' },
        consent: { confirm: 'Aceptar y continuar', cancel: 'Cancelar' },
    };

    const finalConfirmText = confirmText ?? defaultTexts[variant]?.confirm ?? 'Confirmar';
    const finalCancelText = cancelText ?? defaultTexts[variant]?.cancel ?? 'Cancelar';

    const selectedVariant = variants[variant] || variants.success;
    const finalClasses = `${clasesBase} ${className}`.trim();

    // El botón de continuar solo se habilita si es consent Y ya marcó el checkbox
    const confirmDisabled = isConsent && !aceptado;

    return (
        <div className={finalClasses} onClick={!isActionVariant ? onClose : undefined}>

            <div
                className={`relative flex w-[90%] ${isConsent ? 'max-w-lg' : 'max-w-sm'} flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-2xl animate-[popUp_0.3s_ease-out]`}
                onClick={(e) => e.stopPropagation()}
            >

                <img src="../../public/svg/ilustracion_ave_a.svg" alt="" className="absolute -top-10 w-[100px] -left-5"/>
                <img src="../../public/svg/ilustracion_ave_b.svg" alt="" className="absolute -bottom-5 w-[100px] -right-15 text-green-700"/>

                <i className={`${icon} text-6xl ${selectedVariant} animate-[iconPop_0.5s_ease-out]`}></i>

                <span className="text-center text-lg font-bold text-gray-800">
                    {text}
                </span>

                {isConsent && (
                    <>
                        <div className="w-full max-h-48 overflow-y-auto text-left text-sm text-gray-600 border border-(--grey) rounded-2xl p-4 leading-relaxed">
                            {consentText}
                        </div>

                        <label className="flex items-start gap-2 w-full text-left text-sm text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={aceptado}
                                onChange={(e) => setAceptado(e.target.checked)}
                                className="mt-1"
                            />
                            <span>{checkboxLabel}</span>
                        </label>
                    </>
                )}

                {isActionVariant && (

                    <div className="flex w-full gap-3 mt-2">

                        <button
                            type="button"
                            className="flex-1 rounded-2xl border border-(--grey) py-4 font-bold text-gray-600"
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
                            className={`flex-1 rounded-2xl rounded-2 font-bold text-white transition-opacity ${
                                confirmDisabled
                                    ? 'bg-(--grey) cursor-not-allowed opacity-60'
                                    : 'bg-(--blue)'
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
}