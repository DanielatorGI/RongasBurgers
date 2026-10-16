## Fase 1: Cimientos del Proyecto, Configuración y Entorno (`.env`)
El objetivo de esta fase es inicializar el monorepo/estructura cliente-servidor, configurar las variables de entorno para las 3 sucursales y establecer las carpetas de la arquitectura en 4 capas.

- [x] **Commit 1.1:** `chore(estructura): inicializar proyectos cliente (React+Vite+Tailwind) y servidor (Node+Express+SQLite)`
  - Creación de directorios `/cliente` y `/servidor`.
  - Instalación de dependencias base (TailwindCSS, Recharts, Lucide-React en cliente; Express, SQLite3, Cors, Dotenv en servidor).
- [x] **Commit 1.2:** `config(entorno): configurar plantillas .env con los 3 usuarios y claves api por sucursal`
  - Definición de credenciales (`correo`, `contrasena`, `claveApi`, `nombreSucursal`) para **Sucursal Campestre**, **Sucursal Centro Max** y **Sucursal Coecillo**.
- [x] **Commit 1.3:** `arch(capas): crear estructura de directorios MVC en 4 capas para cliente y servidor`
  - Creación de las carpetas `presentacion`, `aplicacion`, `dominio` e `infraestructura` en ambos entornos respetando `rules.md`.

---

## Fase 2: API de Prueba (Backend MVC + SQLite + Script Seed)
Construcción del servidor local que simulará los endpoints de *SoftRestaurant*[cite: 9, 10, 11], aislando la información según la `claveApi` de la sucursal autenticada[cite: 9, 10, 11].

- [x] **Commit 2.1:** `feat(bd): implementar conexion sqlite y esquemas de tablas en capa de infraestructura`
  - Creación de tablas: `sucursales`, `resumenesVentas`, `ventasPorHora`, `ventasMensuales`, `ventasPorCategoria`, `gastosOperativos`, `historicoGastos`, `platillosMenu` e `insumosReceta`.
- [x] **Commit 2.2:** `feat(semilla): crear script semillaDatos.js para inyectar datos realistas de las 3 sucursales`
  - Script ejecutable que limpia y puebla la base de datos con métricas distintas para *Campestre* (ej. ticket bajo \$164 para probar alerta roja)[cite: 4], *Centro Max* (ticket saludable > \$180) y *Coecillo* (alerta en consumo de luz/nómina)[cite: 6, 9, 10, 11] con 4 meses de histórico.
- [x] **Commit 2.3:** `feat(seguridadApi): implementar middleware de validacion de usuarios y aislamiento por claveApi`
  - Endpoint de validación de sesión contra los 3 usuarios del `.env` y middleware que filtra todas las consultas SQL por `sucursalId` según el header `x-api-key`[cite: 9, 10, 11].
- [x] **Commit 2.4:** `feat(endpointsApi): construir repositorios, servicios y controladores GET para inicio, ventas, gastos y menu`
  - Exposición de rutas exclusivamente `GET` para alimentar los 4 módulos analíticos[cite: 9, 10, 11].

---

## Fase 3: Infraestructura Frontend, Seguridad Local y Módulo de Login
Implementación del blindaje de solo lectura en el cliente, almacenamiento local encriptado y pantallas de acceso[cite: 1, 2, 9, 10, 11].

- [x] **Commit 3.1:** `feat(seguridadCliente): implementar interceptorSoloLectura y gestorAlmacenamientoLocal`
  - Creación del cliente HTTP que bloquea cualquier método distinto a `GET` en consultas de datos[cite: 9, 10, 11], junto con el cifrado de sesión y el `gestorCacheSesion` en `localStorage`[cite: 9, 10, 11].
- [x] **Commit 3.2:** `feat(loginDominio): crear modelo de sesion y controlador usarControladorLogin`
  - Lógica de autenticación, guardado de `claveApi` activa y redirección protegida[cite: 9, 10, 11].
- [x] **Commit 3.3:** `feat(loginVista): maquetar pantalla de Bienvenida (Hero) y formulario de Iniciar Sesion`
  - Replicación fiel del diseño de Figma eliminando los botones de `"Registrarse"`, `"Google"` y `"Apple"`[cite: 1, 2].

---

## Fase 4: Layout Global y Componentes Visuales Reutilizables (SOLID)
Construcción del esqueleto visual de la aplicación y las piezas atómicas reutilizables para evitar archivos extensos.

- [x] **Commit 4.1:** `feat(layout): construir PanelLateral colapsable y CabeceraSuperior sin boton de reporte`
  - Implementación del sidebar que se expande y contrae dinámicamente (`Inicio`, `Ventas`, `Gastos`, `Menu`) y barra superior limpia[cite: 3, 4, 5, 6, 7, 8].
- [x] **Commit 4.2:** `feat(componentesBase): crear componentes reutilizables TarjetaMetrica, InsigniaEstado y ContenedorGrafica`
  - Componentes presentacionales puros (< 80 líneas cada uno) preparados para recibir variantes de alerta (rojo, verde, crema)[cite: 3, 4, 5, 6, 7, 8].

---

## Fase 5: Módulo de Inicio (`Panel de Control`)
Desarrollo de la vista ejecutiva inicial tras iniciar sesión[cite: 3].

- [x] **Commit 5.1:** `feat(inicio): implementar servicio, controlador y componentes de graficas para el Panel de Control`
  - Gráfica de área `GraficaIngresosMensuales` (Ene-Dic) y gráfica de barras `GraficaVentasCategoria`[cite: 3].
- [x] **Commit 5.2:** `feat(inicioDestacados): crear componente TarjetaPlatilloDestacado (Plato Estrella y Plato Perro)`
  - Renderizado de la columna derecha con imagen, insignia de clasificación y unidades vendidas al mes[cite: 3].

---

## Fase 6: Módulo de Ventas (`El Pulso Diario`)
Implementación de KPIs operativos, reglas de negocio del ticket promedio, afluencia y curva de horas pico ("Rush")[cite: 4, 5, 9, 10, 11].

- [ ] **Commit 6.1:** `feat(ventasDominio): programar reglas evaluarAlertaTicket (< 180) y calcularComparativaSemanal`
  - Servicios de dominio puros que evalúan los datos recibidos del API y determinan los estados de alerta[cite: 4, 9, 10, 11].
- [ ] **Commit 6.2:** `feat(ventasTarjetas): construir selector de periodo (Hoy/Semana/Mes), fila de 4 KPIs y tarjetas de Afluencia`
  - Maquetación de `Venta Bruta`, `Venta Neta`, `Ticket Promedio` (con alerta roja activa si < \$180), `Comparativa`, `Mesas atendidas` (con barra segmentada) y `Comensales atendidos` (con bloques de mediodía, noche y valle)[cite: 4].
- [ ] **Commit 6.3:** `feat(ventasPicos): implementar GraficaPicosHora con indicadores de Rush y tarjetas de resumen horario`
  - Gráfica de líneas curva (`8am` a `10pm`) comparando hoy vs semana anterior, líneas punteadas de `"Rush 🔥"` y las 3 tarjetas inferiores (`Rush mediodia`, `Rush nocturno`, `Valle tarde`)[cite: 5].

---

## Fase 7: Módulo de Gastos (`Control Operativo`)
Seguimiento de egresos categorizados, alertas de consumo/nómina e histórico semestral[cite: 6, 9, 10, 11].

- [ ] **Commit 7.1:** `feat(gastosDominio): implementar servicio de agrupacion de gastos y evaluador de alertas de consumo/nomina`
  - Lógica para evaluar variaciones porcentuales y activar banderas rojas de alerta[cite: 6, 9, 10, 11].
- [ ] **Commit 7.2:** `feat(gastosVista): construir tarjetas de Sueldos, Renta, Agua, Luz y GraficaHistoricoGastos`
  - Renderizado de las 4 tarjetas superiores y la gráfica de barras oscuras de los últimos 6 meses[cite: 6].

---

## Fase 8: Módulo de Menú (`Gestión de Menú y Costeo de Recetas`)
Visualización de platillos, márgenes de ganancia, caché en `localStorage` y explosión de insumos desplegable[cite: 7, 8, 9, 10, 11].

- [ ] **Commit 8.1:** `feat(menuDominio): integrar gestorCacheSesion en servicioMenu y calculo de margenes por receta`
  - Garantiza que al abrir el módulo de Menú los datos se guarden en caché local para no repetir llamadas HTTP en la misma sesión[cite: 9, 10, 11].
- [ ] **Commit 8.2:** `feat(menuVista): construir TarjetaPlatilloMenu con acordeon desplegable de Desglose de Costos`
  - Lista de platillos sin botón de "+ Nuevo Platillo", mostrando imagen, precio de venta, barra de `Costo Total` y `Margen %`, y lista desplegable con el costo individual de cada ingrediente y empaque[cite: 7, 8].

---

## Fase 9: Pruebas de Integración Multi-Sucursal y Pulido Final
Verificación de las reglas arquitectónicas antes de la presentación de la Demo.

- [ ] **Commit 9.1:** `test(integracion): validar cambio de sesion entre las 3 sucursales y persistencia de cache`
  - Verificación de que al entrar con el usuario de *Campestre*, *Centro Max* y *Coecillo* cambien todos los indicadores y gráficas, y que el `interceptorSoloLectura` cumpla su función[cite: 9, 10, 11].
- [ ] **Commit 9.2:** `refactor(solid): auditar limite de lineas por archivo y nomenclatura lowerCamelCase sin letra n con tilde`
  - Revisión final de código contra `rules.md` y documentación de ejecución en `README.md`.