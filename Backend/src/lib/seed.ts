import { seedUsuario } from "../models/usuario/usuario.seed";
import { seedSala } from "../models/sala/sala.seed";
import { seedCategoriaFuncion } from "../models/categoria_funcion/categoria_funcion.seed";
import { seedFuncion } from "../models/funcion/funcion.seed";
import { seedHorario } from "../models/horario/horario.seed";
import { seedTipo_Entrada } from "../models/tipo_entrada/tipo_entrada.seed";

async function main(){
  await seedUsuario();
  await seedSala();
  await seedCategoriaFuncion();
  await seedFuncion();
  await seedHorario();
  await seedTipo_Entrada();
  console.log("Seed completado");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });