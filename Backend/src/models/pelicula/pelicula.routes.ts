import {Router} from 'express';
import {createPelicula, getPelicula} from './pelicula.controller';
import {buscarTMDBPeliculas} from "../../lib/tmdb";

export const peliculaRouter = Router();

//peliculaRouter.get('/', getPeliculas);
//peliculaRouter.get('/:id', getPelicula);
peliculaRouter.post('/:tmdbId', createPelicula);
peliculaRouter.get('/:query', getPelicula); 
//peliculaRouter.put('/:id', sanitizePeliculaInput, updatePelicula);
//peliculaRouter.delete('/:id', deletePelicula);