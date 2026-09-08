import { useCallback, useState } from "react";

export const useBulkSelection = (items=[], idKey="id") => {

    //el idKey es el nombre de la propiedad que se usara para identificar cada item, por defecto es "id"
    //los items es un array de objetos que se usara para generar la lista de items a seleccionar

    const [selectedIds, setSelectedIds] = useState([]);
    
    // const isSelected = useCallback((id)=>{selectedIds.includes(id)},[selectedIds])
    const isSelected = useCallback((id) => { return selectedIds.includes(id); }, [selectedIds]);
    //IsSelected es una funcion que recibe un id y devuelve true si el id esta en el array de selectedIds, false en caso contrario

    const toggleOne = useCallback((id)=>{

        setSelectedIds ((prev)=>prev.includes(id) ? prev.filter((itemId)=>itemId!==id) : [...prev, id])
    },[]);
    //ToggleOne es una funcion que recibe un id y si el id esta en el array de selectedIds lo elimina, si no esta lo agrega
    //itemId es el id del item que se quiere seleccionar o deseleccionar, y prev es el array de selectedIds antes de la actualizacion

    const allSelect = items.length > 0 && items.every((item)=>selectedIds.includes(item[idKey]));
    //AllSelect es una variable booleana que indica si todos los items estan seleccionados o no, si el array de items esta vacio devuelve false 

    const toggleSelectAll = useCallback(() => {
        setSelectedIds(allSelect ? [] : items.map((item) => item[idKey]));
    }, [items, idKey, allSelect]);
    //toggleSelectAll es una funcion que selecciona o deselecciona todos los items, si allSelect es true deselecciona todos los items, si es false selecciona todos los items

    const clearSelection = useCallback(() => setSelectedIds([]), []);
    //clearSelection es una funcion que deselecciona todos los items, es decir, vacia el array de selectecIds

    return { selectedIds, isSelected, toggleOne, toggleSelectAll, allSelect, clearSelection };
}