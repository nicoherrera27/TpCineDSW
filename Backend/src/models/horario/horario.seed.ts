import { prisma } from "../../lib/prisma";

async function seedHorario(){
  await prisma.horario.createMany({
    data:[
      {Hora: new Date("1970-01-01T14:00:00"), funcionId: 1},
      {Hora: new Date("1970-01-01T17:00:00"), funcionId: 1},
      {Hora: new Date("1970-01-01T20:00:00"), funcionId: 2},
      {Hora: new Date("1970-01-01T22:30:00"), funcionId: 2},
      {Hora: new Date("1970-01-01T16:00:00"), funcionId: 3},
      {Hora: new Date("1970-01-01T21:00:00"), funcionId: 3}
    ],
    skipDuplicates: true,
  })
}

export {seedHorario}
