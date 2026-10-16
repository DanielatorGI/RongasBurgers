/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        crema: {
          fondo: '#FBF9F4',
          tarjeta: '#FFFDF9',
          suave: '#F5EFE6',
          borde: '#EADBC8'
        },
        naranja: {
          primario: '#F59E0B',
          oscuro: '#D97706',
          intenso: '#EA580C',
          hover: '#B45309'
        },
        carbon: {
          fondo: '#141210',
          tarjeta: '#1F1B18',
          texto: '#292524'
        },
        alerta: {
          rojo: '#DC2626',
          rojoFondo: '#FEE2E2',
          rojoBorde: '#FCA5A5',
          verde: '#16A34A',
          verdeFondo: '#DCFCE7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
