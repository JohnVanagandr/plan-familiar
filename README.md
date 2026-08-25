## Reglas de Contribución y Flujo de Trabajo (Git Flow)

Para garantizar la calidad, el orden y la escalabilidad del proyecto, es **obligatorio** adherirse a las siguientes políticas. **Está estrictamente prohibido solicitar un Pull Request (PR) sin la documentación correspondiente.**

### 1. Nomenclatura Estricta de Ramas
Todo cambio debe desarrollarse y subirse a su respectiva rama respetando la nomenclatura definida. No se permite el desarrollo directo sobre las ramas principales.

*   **`main`**: Rama de producción o código estable (Bloqueada para commits directos).
*   **`develop`**: Rama de integración y desarrollo principal.
*   **`feat/`** o **`feature/`**: Para desarrollo de nuevas funcionalidades (ej. `feat/plan-workspace`).
*   **`fix/`**: Para la solución de errores o bugs (ej. `fix/sidebar-routing`).
*   **`refactor/`**: Para reestructuración y mejora de código existente sin alterar su comportamiento final (ej. `refactor/login-schemas`).
*   **`docs/`**: Para creación o actualización exclusiva de documentación (ej. `docs/api-endpoints`).
*   **`style/`**: Para ajustes de UI, diseño, formateo de código o linting (ej. `style/button-variants`).

### 2. Convención de Commits (Conventional Commits)
Debemos mantener un historial limpio y predecible. Todos los mensajes de commit deben seguir el estándar basado en el propósito exacto del cambio:

*   **`feat:`** (Nueva funcionalidad o característica).
*   **`fix:`** (Solución de un error).
*   **`docs:`** (Cambios únicamente en la documentación).
*   **`style:`** (Cambios de formato, espacios, CSS, que no afectan la lógica del código).
*   **`refactor:`** (Refactorización de código sin añadir funcionalidades ni arreglar bugs).
*   **`test:`** (Adición o corrección de pruebas).
*   **`chore:`** (Actualización de dependencias, configuración de herramientas, mantenimiento).

> **Ejemplo de commit válido:** `feat(plans): integrar formulario de datos principales al workspace`

### 3. Políticas Inquebrantables de Pull Requests (PR)
1.  **Documentación Obligatoria:** Un PR sin descripción detallada será rechazado. Todo PR debe estar documentado explicando el "qué" y el "por qué", y debe reflejar fielmente la suma de los commits que contiene.
2.  **Responsabilidad Única:** Todo cambio se debe subir a su respectiva rama bajo la nomenclatura correspondiente. No mezcles la solución de un bug (`fix`) con una nueva funcionalidad (`feat`) en el mismo PR.
3.  **Verificación Previa:** Antes de abrir el PR, el código debe compilar correctamente en local y no romper flujos existentes.

---

### Pasos para iniciar una contribución:

1. Asegúrate de estar en `develop` y tener la última versión sincronizada:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Crea tu rama respetando la nomenclatura según el tipo de tarea:
   ```bash
   git checkout -b feat/nombre-de-tu-funcionalidad
   ```
3. Realiza tus cambios y haz tus commits siguiendo la convención (feat:, fix:, style:, etc.).
4. Sube la rama al repositorio remoto y abre tu Pull Request adjuntando la documentación requerida.