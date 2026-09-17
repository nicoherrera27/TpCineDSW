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

  return (
    <div className="flex flex-col gap-4 w-full max-w-7x1 mx-auto p-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas..."
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => handleSearch(query)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Buscar
      </button>
      {peliculas.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-4">
          {peliculas.map((peli: any) => (
            <div key={peli.id} className="flex flex-col items-center">
              <img
                src={`${imageBaseURL}${peli.poster_path}`}
                alt={peli.title}
                className="rounded-lg shadow-md w-full"
              />
              <h2 className="text-center mt-2 text-sm font-medium">{peli.title}</h2>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
