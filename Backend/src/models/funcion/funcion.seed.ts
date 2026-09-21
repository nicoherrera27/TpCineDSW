import { prisma } from "../../lib/prisma";

async function seedFuncion(){
  await prisma.funcion.createMany({
    data:[
      {Estado:"activa", Fecha: new Date("2026-09-20"), categoriaId: 1, salaId: 1,peliculaId: 1},
      {Estado:"activa", Fecha: new Date("2026-09-20"), categoriaId: 2, salaId: 2,peliculaId: 2},
      {Estado:"activa", Fecha: new Date("2026-09-21"), categoriaId: 3, salaId: 3,peliculaId: 3}
    ],
    skipDuplicates: true,
  })
}

export {seedFuncion}
