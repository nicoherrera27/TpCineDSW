import {Router} from 'express';
import {createPelicula} from './pelicula.controller';

export const peliculaRouter = Router();

//peliculaRouter.get('/', getPeliculas);
//peliculaRouter.get('/:id', getPelicula);
peliculaRouter.post('/:tmdbId', createPelicula);
//peliculaRouter.put('/:id', sanitizePeliculaInput, updatePelicula);
//peliculaRouter.delete('/:id', deletePelicula);