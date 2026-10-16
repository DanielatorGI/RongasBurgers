import React from 'react';

export default function LogoRongas({
  esModoOscuro = false,
  mostrarEslogan = true,
  tamano = 'normal'
}) {
  const tamanoIcono = tamano === 'grande' ? 'w-14 h-14' : tamano === 'pequeno' ? 'w-8 h-8' : 'w-10 h-10';
  const tamanoTitulo = tamano === 'grande' ? 'text-2xl sm:text-3xl' : tamano === 'pequeno' ? 'text-lg' : 'text-xl';

  return (
    <div className="flex items-center gap-3">
      <div className={`${tamanoIcono} rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0`}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 4.5 2 7.5C2 8.3 2.5 9 3.3 9.6C3.1 9.9 3 10.3 3 10.7C3 11.4 3.6 12 4.3 12H19.7C20.4 12 21 11.4 21 10.7C21 10.3 20.9 9.9 20.7 9.6C21.5 9 22 8.3 22 7.5C22 4.5 17.52 2 12 2Z" fill="#F59E0B" />
          <path d="M4 13.5C4 13.2 4.2 13 4.5 13H19.5C19.8 13 20 13.2 20 13.5C20 14.3 19.3 15 18.5 15H5.5C4.7 15 4 14.3 4 13.5Z" fill="#E11D48" />
          <path d="M2.5 16C2.5 15.7 2.7 15.5 3 15.5H21C21.3 15.5 21.5 15.7 21.5 16C21.5 19.3 17.2 22 12 22C6.8 22 2.5 19.3 2.5 16Z" fill="#D97706" />
        </svg>
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
