import { Badge } from '@/components/ui';

export const DashboardHeader = ({ 
  badgeText, 
  badgeVariant = "primary", 
  title, 
  description,
  children
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {title}
        </h2>
        {description && (
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>
      
      {/* Contenedor derecho dinámico (ej: botón de "Agregar Miembro") */}
      {children && (
        <div className="shrink-0 w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};