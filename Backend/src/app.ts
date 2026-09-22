import cors from 'cors';

import express from 'express';

import {usuarioRouter} from './models/usuario/usuario.routes';
import { peliculaRouter } from "./models/pelicula/pelicula.routes";
import { categoriaFuncionRouter } from "./models/categoriaFuncion/categoriaFuncion.routes";
import { entradaRouter } from "./models/entrada/entrada.routes";
import { funcionRouter } from "./models/funcion/funcion.routes";
import { horarioRouter } from './models/horario/horario.routes';
import { salaRouter } from './models/sala/sala.routes';
import { tipoEntradaRouter } from './models/tipo_entrada/tipo_entrada.routes';
import { ventaRouter } from './models/venta/venta.routes';

const app = express();
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true,
}));
app.use(express.json());


app.use('/api/usuarios', usuarioRouter);
app.use('/api/peliculas', peliculaRouter);
app.use('/api/categoriasFunciones', categoriaFuncionRouter)
app.use('/api/entradas', entradaRouter)
app.use('/api/funciones', funcionRouter)
app.use('/api/horarios', horarioRouter)
app.use('/api/salas', salaRouter)
app.use('/api/tiposEntradas', tipoEntradaRouter)
app.use('/api/ventas',ventaRouter)

app.use((_, res) =>{
  res.status(404).send({message: 'Recurso no encontrado'})
  return
})

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
})
