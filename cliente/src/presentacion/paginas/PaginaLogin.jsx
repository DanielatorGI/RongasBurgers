import React from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import LogoRongas from '../componentes/LogoRongas';
import { usarControladorLogin } from '../../aplicacion/controladores/usarControladorLogin';

export default function PaginaLogin({ onAutenticacionExitosa, onVolverBienvenida }) {
  const {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    recordarme,
    setRecordarme,
    mostrarContrasena,
    alternarVisibilidadContrasena,
    estaCargando,
    mensajeError,
    procesarInicioSesion,
    seleccionarCredencialDemo
  } = usarControladorLogin();

  const manejarEnvio = (e) => {
    procesarInicioSesion(e, onAutenticacionExitosa);
  };

  return (
    <div className="min-h-screen bg-crema-fondo flex flex-col items-center justify-center p-4 sm:p-6 relative">
      <button
        type="button"
        onClick={onVolverBienvenida}
        className="absolute top-6 left-6 text-stone-500 hover:text-stone-900 flex items-center gap-2 text-sm font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver</span>
      </button>

      <div className="max-w-md w-full bg-crema-tarjeta border border-crema-borde rounded-3xl p-8 sm:p-10 shadow-xl">
        <header className="flex flex-col items-center text-center">
          <LogoRongas tamano="normal" mostrarEslogan={false} />
          <h2 className="text-2xl font-bold text-stone-900 mt-5">Iniciar sesión</h2>
          <p className="text-stone-500 text-sm mt-1">Ingresa tus datos para continuar</p>
        </header>

        {mensajeError && (
          <div className="mt-5 p-3 rounded-xl bg-alerta-rojoFondo text-alerta-rojo border border-alerta-rojoBorde text-xs font-semibold text-center">
            {mensajeError}
          </div>
        )}

        <form onSubmit={manejarEnvio} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@rongasburgers.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-naranja-primario focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={mostrarContrasena ? 'text' : 'password'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="w-full pl-11 pr-11 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-naranja-primario focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={alternarVisibilidadContrasena}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                {mostrarContrasena ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-stone-600 font-medium">
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
                className="w-4 h-4 rounded text-naranja-primario focus:ring-naranja-primario border-stone-300"
              />
              <span>Recordarme</span>
            </label>
            <span className="text-stone-400 hover:text-stone-600 cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <button
            type="submit"
            disabled={estaCargando}
            className="w-full mt-4 py-3.5 px-6 bg-naranja-primario hover:bg-naranja-oscuro text-stone-950 font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
          >
            {estaCargando ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Entrar</span>}
          </button>
        </form>

        <footer className="mt-8 pt-5 border-t border-stone-200/80">
          <p className="text-[11px] text-center text-stone-400 uppercase tracking-wider font-semibold mb-2.5">
            Acceso Rápido de Prueba (Demo):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => seleccionarCredencialDemo('campestre')}
              className="py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 text-xs font-semibold rounded-lg transition text-center"
            >
              Campestre
            </button>
            <button
              type="button"
              onClick={() => seleccionarCredencialDemo('centromax')}
              className="py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-900 text-xs font-semibold rounded-lg transition text-center"
            >
              Centro Max
            </button>
            <button
              type="button"
              onClick={() => seleccionarCredencialDemo('coecillo')}
              className="py-1.5 px-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-900 text-xs font-semibold rounded-lg transition text-center"
            >
              Coecillo
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
