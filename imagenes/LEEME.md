# 📸 Carpeta de Imágenes - Rongas Burgers

¡Bienvenido! En esta carpeta puedes colocar y organizar todas las imágenes que desees utilizar en el sistema.

---

## 📁 Estructura de Carpetas

* **`platillos/`**: Coloca aquí las fotografías de las hamburguesas, papas, bebidas y acompañamientos del menú.
  * *Ejemplos actuales:* `smash_burger.jpg`, `bacon_bbq.jpg`, `mini_burger.jpg`, `papas_crunch.jpg`.
* **`banners/`**: Coloca aquí imágenes panorámicas, portadas de bienvenida y fondos decorativos.
  * *Ejemplos actuales:* `hamburguesa_hero.jpg`, `fondo_patron.jpg`.
* **`logos/`**: Coloca aquí el logotipo oficial de Rongas Burgers (en formato `.png` con fondo transparente o `.svg`).
* **`sucursales/`**: Coloca aquí fotografías o emblemas de las sucursales (`campestre.jpg`, `centro_max.jpg`, `coecillo.jpg`).

---

## ⚙️ ¿Cómo cambiar una imagen en la aplicación?

Para cambiar cualquier imagen o asignar una nueva, solo abre el archivo:
📄 **`cliente/src/configuracion/rutasImagenes.js`**

Y modifica la ruta correspondiente con el nombre de tu archivo. Por ejemplo:
```javascript
platillos: {
  smashBurger: '/imagenes/platillos/mi_nueva_hamburguesa.jpg',
  // ...
}
```

¡Toda la aplicación tomará los cambios de inmediato!
