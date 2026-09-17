const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const headers ={
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
}

async function fetchTMDBPeliculas(tmdbId: number){
  const res = await fetch(
    `${BASE_URL}/movie/${tmdbId}?language=es-AR`,
    {headers}
  );
  return res.json();
}

export {fetchTMDBPeliculas};