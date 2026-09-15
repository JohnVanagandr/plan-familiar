import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import * as api from "@/helpers/api";

export const usePaginacion = (endpoint, url = false) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Estado interno cuando Url es false
    const [paginaEstado, setPaginaEstado] = useState(1);

    // Si Url es true lee el parámetro de la URL, de lo contrario usa el estado interno
    const paginaActual = url ? Number(searchParams.get("page") || 1) : paginaEstado;

    const [items, setItems] = useState([]);
    const [paginate, setPaginate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            setLoading(true);
            setError(null);

            try {
                // Siempre envía la página como query param al backend
                const urlPeticion = `${endpoint}?page=${paginaActual}`;
                const respuesta = await api.getPaginado(urlPeticion);

                setItems(respuesta.data ?? []);
                setPaginate(respuesta.paginate ?? null);
            } catch (err) {
                console.error("Error al cargar la página:", err.details ?? err);
                setError(err.message || "No se pudo cargar la lista.");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        cargar();
    }, [endpoint, paginaActual]);

    const navegarPagina = useCallback((n) => {
        if (url) {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set("page", n);
                return next;
            });
        } else {
            // No toca setSearchParams, por ende no modifica la URL del navegador
            setPaginaEstado(n);
        }
    }, [url, setSearchParams]);

    const rangoPaginas = (() => {
        const total = paginate?.last_page ?? 1;

        if (total <= 10) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        let inicio = paginaActual === 1 ? 1 : paginaActual;
        let fin = inicio + 9;

        if (fin > total) {
            fin = total;
            inicio = total - 9;
        }

        return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
    })();

    return { 
        items, 
        paginate, 
        loading, 
        error, 
        paginaActual, 
        rangoPaginas, 
        navegarPagina, 
        hayMultiplesPaginas: (paginate?.total ?? 0) > (paginate?.per_page ?? 1), 
    };
};