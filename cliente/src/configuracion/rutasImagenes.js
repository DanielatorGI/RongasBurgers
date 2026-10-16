/**
 * =====================================================================
 * CONFIGURACION CENTRAL DE RUTAS DE IMAGENES - RONGAS BURGERS
 * =====================================================================
 * 
 * En este archivo puedes cambiar las rutas de las imagenes que se muestran
 * en toda la aplicacion. Puedes colocar tus imagenes dentro de la carpeta:
 * 
 *   /imagenes/platillos/
 *   /imagenes/banners/
 *   /imagenes/logos/
 *   /imagenes/sucursales/
 * 
 * O tambien ingresar URLs directas de internet (https://...).
 */

export const RUTAS_IMAGENES = {
  // 1. Imagenes de Banners y Fondos de Bienvenida
  banners: {
    bienvenidaHero: '/imagenes/banners/hamburguesa_hero.jpg',
    fondoPatron: '/imagenes/banners/fondo_patron.jpg'
  },

  // 2. Logotipos y Marcas
  logos: {
    logoPrincipal: '/imagenes/logos/logo_rongas.jpg',
    iconoHamburguesa: '/imagenes/logos/icono_burger.jpg',
    favicon: '/favicon.ico'
  },

  // 3. Catalogo de Imagenes de Platillos
  platillos: {
    smashBurger: '/imagenes/platillos/smash_burger.jpg',
    baconBbq: '/imagenes/platillos/bacon_bbq.jpg',
    miniBurger: '/imagenes/platillos/mini_burger.jpg',
    papasCrunch: '/imagenes/platillos/papas_crunch.jpg',
    porDefecto: '/imagenes/platillos/smash_burger.jpg'
  },

  // 4. Imagenes para Platillos Destacados (Dashboard de Inicio)
  destacados: {
    estrella: '/imagenes/platillos/smash_burger.jpg',
    perro: '/imagenes/platillos/mini_burger.jpg'
  },

  // 5. Imagenes de Sucursales
  sucursales: {
    campestre: '/imagenes/sucursales/campestre.jpg',
    centromax: '/imagenes/sucursales/centro_max.jpg',
    coecillo: '/imagenes/sucursales/coecillo.jpg'
  }
};

/**
 * Obtiene la ruta de imagen correspondiente a un platillo segun su nombre o id.
 * @param {string} nombrePlatillo - Nombre del platillo a buscar
 * @param {string} [imagenUrlDirecta] - URL opcional proveniente de base de datos
 * @returns {string} Ruta final de la imagen
 */
export function obtenerImagenPlatillo(nombrePlatillo, imagenUrlDirecta = null) {
  const nombreLimpio = String(nombrePlatillo || '').toLowerCase();

  if (nombreLimpio.includes('smash')) {
    return RUTAS_IMAGENES.platillos.smashBurger;
  }
  if (nombreLimpio.includes('bacon') || nombreLimpio.includes('bbq')) {
    return RUTAS_IMAGENES.platillos.baconBbq;
  }
  if (nombreLimpio.includes('mini')) {
    return RUTAS_IMAGENES.platillos.miniBurger;
  }
  if (nombreLimpio.includes('papa')) {
    return RUTAS_IMAGENES.platillos.papasCrunch;
  }

  return imagenUrlDirecta || RUTAS_IMAGENES.platillos.porDefecto;
}

/**
 * Obtiene la imagen para las tarjetas de platillo estrella o perro.
 * @param {'estrella'|'perro'|string} tipoDestacado 
 * @param {string} [imagenUrlDirecta]
 * @returns {string} Ruta final de la imagen
 */
export function obtenerImagenDestacada(tipoDestacado, imagenUrlDirecta = null) {
  if (tipoDestacado === 'estrella') {
    return RUTAS_IMAGENES.destacados.estrella;
  }
  if (tipoDestacado === 'perro') {
    return RUTAS_IMAGENES.destacados.perro;
  }
  return imagenUrlDirecta || RUTAS_IMAGENES.platillos.porDefecto;
}

/**
 * Obtiene la imagen de portada o fachada para una sucursal determinada.
 * @param {string} idSucursal 
 * @returns {string} Ruta final de la imagen
 */
export function obtenerImagenSucursal(idSucursal) {
  const idLimpio = String(idSucursal || '').toLowerCase();
  if (idLimpio.includes('campestre')) {
    return RUTAS_IMAGENES.sucursales.campestre;
  }
  if (idLimpio.includes('max') || idLimpio.includes('centro')) {
    return RUTAS_IMAGENES.sucursales.centromax;
  }
  if (idLimpio.includes('coecillo')) {
    return RUTAS_IMAGENES.sucursales.coecillo;
  }
  return RUTAS_IMAGENES.banners.bienvenidaHero;
}

export default RUTAS_IMAGENES;
