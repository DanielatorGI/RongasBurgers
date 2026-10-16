import React from 'react';
import { ArrowRight } from 'lucide-react';
import LogoRongas from '../componentes/LogoRongas';
import { RUTAS_IMAGENES } from '../../configuracion/rutasImagenes';

export default function PaginaBienvenida({ onIniciarSesion }) {
  return (
    <div className="h-screen max-h-screen w-full bg-carbon-fondo flex flex-col lg:flex-row overflow-hidden select-none">
      <section className="w-full lg:w-1/2 xl:w-5/12 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 z-10 overflow-hidden">
        <header>
          <LogoRongas esModoOscuro tamano="normal" />
        </header>

        <main className="my-auto py-2">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3 tracking-wide uppercase">
            Sistema Analítico de Sucursal
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
            Bienvenido a <br />
            <span className="text-naranja-primario">Rongas Burgers</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-stone-300 text-sm sm:text-base leading-relaxed max-w-md">
            Gestiona tus ventas, menús y clientes de forma fácil y rápida. Visualiza el pulso financiero de tu sucursal en tiempo real.
          </p>

          <div className="mt-5 sm:mt-7 flex items-center gap-4">
            <button
              type="button"
              onClick={onIniciarSesion}
              className="px-7 py-3.5 bg-naranja-primario hover:bg-naranja-oscuro text-stone-950 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/25 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </main>

        <footer className="text-[11px] sm:text-xs text-stone-500 flex items-center gap-3 pt-2">
          <span>&copy; {new Date().getFullYear()} Rongas Burgers</span>
          <span>&bull;</span>
          <span>Acceso Restringido para Gerencia</span>
        </footer>
      </section>

      <section className="flex-1 relative h-full bg-carbon-tarjeta overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-carbon-fondo via-transparent to-transparent z-10 opacity-90 pointer-events-none" />
        <img
          src={RUTAS_IMAGENES.banners.bienvenidaHero}
          alt="Hamburguesa Artesanal Rongas Burgers"
          className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute bottom-6 right-6 z-20 hidden lg:block bg-stone-900/80 backdrop-blur-md border border-stone-800 p-3.5 rounded-2xl max-w-xs text-left shadow-xl">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Recetas de Autor</p>
          <p className="text-stone-200 text-xs font-medium mt-1">Carne 100% res fresca, pan brioche horneado a diario y aderezos artesanales.</p>
        </div>
      </section>
    </div>
  );
}
