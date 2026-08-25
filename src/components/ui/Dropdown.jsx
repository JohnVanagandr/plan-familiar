import { useState, useRef, useEffect } from 'react';

export const Dropdown = ({
  trigger,
  items = [],
  align = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el dropdown al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignmentClasses = align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      
      {/* Elemento disparador con cursor-pointer forzado */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex items-center">
        {trigger}
      </div>

      {/* Panel Desplegable con animaciones suaves */}
      <div 
        className={`absolute mt-2 w-56 bg-white border border-slate-200 shadow-2xl shadow-slate-900/10 rounded-2xl p-2 transition-all duration-300 ease-out z-50 ${alignmentClasses} ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        {items.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            
            {/* Cabecera opcional dentro del menú */}
            {section.header && (
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{section.header.title}</p>
                {section.header.subtitle && (
                  <p className="text-[10px] text-slate-500">{section.header.subtitle}</p>
                )}
              </div>
            )}

            {/* Opciones del menú */}
            <div className="space-y-1">
              {section.options.map((opt, optIdx) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setIsOpen(false);
                      if (opt.onClick) opt.onClick();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                      opt.danger 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0770CC]'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divisor entre secciones si hay más de una */}
            {sectionIdx < items.length - 1 && <div className="my-1 border-t border-slate-100" />}
          </div>
        ))}
      </div>
    </div>
  );
};