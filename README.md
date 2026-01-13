# 📅 QuickPlan DAW - Agenda de Eventos

Proyecto de desarrollo web frontend realizado con **React** y **Vite**.
Es una aplicación para consultar, filtrar y gestionar una agenda de eventos del centro educativo (charlas, talleres, torneos, etc.).

## 🚀 Instrucciones de Ejecución

Para probar el proyecto en tu entorno local, sigue estos pasos:

1.  **Instalar las dependencias:**
    Abre la terminal en la carpeta del proyecto y ejecuta:

    ```bash
    npm install
    ```

2.  **Arrancar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

3.  **Abrir la aplicación:**
    Haz clic en el enlace que aparece en la terminal (normalmente `http://localhost:5173/`).

## ✨ Funcionalidades Principales

- **Carga de Datos:** Simulación de llamada a API (con `useEffect` y `setTimeout`) leyendo desde un archivo `JSON`.
- **Buscador Inteligente:** Filtra eventos en tiempo real por título o lugar.
- **Filtro por Categoría:** Permite visualizar solo Charlas, Talleres, Torneos o Excursiones.
- **Vista de Detalle:** Al seleccionar un evento, se muestra su información completa.
- **Gestión de Favoritos:**
  - Permite añadir eventos a una lista de favoritos.
  - Persistencia visual (el botón cambia si ya es favorito).
  - Panel de acceso rápido a favoritos en la pantalla principal.

## 🛠️ Tecnologías Utilizadas

- **React:** Uso de Hooks (`useState`, `useEffect`), componentes funcionales y renderizado condicional.
- **Vite:** Entorno de desarrollo rápido y empaquetado.
- **CSS3:** Diseño responsive utilizando CSS Grid y Flexbox. Estilos modernos y limpios.

## 👤 Autor

Proyecto realizado para el módulo de Despliegue de Aplicaciones Web (DAW).
