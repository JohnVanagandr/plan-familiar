import * as cookie from "./cookies";

const HOST = window.location.hostname;
const esLocal = HOST === "localhost" || HOST === "127.0.0.1" || /^(192\.168|10\.|172\.(1[6-9]|2[0-9]|3[0-1]))/.test(HOST);

const url = esLocal
  ? (import.meta.env.VITE_API_URL?.replace("localhost", HOST) ?? `http://${HOST}:8000/api`)
  : import.meta.env.VITE_API_URL;

export const urlStorage = esLocal
  ? (import.meta.env.VITE_STORAGE_URL?.replace("localhost", HOST) ?? `http://${HOST}:8000/storage`)
  : import.meta.env.VITE_STORAGE_URL;

let refreshing = null; // evita refrescos duplicados en paralelo

const refreshToken = async () => {
  if (!refreshing) {
    refreshing = fetch(`${url}/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: { Authorization: `Bearer ${cookie.obtener("refresh_token")}` },
    }).finally(() => { refreshing = null; });
  }
  await refreshing;
};

/**
 * Core único. Todo pasa por aquí: auth header, retry en 401, parseo de respuesta.
 * @param {string} endpoint
 * @param {object} opts
 * @param {string} opts.method
 * @param {object|FormData} opts.body
 * @param {"json"|"blob"|"none"} opts.responseType
 */
const request = async (endpoint, { method = "GET", body, responseType = "json" } = {}) => {
  const isFormData = body instanceof FormData;

  const buildOptions = () => ({
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${cookie.obtener("access_token")}`,
    },
    ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
  });

  let response = await fetch(`${url}/${endpoint}`, buildOptions());

  if (response.status === 401) {
    await refreshToken();
    response = await fetch(`${url}/${endpoint}`, buildOptions());

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "#/";
      throw new Error("Sesión expirada");
    }
  }

  if (responseType === "none") return null;
  if (responseType === "blob") return response.ok ? response.blob() : null;

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "Error en la petición");
    error.code = data?.code ?? response.status;
    error.details = data;
    throw error;
  }

  return data;
};

// ============ Wrappers ============

export const get = async (endpoint) => {
  const r = await request(endpoint);
  return r.data;
};

export const getPaginado = async (endpoint) => {
  const r = await request(endpoint);
  return { data: r.data, paginate: r.paginate };
};

export const post = (endpoint, datos) => request(endpoint, { method: "POST", body: datos });
export const put = (endpoint, datos) => request(endpoint, { method: "PUT", body: datos });
export const patch = (endpoint, datos) => request(endpoint, { method: "PATCH", body: datos });
export const del = (endpoint, datos) => request(endpoint, { method: "DELETE", body: datos });

export const bulkPost = (endpoint, datos) => request(endpoint, { method: "POST", body: datos });
export const bulkDelete = (endpoint, datos) => request(endpoint, { method: "DELETE", body: datos });

export const getPdfBlob = (endpoint) => request(endpoint, { responseType: "blob" });

export const getPdf = async (endpoint, filename = "archivo.pdf") => {
  const blob = await getPdfBlob(endpoint);
  if (!blob) return;
  const urlBlob = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(urlBlob);
};