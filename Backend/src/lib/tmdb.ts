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

export {fetchTMDBPeliculas, buscarTMDBPeliculas};