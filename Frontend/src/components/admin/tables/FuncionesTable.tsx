import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../assets/rutas';

export default function ListaFunciones(){
    const [funciones, setFunciones] = useState([]);

    const ListarFunciones = async() =>{
        try{
            const url = `${baseURL}/funciones`;
            const response = await axios.get(url);
            console.log('Funciones encontradas:', response.data.data);
            setFunciones(response.data.data);
        }
        catch(error){
            console.error('Error al listar usuarios:', error);
        }
    }

    useEffect(()=>{
        ListarFunciones();
    },[]);

    function formatearHora(horaString: string) {
        if (!horaString) return '';
        const date = new Date(horaString);
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: 'UTC' 
        });
    }   

    function formatearFecha(fechaString: string) {
        if (!fechaString) return '';
        const date = new Date(fechaString);
        return date.toLocaleDateString([], { 
            day:'numeric',
            month:'numeric',
            year: 'numeric',
            timeZone: 'UTC' 
        });
    }  
  return (
<div className="w-full flex flex-col items-center py-10 px-6 gap-6">
    
    {/* Cabecera del mismo ancho que la tabla alineada a la derecha */}
    <div className="w-full max-w-2xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">FUNCIONES</h1>
      
      <button className="bg-bg-main cursor-pointer border border-accent hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg shadow transition-colors">
        + Agregar
      </button>
    </div>
    <div className="w-full bg-[#130f24] border-2 border-[#8b6ccf] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          

          <thead>
            <tr className="border-b-2 border-[#8b6ccf] text-white text-sm font-semibold tracking-wide">
              <th className="py-4 px-6">Id</th>
              <th className="py-4 px-6">Fecha</th>
              <th className="py-4 px-6">Horarios</th>
              <th className="py-4 px-6">Categoria</th>
              <th className="py-4 px-6">Sala</th>
              <th className="py-4 px-6">Pelicula</th>
              <th className="py-4 px-6">Estado</th>
            </tr>
          </thead>

          <tbody className="bg-[#edeaf8] text-[#161224] divide-y-2 divide-[#8b6ccf] text-sm">
            {funciones.length > 0 && (
              funciones.map((func: any) => (
                <tr key={func.Id} className="hover:bg-[#e4e0f5] transition-colors">
                  <td className="py-3.5 px-6 font-medium">{func.Id}</td>
                  <td className="py-3.5 px-6">{formatearFecha(func.Fecha)}</td>
                  <td className="py-3.5 px-6 font-medium">
                    {func.horarios && func.horarios.length > 0
                    ? func.horarios.map((h: any) => formatearHora(h.Hora)).join(' - ')
                    : 'Sin horarios'}
                  </td>
                  <td className="py-3.5 px-6 font-medium">{func.categoria.descripcion}</td>
                  <td className="py-3.5 px-6 font-medium">{func.sala.nombre}</td>
                  <td className="py-3.5 px-6 font-medium">{func.pelicula.Titulo}</td>
                  <td className="py-3.5 px-6 font-medium">{func.Estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}