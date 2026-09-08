// components/BulkActionsBar.jsx
import { useState } from "react";
import { Button, Alert } from "@/components/ui";
import { X } from "lucide-react";

export const BulkActionsBar = ({ count, onClear, actions, selectedIds, onDone }) => {

  const [pendingAction, setPendingAction] = useState(null);
  const [loading, setLoading] = useState(false);

  if (count === 0) return null;

  const ejecutar = async () => {
    if (!pendingAction) return;
    setLoading(true);
    try {
      const resultado = await pendingAction.request(selectedIds);
      if (!resultado?.success) {
        console.error(resultado?.message || `No se pudo completar "${pendingAction.label}"`);
      }
    } catch (e) {
      console.error(`Error inesperado ejecutando "${pendingAction.label}"`, e);
    } finally {
      setLoading(false);
      setPendingAction(null);
      onDone();
    }
  };

  return (
    <>
      <div className=" bottom-6 z-40 bg-white rounded-full shadow-xl border border-slate-200 flex items-center gap-3 px-4 py-2">
        <button onClick={onClear} className="text-slate-400 hover:text-slate-600">
          <X className="size-4" />
        </button>
        <span className="text-sm text-slate-600 font-medium">Seleccionados: {count}</span>
        <div className="flex gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.key}
                variant={action.variant}
                size="sm"
                onClick={() => setPendingAction(action)}
                disabled={loading}
              >
                <Icon className="size-4" /> {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Alert
        isVisible={!!pendingAction}
        variant="confirm"
        text={pendingAction?.confirmText(count) ?? ""}
        confirmText={pendingAction?.label}
        onConfirm={ejecutar}
        onCancel={() => setPendingAction(null)}
        onClose={() => setPendingAction(null)}
      />
    </>
  );
};