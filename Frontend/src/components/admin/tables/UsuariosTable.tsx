import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../assets/rutas';

export default function ListaUsuarios(){
    const [usuarios, setUsuarios] = useState([]);

    const ListarUsuarios = async() =>{
        try{
            const url = `${baseURL}/usuarios`;
            const response = await axios.get(url);
            console.log('Usuarios encontrados:', response.data.data);
            setUsuarios(response.data.data);
        }
        catch(error){
            console.error('Error al listar usuarios:', error);
        }
    }

    useEffect(()=>{
        ListarUsuarios();
    },[]);

  return (
<div className="w-full flex flex-col items-center py-10 px-6 gap-6">
    
    {/* Cabecera del mismo ancho que la tabla alineada a la derecha */}
    <div className="w-full max-w-2xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">USUARIOS</h1>
      
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
              <th className="py-4 px-6">Apellido</th>
              <th className="py-4 px-6">Rol</th>
              <th className="py-4 px-6">Mail</th>
            </tr>
          </thead>

          <tbody className="bg-[#edeaf8] text-[#161224] divide-y-2 divide-[#8b6ccf] text-sm">
            {usuarios.length > 0 && (
              usuarios.map((user: any) => (
                <tr key={user.Id} className="hover:bg-[#e4e0f5] transition-colors">
                  <td className="py-3.5 px-6 font-medium">{user.Id}</td>
                  <td className="py-3.5 px-6 font-medium">{user.Nombre}</td>
                  <td className="py-3.5 px-6">{user.Apellido || ''}</td>
                  <td className="py-3.5 px-6 font-medium">{user.Rol}</td>
                  <td className="py-3.5 px-6 text-zinc-700">{user.Email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}