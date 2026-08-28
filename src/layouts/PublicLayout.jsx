import { Outlet, useMatches } from 'react-router-dom';

export const PublicLayout = () => {
  const matches = useMatches();

  // Comprueba si alguna ruta activa en el árbol tiene la propiedad hideHeader configurada
  const hideHeader = matches.some((match) => match.handle?.hideHeader);

  return (
    <div className="min-h-screen flex flex-col text-slate-900 pt-10 overflow-hidden">
      
      {/* El header se muestra u oculta dinámicamente según la ruta */}
      {!hideHeader && (
        <header className="border-b border-slate-200 py-4 px-6 flex items-center justify-between bg-white shadow-xs">
          <span className="font-bold text-lg text-slate-900">Defensa Civil Colombiana</span>
        </header>
      )}

      {/* Outlet renderizará las vistas públicas hijas */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

    </div>
  );
};