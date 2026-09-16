import 'dotenv/config';

import { prisma } from "./lib/prisma";

async function main() {

  const user = await prisma.user.create({
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
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({});
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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