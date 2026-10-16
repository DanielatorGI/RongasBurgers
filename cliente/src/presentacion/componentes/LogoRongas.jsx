import React from 'react';
import { RUTAS_IMAGENES } from '../../configuracion/rutasImagenes';

export default function LogoRongas({
  esModoOscuro = false,
  mostrarEslogan = true,
  tamano = 'normal'
}) {
  const tamanoIcono = tamano === 'grande' ? 'w-12 h-12 sm:w-14 sm:h-14' : tamano === 'pequeno' ? 'w-8 h-8' : 'w-10 h-10';
  const tamanoTitulo = tamano === 'grande' ? 'text-2xl sm:text-3xl' : tamano === 'pequeno' ? 'text-base' : 'text-xl';
  const logoPersonalizado = RUTAS_IMAGENES.logos?.logoPrincipal;

  return (
    <div className="flex items-center gap-3">
      <div className={`${tamanoIcono} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-105 shadow-sm ${
        logoPersonalizado
          ? 'overflow-hidden'
          : esModoOscuro
          ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shadow-amber-500/10'
          : 'bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/25 text-naranja-primario shadow-amber-500/5'
      }`}>
        {logoPersonalizado ? (
          <img
            src={logoPersonalizado}
            alt="Logo Rongas Burgers"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <svg viewBox="0 0 24 24" className="w-3/5 h-3/5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 4.5 2 7.5C2 8.3 2.5 9 3.3 9.6C3.1 9.9 3 10.3 3 10.7C3 11.4 3.6 12 4.3 12H19.7C20.4 12 21 11.4 21 10.7C21 10.3 20.9 9.9 20.7 9.6C21.5 9 22 8.3 22 7.5C22 4.5 17.52 2 12 2Z" fill="#F59E0B" />
            <path d="M4 13.5C4 13.2 4.2 13 4.5 13H19.5C19.8 13 20 13.2 20 13.5C20 14.3 19.3 15 18.5 15H5.5C4.7 15 4 14.3 4 13.5Z" fill="#E11D48" />
            <path d="M2.5 16C2.5 15.7 2.7 15.5 3 15.5H21C21.3 15.5 21.5 15.7 21.5 16C21.5 19.3 17.2 22 12 22C6.8 22 2.5 19.3 2.5 16Z" fill="#D97706" />
          </svg>
        )}
      </div>
      <div>
        <h1 className={`${tamanoTitulo} font-extrabold tracking-tight leading-none ${esModoOscuro ? 'text-white' : 'text-stone-900'}`}>
          Rongas <span className="text-amber-500">Burgers</span>
        </h1>
        {mostrarEslogan && (
          <p className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-amber-600/90 mt-1">
            Sabor que se disfruta
          </p>
        )}
      </div>
    </div>
  );
}
