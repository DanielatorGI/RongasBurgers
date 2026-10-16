import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

export default function PaginaBienvenida({ onIniciarSesion }) {
  return (
    <main className="min-h-screen bg-carbon-fondo flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-carbon-tarjeta border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center">
        <header className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-naranja-primario mb-3">
            <Flame className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rongas <span className="text-naranja-primario">Burgers</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-500/80 font-medium mt-1">
            Sabor que se disfruta
          </p>
        </header>

        <section className="my-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-100">
            Bienvenido a <br />
            <span className="text-naranja-primario">Rongas Burgers</span>
          </h2>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed">
            Gestiona tus ventas, menús y clientes de forma fácil y rápida.
          </p>
        </section>

        <footer className="w-full mt-8">
          <button
            type="button"
            onClick={onIniciarSesion}
            className="w-full py-3.5 px-6 bg-naranja-primario hover:bg-naranja-oscuro text-stone-950 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Iniciar sesión</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </main>
  );
}
