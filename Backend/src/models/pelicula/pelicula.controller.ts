import {prisma} from "../../lib/prisma";
import {Request, Response} from "express";
import {fetchTMDBPeliculas, buscarTMDBPeliculas, fetchGenerosTMDB} from "../../lib/tmdb";

async function createPelicula (req: Request, res: Response){
  try{
    const { tmdbId } = req.params;
    const pelicula = await fetchTMDBPeliculas(Number(tmdbId));
    const generos = pelicula.genres.map((g: any) => g.name).join(',');

    const  peliculaNueva = await prisma.pelicula.create({
      data:{
        TmdbId: pelicula.id,
        Titulo: pelicula.title,
        Generos: generos,
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
    const generos = await fetchGenerosTMDB();

    const resultados = peliculas.results.map((peli:any) => ({
      ...peli,
      generos: peli.genre_ids.map((id:number) => generos.find((gen:any) => gen.id === id)?.name || 'Otro').join(', ')
    })); //aca paso de idgenero a nombre del genero y uso el .join para dejar un espacio y que no quede genero,genero,genero

    res.status(200).json({message: 'Peliculas encontradas', data: resultados});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export {createPelicula, getPelicula};
 
