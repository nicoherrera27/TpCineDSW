import {Router} from 'express';
import {getPeliculas,createPelicula, getPelicula, deletePelicula} from './pelicula.controller';
import {buscarTMDBPeliculas} from "../../lib/tmdb";

export const peliculaRouter = Router();

peliculaRouter.get('/', getPeliculas);
peliculaRouter.get('/:query', getPelicula); 
peliculaRouter.post('/:tmdbId', createPelicula);
//peliculaRouter.put('/:id', sanitizePeliculaInput, updatePelicula);
peliculaRouter.delete('/:id', deletePelicula);