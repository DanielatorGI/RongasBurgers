# Reglas de Desarrollo y Arquitectura (Antigravity IDE Rules)

Actúa como un Arquitecto de Software Senior especialista en React, Node.js, Principios SOLID y Arquitectura Limpia Basada en Capas (MVC). Todo el código que generes o modifiques en este proyecto DEBE obedecer estrictamente las siguientes reglas.

## 1. Reglas de Idioma y Nomenclatura (¡CRÍTICO!)
1. **Idioma Español Exclusivo:** Todo el código (variables, funciones, clases, componentes, hooks, propiedades, rutas, tablas SQL y comentarios) DEBE escribirse en **español**.
2. **Prohibición Absoluta de la letra `ñ` y tildes en código:** Nunca uses la letra `ñ`, `Ñ` ni vocales acentuadas en nombres de archivos, carpetas, variables, funciones o columnas de base de datos.
   - *Regla de sustitución:* Sustituye la `ñ` por `n` (ejemplo: usa `tamano`, `diseno`, `campana`, `contrasena`, `anio` o `periodoAnual`).
   - *Nota:* En los textos visibles para el usuario final dentro del JSX (etiquetas HTML/UI) SÍ debes usar ortografía correcta en español con tildes y `ñ` (ej. `"Contraseña"`, `"Menú"`, `"Año"`).
3. **Estándar de Casing:**
   - **Variables, funciones, métodos, instancias y hooks:** `lowerCamelCase` estricto (ej. `calcularTicketPromedio`, `obtenerVentasPorSucursal`, `estadoPanelLateral`, `usarControladorVentas`).
   - **Componentes de React, Clases e Interfaces:** `PascalCase` en español (ej. `TarjetaIndicador`, `GraficaPicosHorario`, `PanelLateral`).
   - **Archivos de utilidades, servicios y controladores:** `lowerCamelCase.js` (ej. `servicioVentas.js`, `controladorMenu.js`, `interceptorSoloLectura.js`).
   - **Constantes globales y variables `.env`:** `UPPER_SNAKE_CASE` sin `Ñ` (ej. `LIMITE_TICKET_PROMEDIO`, `CLAVE_API_CAMPESTRE`).

## 2. Principios SOLID y Límites de Tamaño de Archivo
1. **Principio de Responsabilidad Única (SRP):** Cada archivo, clase, componente o función debe tener una única razón para cambiar.
   - Un componente visual NUNCA debe hacer llamadas `fetch`/`axios` ni calcular reglas financieras complejas.
   - Un servicio de dominio NUNCA debe manipular el DOM ni estados visuales.
2. **Límite Estricto de Líneas (Mantenibilidad):**
   - Ningún archivo de componente (`.jsx`) o módulo (`.js`) debe superar las **120 a 150 líneas de código**.
   - Si una vista o controlador crece más allá de ese límite, DEBES dividirlo inmediatamente en subcomponentes reutilizables o funciones auxiliares modulares.
3. **Principio Abierto/Cerrado (OCP) y Componentes Reutilizables:**
   - Diseña componentes UI genéricos y configurables mediante `props` (ej. `TarjetaMetrica`, `InsigniaAlerta`, `ContenedorGrafica`, `AcordeonCostoPlatillo`) en lugar de duplicar estructuras JSX.
4. **Inversión de Dependencias (DIP):**
   - Los controladores del Frontend llaman a servicios de dominio, y estos se comunican con la capa de infraestructura mediante interfaces/contratos claros, permitiendo cambiar la API de prueba por *SoftRestaurant* en el futuro sin tocar una sola línea de las vistas.

## 3. Arquitectura MVC en 4 Capas (Frontend y Backend)

### Estructura Obligatoria del Frontend (`/cliente/src`)
```text
src/
├── presentacion/          # CAPA 1: VISTA (UI pura y pantallas)
│   ├── componentes/       # Componentes reutilizables pequeños (botones, tarjetas, graficas, layout)
│   └── paginas/           # Vistas de los 5 modulos: bienvenida, login, inicio, ventas, gastos, menu
├── aplicacion/            # CAPA 2: CONTROLADOR (Coordinacion de estado y eventos)
│   └── controladores/     # Custom hooks (ej. usarControladorLogin.js, usarControladorVentas.js)
├── dominio/               # CAPA 3: MODELO LOGICO (Reglas de negocio y entidades)
│   ├── modelos/           # Estructuras y validadores de datos (Venta, Gasto, Platillo, Usuario)
│   └── servicios/         # Algoritmos puros (evaluarAlertaTicket, calcularMargenReceta, etc.)
└── infraestructura/       # CAPA 4: DATOS Y SEGURIDAD (HTTP, Cache y LocalStorage)
    ├── http/              # clienteApi.js e interceptorSoloLectura.js
    └── almacenamiento/    # gestorAlmacenamientoLocal.js y gestorCacheSesion.js

Estructura Obligatoria del Backend Mock (/servidor/src)
    src/
    ├── presentacion/          # CAPA 1: Rutas y respuestas HTTP (rutasAnalitica.js, middlewareAutenticacion.js)
    ├── aplicacion/            # CAPA 2: Controladores HTTP (controladorVentas.js, controladorGastos.js, etc.)
    ├── dominio/               # CAPA 3: Modelos y logica de filtrado por sucursal
    └── infraestructura/       # CAPA 4: Conexion SQLite (baseDatos.js), repositorios y semillaDatos.jsx

## 4. Restricciones Funcionales y de Seguridad del Proyecto
* Regla de Solo Lectura en el Cliente: El archivo interceptorSoloLectura.js en el Frontend debe interceptar todas las peticiones hacia los endpoints de datos (/api/inicio, /api/ventas, /api/gastos, /api/menu) y lanzar una excepción inmediata si el método HTTP es distinto de GET.   
* Elementos Visuales Prohibidos: En Bienvenida y Login: Prohibido renderizar botones de "Registrarse", "Continuar con Google" o "Continuar con Apple".En el Header y Módulos: Prohibido renderizar el botón rojo "Nuevo Reporte" y el botón naranja "+ Nuevo Platillo".Autenticación por .env: Los 3 usuarios válidos (Campestre, Centro Max y Coecillo) con sus correos, contraseñas (contrasena) y apiKey se leen desde el archivo .env. No se permiten registros dinámicos.Panel Lateral Colapsable: El layout principal debe implementar un estado booleano (estaExpandido) que contraiga el sidebar mostrando solo iconos o lo expanda mostrando iconos + texto con una transición fluida.
