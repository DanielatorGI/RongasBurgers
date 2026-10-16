# Contexto del Proyecto: Rongas Burgers Analytics (Demo & MVP)

## 1. Visión General del Sistema
**Rongas Burgers Analytics** es un sistema web ejecutivo de "rayos X financieros" diseñado para las sucursales de *Rongas Burgers* en León, Guanajuato[cite: 11]. Su objetivo es transformar los datos operativos en indicadores clave de rendimiento (KPIs) visuales, minimalistas y de lectura instantánea (menos de 5 segundos)[cite: 10, 11].

Para efectos de esta versión (Demo Funcional), en lugar de conectarse a una instalación en vivo de *SoftRestaurant*[cite: 9, 10, 11], el sistema cuenta con un **API REST de Prueba (Mock API)** con base de datos local en **SQLite**, alimentada mediante un script automatizado de inyección de datos (*Seed*) que simula la operación real de **3 sucursales independientes**.

## 2. Reglas de Oro del Negocio y Seguridad
1. **Política Estricta de Solo Lectura (GET Only):** El cliente Frontend tiene estrictamente prohibido mutar datos operativos[cite: 9, 10, 11]. Cuenta con un `interceptorHttp` que bloquea por código cualquier petición `POST`, `PUT`, `PATCH` o `DELETE` hacia los endpoints de datos analíticos[cite: 9, 10, 11]. *(Nota: En esta versión no existen los botones de "Nuevo Reporte" ni "+ Nuevo Platillo")*.
2. **Aislamiento Total por Sucursal (Multitenancy por API Key):** Cada sucursal posee sus propias credenciales y su `apiKey` asignada en las variables de entorno (`.env`)[cite: 9, 10, 11]. El gerente de una sucursal jamás puede consultar datos de otra[cite: 11].
3. **Autenticación Cerrada (Sin Registro Público):** No existe registro de usuarios nuevos ni inicio de sesión con redes sociales (Google/Apple). Únicamente pueden iniciar sesión los **3 usuarios preconfigurados en el `.env`**:
   - **Sucursal Campestre**[cite: 10, 11]
   - **Sucursal Centro Max**[cite: 10, 11]
   - **Sucursal Coecillo**
4. **Caché de Sesión Local:** Los datos pesados precalculados (como el análisis de menú y recetas) se almacenan en `localStorage` (encriptados/serializados) al consultar el módulo por primera vez para evitar peticiones redundantes en la misma sesión[cite: 9, 10, 11].

## 3. Stack Tecnológico
### Frontend (Cliente Ligero)
- **Framework:** React + Vite.
- **Estilos:** TailwindCSS (paleta cálida crema/naranja/negro/rojo acorde al diseño de Figma)[cite: 1, 2, 3, 4, 5, 6, 7, 8].
- **Gráficas:** Recharts (o Chart.js) para gráficas de área, barras y líneas suavizadas[cite: 3, 4, 5, 6, 9, 10, 11].
- **Iconografía:** Lucide React.
- **Almacenamiento Local:** `localStorage` con cifrado ligero para sesión, `apiKey` y caché de módulos[cite: 9, 10, 11].

### Backend (API de Prueba para Demo)
- **Entorno:** Node.js + Express.
- **Base de Datos:** SQLite3 (archivo local `.sqlite` autogestionado).
- **Inyección de Datos:** Script ejecutable (`semillaDatos.js`) que crea las tablas e inyecta los registros diferenciados para las 3 sucursales.

## 4. Arquitectura: MVC Basado en 4 Capas
Tanto el Frontend como el Backend respetan el patrón **Modelo-Vista-Controlador (MVC)** desacoplado en **4 capas estrictas**:
1. **Capa de Presentación (Vista):** Pantallas y componentes UI reutilizables ("tontos"/presentacionales) libres de lógica de negocio.
2. **Capa de Aplicación (Controlador):** Hooks personalizados / Controladores que coordinan los eventos del usuario y comunican la Vista con el Dominio.
3. **Capa de Dominio (Modelo Lógico):** Servicios de negocio puros (evaluación de alertas de ticket < \$180, alertas de consumo/nómina, cálculo de márgenes de recetas)[cite: 4, 6, 7, 8, 9, 10, 11] y definición de modelos/entidades.
4. **Capa de Infraestructura (Datos):** Cliente HTTP, `interceptorSoloLectura`, adaptadores de `localStorage` y (en el backend) repositorios SQLite[cite: 9, 10].

## 5. Especificación de Módulos y Pantallas (Fidelidad Figma)

### Módulo 1: Autenticación (`login`)
- **Vista de Bienvenida (Hero):** Pantalla dividida en fondo oscuro con branding de *Rongas Burgers* ("Sabor que se disfruta"), imagen destacada de hamburguesa y un único botón de acción: `"Iniciar sesión ->"` (sin botón de registrarse)[cite: 1].
- **Vista de Formulario de Login:** Tarjeta centrada sobre fondo crema con campos de `Correo electronico`, `Contrasena` (con toggle de visibilidad), checkbox `Recordarme` y botón naranja `"Entrar"` (sin botones de Google, Apple ni enlace de registro)[cite: 2]. Valida contra los 3 perfiles del `.env` y guarda la `apiKey` de la sucursal activa[cite: 9, 10, 11].

### Layout Principal (Navegación Global)
- **Panel Lateral (Sidebar Colapsable):** Menú izquierdo que se expande y se contrae mediante el botón superior junto al título de la vista[cite: 3, 4, 5, 6, 7, 8]. Contiene los accesos a: `Inicio`, `Ventas`, `Gastos` y `Menu` (además de cerrar sesión)[cite: 3].
- **Cabecera Superior (Header):** Muestra el botón para contraer/expandir el panel lateral y el título del módulo activo (sin el botón "Nuevo Reporte")[cite: 3, 4, 5, 6, 7, 8].

### Módulo 2: Inicio (`home` - Panel de Control)
- **Gráfica de Ingresos Mensuales:** Gráfica de área suavizada en tonos naranjas con la evolución anual (Ene - Dic)[cite: 3].
- **Gráfica de Ventas por Categoría:** Gráfica de barras comparativa[cite: 3].
- **Tarjetas Destacadas de Matriz de Menú (Columna Derecha):** Tarjetas visuales con fotografía del platillo, insignia superior (*"⭐ Plato Estrella"* en rojo/rosa o *"🐶 Plato Perro"* en café), título, descripción breve y conteo de unidades vendidas en el mes[cite: 3].

### Módulo 3: Ventas (`ventas` - El Pulso Diario)
- **Selector de Periodo:** Botones de filtro rápido: `Hoy`, `Esta semana`, `Este mes`[cite: 4, 10, 11].
- **Fila Superior de KPIs (4 Tarjetas):**
  1. *Venta Bruta:* Monto total cobrado[cite: 4, 10, 11].
  2. *Venta Neta:* Monto después de descuentos e insumos[cite: 4, 10, 11].
  3. *Ticket Promedio:* Monto promedio[cite: 4, 10, 11]. **Regla de negocio:** Si es menor a `$180 MXN`, la tarjeta resalta su borde y muestra un badge rojo de alerta: `"⚠️ Ticket bajo $180 — empujar papas y refrescos"`[cite: 4, 11].
  4. *Comparativa vs. Mismo día semana anterior:* Porcentaje de variación (`+10.3%`) con badge verde o rojo según incremento o decremento[cite: 4, 9, 10, 11].
- **Fila Media de Afluencia (2 Tarjetas Anchas):**
  1. *Mesas atendidas:* Conteo de turnos completados con barra segmentada de capacidad estimada (ej. ~50 mesas/día)[cite: 4].
  2. *Comensales atendidos:* Total de personas, promedio por mesa y 3 sub-bloques: `Pico mediodia`, `Pico noche` y `Valle tarde`[cite: 4].
- **Sección Inferior - Picos de Venta por Hora:**
  - Gráfica de línea curva comparando `Hoy` vs `Semana anterior` de `8am` a `10pm`, marcando con líneas verticales punteadas los momentos de `"Rush 🔥"` (ej. 1pm y 7pm) y tooltip interactivo[cite: 5].
  - 3 Tarjetas de resumen horario al pie: `Rush mediodia (12pm - 2pm)`, `Rush nocturno (6pm - 8pm)` y `Valle tarde (3pm - 5pm)`[cite: 5].

### Módulo 4: Gastos (`gastos` - Control Operativo)
- **Fila Superior de Categorías (4 Tarjetas):**
  1. *Sueldos (Nómina):* Monto y comparativa contra mes anterior (con alerta si supera proporción saludable)[cite: 6, 9, 10, 11].
  2. *Renta:* Monto fijo mensual[cite: 6, 9, 10, 11].
  3. *Agua:* Monto y variación porcentual[cite: 6, 9, 10, 11].
  4. *Luz (y Servicios):* Monto con alerta visual en color rojo cuando existe sobreconsumo (ej. `"+15% (Alerta de consumo)"`)[cite: 6].
- **Sección Inferior - Histórico de Gastos:** Gráfica de barras oscuras con el desglose de gastos de los últimos 6 meses[cite: 6].

### Módulo 5: Menú (`menu` - Gestión e Ingeniería de Menú)
- **Encabezado de Sección:** Título `"Gestión de Menú - Análisis de costos e ingredientes por platillo"` (sin el botón "+ Nuevo Platillo")[cite: 7, 8].
- **Lista de Tarjetas Horizontales de Platillos:**
  - Cada tarjeta muestra la fotografía a la izquierda, nombre del platillo, descripción de ingredientes y el `Precio de Venta` a la derecha[cite: 7, 8].
  - **Acordeón de Desglose de Costos (Receta):** Barra interactiva colapsable que muestra en su cabecera el `Costo Total` (en rojo/rosa) y el `Margen` en porcentaje (ej. `70%`)[cite: 7, 8].
  - Al expandir el acordeón, despliega la explosión de insumos línea por línea (ej. *Carne de res 200g, Pan Brioche, Queso Cheddar, Cebolla y condimentos, Empaque*) con su costo individual y el `Costo Total por Unidad` al final[cite: 8, 10, 11].