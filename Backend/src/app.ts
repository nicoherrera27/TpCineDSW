import { peliculaRouter } from "./models/pelicula/pelicula.routes";

import {usuarioRouter} from './models/usuario/usuario.routes';
import express from 'express';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRouter);
app.use('/api/peliculas', peliculaRouter);

app.use((_, res) =>{
  res.status(404).send({message: 'Recurso no encontrado'})
  return
})

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
})
