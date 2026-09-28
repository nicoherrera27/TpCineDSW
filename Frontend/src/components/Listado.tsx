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

              {peli.Poster && !peli.Poster.includes('null') ? (
                <img
                  src={`${imageBaseURL}${peli.Poster}`}
                  alt={peli.Titulo}
                  className="rounded-lg shadow-md w-full aspect-2/3 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ): (
                    <div
                      className="w-full aspect-2/3 bg-[#161324] border border-secondary rounded-lg flex flex-col items-center justify-center text-center p-3 cursor-pointer hover:border-purple-500/50 transition-colors"
                    >
                      <span className="text-xs text-zinc-400 font-medium">No contiene imagen</span>
                    </div>
              )}
              <h2 className="text-center mt-2 text-sm font-medium">{peli.Titulo}</h2> 
              {peli.Generos ?(
                <p className="text-blue-400 text-xs">{peli.Generos}</p>
              ):(
                <p className="text-blue-400 text-xs">Sin generos</p>
              )}
              
              {peli.FechaEstreno && (<p className="text-gray-400 text-xs">Estreno: {peli.FechaEstreno}</p>)} 
              {peli.Sinopsis ?(
                (<p className="text-gray-300 text-xs line-clamp-4">{peli.Sinopsis}</p>)
              ):(
                <p className="text-gray-300 text-xs line-clamp-4">Sin sinopsis</p>
              )}
               
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
