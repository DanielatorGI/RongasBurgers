# Rongas Burgers Analytics (Demo & MVP)

Sistema web ejecutivo de analítica financiera y operativa para las sucursales de **Rongas Burgers** en León, Guanajuato. Diseñado con arquitectura limpia en 4 capas (MVC), principios SOLID, y política estricta de solo lectura en el frontend.

---

## 1. Arquitectura del Proyecto (MVC en 4 Capas)

Tanto el cliente como el servidor mock están estructurados de forma desacoplada respetando [rules.md](rules.md):

```text
├── cliente/src/
│   ├── presentacion/      # Capa 1: Vista pura (Componentes, Layout y Páginas)
│   ├── aplicacion/        # Capa 2: Controlador (Custom Hooks con estado reactivo)
│   ├── dominio/           # Capa 3: Modelo Lógico (Reglas de negocio y entidades)
│   └── infraestructura/   # Capa 4: Datos y Seguridad (clienteApi, interceptorSoloLectura, localStorage)
│
└── servidor/src/
    ├── presentacion/      # Capa 1: Rutas Express y Middleware de autenticación por claveApi
    ├── aplicacion/        # Capa 2: Controladores HTTP
    ├── dominio/           # Capa 3: Servicios de agregación y modelos de sucursal
    └── infraestructura/   # Capa 4: Base de datos SQLite (node:sqlite) y repositorios
```

---

## 2. Sucursales Preconfiguradas para Pruebas (Demo)

El sistema cuenta con 3 sucursales con datos analíticos diferenciados para 4 meses de histórico:

| Sucursal | Correo Electrónico | Contraseña | Comportamiento Clave de Prueba |
|---|---|---|---|
| **Campestre** | `campestre@rongasburgers.com` | `Campestre2026*` | **Ticket bajo $164 (< $180):** Activa alerta roja de advertencia en KPIs. |
| **Centro Max** | `centromax@rongasburgers.com` | `CentroMax2026*` | **Ticket saludable $215:** Métricas operativas estables sin alertas. |
| **Coecillo** | `coecillo@rongasburgers.com` | `Coecillo2026*` | **Alerta en Luz (+15%)** y sobrecosto en **Nómina (+18%)**. |

> *Nota:* En la pantalla de login se incluyeron accesos rápidos de un clic para autocompletar las credenciales de prueba.

---

## 3. Instrucciones de Ejecución

### Prerrequisitos
- Node.js v20+ o v24+
- npm (o npm.cmd en Windows)

### Paso 1: Iniciar el Servidor Backend Mock
```bash
cd servidor
npm install
npm run semilla    # Puebla SQLite con los esquemas y 4 meses de histórico
npm run dev        # Inicia la API en http://localhost:3001
```

### Paso 2: Iniciar el Cliente Frontend
```bash
cd cliente
npm install
npm run dev        # Inicia la aplicación React en http://localhost:5173
```

---

## 4. Reglas de Negocio y Seguridad Implementadas

1. **Solo Lectura en Cliente:** `interceptorSoloLectura.js` intercepta llamadas a `/api/inicio`, `/api/ventas`, `/api/gastos` y `/api/menu`, bloqueando métodos distintos a `GET`.
2. **Aislamiento Multitenancy:** `middlewareAutenticacion.js` en el servidor exige `x-api-key` y aísla las consultas por `sucursalId`.
3. **Caché Local de Sesión:** `gestorCacheSesion.js` almacena en `localStorage` los datos pesados para evitar consultas redundantes en la misma sesión.
4. **Límite de Líneas:** Todos los archivos se mantienen por debajo de las 120-150 líneas de código.
5. **Nomenclatura Estricta:** Todo el código en español, sin letra `ñ` ni acentos en nombres de archivos ni identificadores.
