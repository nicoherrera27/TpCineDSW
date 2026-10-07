import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL, imageBaseURL } from '../assets/rutas';
interface Pelicula {
  Id: number;
  Titulo: string;
  Generos?: string;
  Poster?: string;
  FechaEstreno?: string;
}
const VISIBLE_COUNT = 6;
export default function CarouselEstrenos() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const fetchEstrenos = async () => {
      try {
        const response = await axios.get(`${baseURL}/peliculas`);
        const hoy = new Date();
        const estrenos = response.data.data.filter((peli: Pelicula) => {
          if (!peli.FechaEstreno) return false;
          return new Date(peli.FechaEstreno) > hoy;
        });
        setPeliculas(estrenos);
      } catch (error) {
        console.error('Error al obtener próximos estrenos:', error);
      }
    };
    fetchEstrenos();
  }, []);
  const maxIndex = Math.max(0, peliculas.length - VISIBLE_COUNT);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxIndex;
  return (
    <section className="w-full max-w- 7xl mx-auto px-20 py-6">
      <h2 className="text-2xl font-semibold text-[var(--color-text-main)] mb-4">
        Próximos Estrenos
      </h2>
      <div className="relative group">
        {/* Flecha izquierda */}
        {canGoPrev && (
          <button
            onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full
                       bg-[var(--color-secondary)]/80 hover:bg-[var(--color-primary)]
                       text-white flex items-center justify-center
                       transition-all duration-200
                       opacity-0 group-hover:opacity-100
                       shadow-lg shadow-black/40"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {/* Track de tarjetas */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(calc(-${startIndex} * (100% / ${VISIBLE_COUNT} + 0.67rem)))`,
            }}
          >
            {peliculas.map((peli) => (
              <div
                key={peli.Id}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer"
                style={{ width: `calc(100% / ${VISIBLE_COUNT} - 0.67rem)` }}
              >
                {peli.Poster && !peli.Poster.includes('null') ? (
                  <img
                    src={`${imageBaseURL}${peli.Poster}`}
                    alt={peli.Titulo}
                    className="rounded-lg shadow-md w-full aspect-[2/3] object-cover
                               hover:opacity-80 transition-opacity duration-200
                               border border-transparent hover:border-[var(--color-primary)]/50"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-[#161324] border border-[var(--color-secondary)]
                                  rounded-lg flex flex-col items-center justify-center text-center p-3
                                  hover:border-purple-500/50 transition-colors">
                    <span className="text-xs text-zinc-400 font-medium">Sin imagen</span>
                  </div>
                )}
                <h3 className="text-center mt-2 text-sm font-medium text-[var(--color-text-main)] line-clamp-1">
                  {peli.Titulo}
                </h3>
                <p className="text-blue-400 text-xs">
                  {peli.Generos || 'Sin géneros'}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Flecha derecha */}
        {canGoNext && (
          <button
            onClick={() => setStartIndex((prev) => Math.min(maxIndex, prev + 1))}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full
                       bg-[var(--color-secondary)]/80 hover:bg-[var(--color-primary)]
                       text-white flex items-center justify-center
                       transition-all duration-200
                       opacity-0 group-hover:opacity-100
                       shadow-lg shadow-black/40"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}