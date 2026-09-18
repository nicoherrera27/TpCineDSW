import { prisma } from "../../lib/prisma";

async function seedUsuario(){
  await prisma.usuario.createMany({
    data:[
      {Email:"admin@admin.com", Contrasenia:"admin123", Nombre:"Admin", Apellido:"", Rol: "admin"},
      {Email:"usuario@usuario.com", Contrasenia:"usuario", Nombre:"Usuario", Apellido:"", Rol: "usuario"}
    ],
    skipDuplicates: true,

  })
}

export {seedUsuario}