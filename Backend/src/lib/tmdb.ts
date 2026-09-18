import { axiosTMBD } from "./axios";

async function fetchTMDBPeliculas(tmdbId: number){

  const res = await axiosTMBD.get(
    `/movie/${tmdbId}?language=en-US`
  );
  return res.data;
}

async function buscarTMDBPeliculas(query: string) {
  const res = await axiosTMBD.get(
    `/search/movie?query=${query}&language=en-US`
  );
  return res.data;
}

async function fetchGenerosTMDB() {
  const res = await axiosTMBD.get('/genre/movie/list?language=es-ES');
  return res.data.genres; 
} //obtenemos los idgenero aca

export {fetchTMDBPeliculas, buscarTMDBPeliculas, fetchGenerosTMDB};