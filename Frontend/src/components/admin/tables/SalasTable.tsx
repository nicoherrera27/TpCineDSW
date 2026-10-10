import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../assets/rutas';

export default function ListaSalas(){
    const [salas, setSalas] = useState([]);

    const ListarSalas = async() =>{
        try{
            const url = `${baseURL}/salas`;
            const response = await axios.get(url);
            console.log('Salas encontradas:', response.data.data);
            setSalas(response.data.data);
        }
        catch(error){
            console.error('Error al listar salas:', error);
        }
    }

    useEffect(()=>{
        ListarSalas();
    },[]);

  return (


<div className="w-full flex flex-col items-center py-10 px-6 gap-6">
    
    {/* Cabecera del mismo ancho que la tabla alineada a la derecha */}
    <div className="w-full max-w-2xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">SALAS</h1>
      
      <button className="bg-bg-main cursor-pointer border border-accent hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg shadow transition-colors">
        + Agregar
      </button>
    </div>
    <div className="w-full bg-[#130f24] border-2 border-[#8b6ccf] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          

          <thead>
            <tr className="border-b-2 border-[#8b6ccf] text-white text-sm font-semibold tracking-wide">
              <th className="py-4 px-6">Id</th>
              <th className="py-4 px-6">Nombre</th>
              <th className="py-4 px-6">Capacidad</th>
            </tr>
          </thead>

          <tbody className="bg-[#edeaf8] text-[#161224] divide-y-2 divide-[#8b6ccf] text-sm">
            {salas.length > 0 && (
              salas.map((sala: any) => (
                <tr key={sala.Id}>
                  <td className="py-3.5 px-6 font-medium">{sala.Id}</td>
                  <td className="py-3.5 px-6">{sala.nombre}</td>
                  <td className="py-3.5 px-6 font-medium">{sala.capacidad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}