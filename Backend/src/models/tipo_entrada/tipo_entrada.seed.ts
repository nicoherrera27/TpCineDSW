import { prisma } from "../../lib/prisma";

async function seedTipo_Entrada(){
    await prisma.tipo_entrada.createMany({
        data:[
            {Descripcion:"Jubilado", Bonificacion:"20%"},
            {Descripcion:"Menor", Bonificacion:"10%"}
        ],
        skipDuplicates: true,
    })
}
export {seedTipo_Entrada}