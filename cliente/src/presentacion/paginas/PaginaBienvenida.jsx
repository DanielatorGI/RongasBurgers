import React from 'react';
import { ArrowRight } from 'lucide-react';
import LogoRongas from '../componentes/LogoRongas';

export default function PaginaBienvenida({ onIniciarSesion }) {
  return (
    <div className="min-h-screen bg-carbon-fondo flex flex-col lg:flex-row overflow-hidden">
      <section className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10 max-w-2xl">
        <header>
          <LogoRongas esModoOscuro tamano="grande" />
        </header>

        <main className="my-12 lg:my-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            Sistema Analítico de Sucursal
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Bienvenido a <br />
            <span className="text-naranja-primario">Rongas Burgers</span>
          </h2>
          <p className="mt-6 text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg">
            Gestiona tus ventas, menús y clientes de forma fácil y rápida. Visualiza el pulso financiero de tu sucursal en tiempo real.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onIniciarSesion}
              className="px-8 py-4 bg-naranja-primario hover:bg-naranja-oscuro text-stone-950 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/25 transform hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>

        <footer className="text-xs text-stone-500 flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Rongas Burgers</span>
          <span>&bull;</span>
          <span>Acceso Restringido para Gerencia</span>
        </footer>
      </section>

      <section className="flex-1 relative min-h-[350px] lg:min-h-screen bg-carbon-tarjeta overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-carbon-fondo via-transparent to-transparent z-10 opacity-90" />
        <img
          src="/imagenes/hamburguesa_hero.jpg"
          alt="Hamburguesa Artesanal Rongas Burgers"
          className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute bottom-8 right-8 z-20 hidden lg:block bg-stone-900/80 backdrop-blur-md border border-stone-800 p-4 rounded-2xl max-w-xs text-left shadow-xl">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Recetas de Autor</p>
          <p className="text-stone-200 text-sm font-medium mt-1">Carne 100% res fresca, pan brioche horneado a diario y aderezos artesanales.</p>
        </div>
      </section>
    </div>
  );
}
