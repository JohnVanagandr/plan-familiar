import { Toaster as SonnerToaster } from 'sonner';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        className: 'bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-start gap-3',
        classNames: {
          title: 'text-sm font-bold text-slate-900',
          description: 'text-xs text-slate-500 mt-0.5',
          success: 'border-l-4 border-l-emerald-500',
          error: 'border-l-4 border-l-red-500',
          info: 'border-l-4 border-l-[#0770CC]',
          warning: 'border-l-4 border-l-[#FF6600]',
        },
      }}
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-[#0770CC]" />,
        warning: <AlertTriangle className="w-5 h-5 text-[#FF6600]" />,
      }}
    />
  );
};