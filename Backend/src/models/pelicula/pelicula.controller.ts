import {prisma} from "../../lib/prisma";
import {Request, Response} from "express";
import {fetchTMDBPeliculas, buscarTMDBPeliculas} from "../../lib/tmdb";

async function createPelicula (req: Request, res: Response){
  try{
    const { tmdbId } = req.params;
    const pelicula = await fetchTMDBPeliculas(Number(tmdbId));

    const  peliculaNueva = await prisma.pelicula.create({
      data:{
        TmdbId: pelicula.id,
        Titulo: pelicula.title,
        Sinopsis: pelicula.overview,
        FechaEstreno: pelicula.release_date,
        Poster: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'Pelicula cargada', data: peliculaNueva});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getPelicula(req: Request, res: Response){
  try{
    const busqueda = req.params.query as string;
    const peliculas = await buscarTMDBPeliculas(busqueda);
    
    res.status(200).json({message: 'Peliculas encontradas', data: peliculas.results});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export {createPelicula, getPelicula};
 
