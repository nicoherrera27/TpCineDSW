import { useState } from 'react';
import axios from 'axios';
import { baseURL, imageBaseURL } from '../assets/rutas';

export default function Buscador() {
  const [query, setQuery] = useState('');
  const [peliculas, setPeliculas] = useState([]);

  const handleSearch = async (busqueda: string) => {
      try{
          const url = `${baseURL}/peliculas/${busqueda}`;
          const response = await axios.get(url);
          console.log('Películas encontradas:', response.data.data);
          console.log(response.data.data[0].poster_path)
          setPeliculas(response.data.data);
      }
      catch (error) {
        console.error('Error al buscar películas:', error);
      }
    };

    const handleAdd = async(id : Number) =>{
      try{
        const url= `${baseURL}/peliculas/${id}`
        const response = await axios.post(url);
        alert('Película cargada');
        console.log('Película cargada:',response.data.data)
      }
      catch(error){
        alert('Error al agregar pelicula')
        console.error('Error al agregar pelicula', error)
      }

    };

  return (
    <div className="flex flex-col gap-4 w-full max-w-7x1 mx-auto p-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas..."
        rows={3}
        className="w-full p-3 border border-secondary rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => handleSearch(query)}
        
        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md shadow-primary/30"
      >
        Buscar
      </button>
      {peliculas.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-4">
          {peliculas.map((peli: any) => (
            <div key={peli.id} className="flex flex-col items-center">
              {peli.poster_path && peli.poster_path !== 'null' ? (
                <img
                  src={`${imageBaseURL}${peli.poster_path}`}
                  alt={peli.title}
                  onClick={() => handleAdd(peli.id)}
                  className="rounded-lg shadow-md w-full aspect-2/3 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ): (
                    <div
                      onClick={() => handleAdd(peli.id)}
                      className="w-full aspect-2/3 bg-[#161324] border border-secondary rounded-lg flex flex-col items-center justify-center text-center p-3 cursor-pointer hover:border-purple-500/50 transition-colors"
                    >
                      <span className="text-xs text-zinc-400 font-medium">No contiene imagen</span>
                    </div>
              )}
              
              <h2 className="text-center mt-2 text-sm font-medium">{peli.title}</h2> {/* Titulo */}
              {peli.generos && (<p className="text-blue-400 text-xs">{peli.generos}</p>)} {/* Géneros */}
              {peli.release_date && (<p className="text-gray-400 text-xs">Estreno: {peli.release_date}</p>)} {/* Fecha de estreno */}
              {peli.overview && (<p className="text-gray-300 text-xs line-clamp-4">{peli.overview}</p>)} {/* Sinopsis */}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
