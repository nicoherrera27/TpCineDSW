//import 'dotenv/config';

import { prisma } from "./lib/prisma";

async function main() {

  const usuario = await prisma.usuario.create({
    data: {
      NombreUsuario: "Alice",
      Contrasenia: "password",
      Nombre: "Alice",
      Apellido: "Smith",
      Email: "alice@prisma.io",
      FechaNacimiento: new Date("1990-01-01"),
      FechaAlta: new Date(),
     
    },
  });
  console.log("Created user:", usuario);

  // Fetch all users with their posts
  const allUsuarios = await prisma.usuario.findMany({});
  console.log("Usuarios:", JSON.stringify(allUsuarios, null, 2));

  const pelicula = await prisma.pelicula.create({
    data: {
      Titulo: "Inception",
    }
  });

  const allPeliculas = await prisma.pelicula.findMany({});
  console.log("Peliculas:", JSON.stringify(allPeliculas, null, 2));

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });