export const PLATILLOS_BASE = [
  {
    nombre: 'Smash Burger Clásico',
    descripcion: 'Doble carne aplastada, cheddar derretido, cebolla caramelizada y salsa secreta en brioche tostado.',
    precioVenta: 180.0,
    costoTotal: 54.0,
    margenPorcentaje: 70.0,
    imagenUrl: '/imagenes/platillos/smash_burger.jpg',
    categoria: 'Hamburguesas',
    esDestacado: 1,
    tipoDestacado: 'estrella',
    unidadesVendidasMes: 1248,
    insumos: [
      { nombreInsumo: 'Carne de res (200g)', cantidadTexto: '200g', costoUnitario: 28.0 },
      { nombreInsumo: 'Pan Brioche', cantidadTexto: '1 pieza', costoUnitario: 12.0 },
      { nombreInsumo: 'Queso Cheddar (2 rebanadas)', cantidadTexto: '2 rebanadas', costoUnitario: 8.0 },
      { nombreInsumo: 'Cebolla y condimentos', cantidadTexto: '1 porcion', costoUnitario: 3.0 },
      { nombreInsumo: 'Empaque', cantidadTexto: '1 unidad', costoUnitario: 3.0 }
    ]
  },
  {
    nombre: 'Bacon BBQ Crunch',
    descripcion: 'Carne gruesa, tocino ahumado, aros de cebolla y salsa BBQ artesanal.',
    precioVenta: 210.0,
    costoTotal: 82.0,
    margenPorcentaje: 61.0,
    imagenUrl: '/imagenes/platillos/bacon_bbq.jpg',
    categoria: 'Hamburguesas',
    esDestacado: 0,
    tipoDestacado: null,
    unidadesVendidasMes: 890,
    insumos: [
      { nombreInsumo: 'Carne gruesa de res (220g)', cantidadTexto: '220g', costoUnitario: 38.0 },
      { nombreInsumo: 'Tocino ahumado (3 tiras)', cantidadTexto: '3 tiras', costoUnitario: 18.0 },
      { nombreInsumo: 'Aros de cebolla crujientes', cantidadTexto: '1 porcion', costoUnitario: 10.0 },
      { nombreInsumo: 'Salsa BBQ artesanal', cantidadTexto: '50ml', costoUnitario: 6.0 },
      { nombreInsumo: 'Pan Brioche con ajonjoli', cantidadTexto: '1 pieza', costoUnitario: 10.0 }
    ]
  },
  {
    nombre: 'Mini Burger Básica',
    descripcion: 'Carne sencilla, lechuga, tomate y mostaza en pan de hamburguesa tradicional.',
    precioVenta: 90.0,
    costoTotal: 36.0,
    margenPorcentaje: 60.0,
    imagenUrl: '/imagenes/platillos/mini_burger.jpg',
    categoria: 'Hamburguesas',
    esDestacado: 1,
    tipoDestacado: 'perro',
    unidadesVendidasMes: 180,
    insumos: [
      { nombreInsumo: 'Carne sencilla de res (100g)', cantidadTexto: '100g', costoUnitario: 16.0 },
      { nombreInsumo: 'Pan de hamburguesa estandar', cantidadTexto: '1 pieza', costoUnitario: 6.0 },
      { nombreInsumo: 'Lechuga y rodaja de tomate', cantidadTexto: '1 porcion', costoUnitario: 5.0 },
      { nombreInsumo: 'Mostaza y aderezo base', cantidadTexto: '30ml', costoUnitario: 4.0 },
      { nombreInsumo: 'Empaque biodegradable', cantidadTexto: '1 unidad', costoUnitario: 5.0 }
    ]
  },
  {
    nombre: 'Papas Crunch con Queso',
    descripcion: 'Papas fritas sazonadas con paprika y banadas en salsa de cheddar fundido.',
    precioVenta: 75.0,
    costoTotal: 22.0,
    margenPorcentaje: 71.0,
    imagenUrl: '/imagenes/platillos/papas_crunch.jpg',
    categoria: 'Snacks y Papas',
    esDestacado: 0,
    tipoDestacado: null,
    unidadesVendidasMes: 960,
    insumos: [
      { nombreInsumo: 'Papas corte fino (250g)', cantidadTexto: '250g', costoUnitario: 12.0 },
      { nombreInsumo: 'Salsa de queso cheddar', cantidadTexto: '60ml', costoUnitario: 7.0 },
      { nombreInsumo: 'Sazonador y contenedor', cantidadTexto: '1 kit', costoUnitario: 3.0 }
    ]
  }
];
