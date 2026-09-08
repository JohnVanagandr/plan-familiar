export const obtener = (name) => localStorage.getItem(name);
export const guardar = (name, value) => localStorage.setItem(name, value);
export const eliminar = (name) => localStorage.removeItem(name);
export const existe = () => !!localStorage.getItem("access_token");