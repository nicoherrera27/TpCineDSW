import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL, imageBaseURL } from '../assets/rutas';

export default function Buscador() {
  const [peliculas, setPeliculas] = useState([]);

  const handleGetPeliculasBBDD = async () => {
      try{
          const url = `${baseURL}/peliculas`;
          const response = await axios.get(url);
          console.log('Películas encontradas:', response.data.data);
          setPeliculas(response.data.data);
      }
      catch (error) {
        console.error('Error al buscar películas:', error);
      }
    };

    useEffect(() => {
    handleGetPeliculasBBDD();
    }, []); 


  return (
    <div className="flex flex-col gap-4 w-full max-w-7x1 mx-auto p-4">  
      {peliculas.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-4">
          {peliculas.map((peli: any) => (
            <div key={peli.Id} className="flex flex-col items-center">
              <img
                src={`${imageBaseURL}${peli.Poster}`}
                alt={peli.Titulo}
                className="rounded-lg shadow-md w-full"
              /> {/* Poster */}
              <h2 className="text-center mt-2 text-sm font-medium">{peli.Titulo}</h2> {/* Titulo */}
              {peli.Generos && (<p className="text-blue-400 text-xs">{peli.Generos}</p>)} {/* Géneros */}
              {peli.FechaEstreno && (<p className="text-gray-400 text-xs">Estreno: {peli.FechaEstreno}</p>)} {/* Fecha de estreno */}
              {peli.Sinopsis && (<p className="text-gray-300 text-xs line-clamp-4">{peli.Sinopsis}</p>)} {/* Sinopsis */}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
