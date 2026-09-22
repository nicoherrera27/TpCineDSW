import { prisma } from "../../lib/prisma";

async function seedCategoriaFuncion(){
  await prisma.categoriaFuncion.createMany({
    data:[
      {descripcion:"2D", precio: 5000},
      {descripcion:"3D", precio: 7000},
      {descripcion:"IMAX", precio: 10000}
    ],
    skipDuplicates: true,
  })
}

export {seedCategoriaFuncion}
