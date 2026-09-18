import { prisma } from "../../lib/prisma";

async function seedSala(){
  await prisma.sala.createMany({
    data:[
      {nombre:"Sala 1", capacidad: 100},
      {nombre:"Sala 2", capacidad: 150},
      {nombre:"Sala 3", capacidad: 200}
    ],
    skipDuplicates: true,
  })
}

export {seedSala}
