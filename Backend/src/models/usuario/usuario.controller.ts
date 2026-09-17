import {NextFunction, Request, Response} from 'express';
import {prisma} from '../../lib/prisma';

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Email: req.body.Email,
    Contrasenia: req.body.Contrasenia,
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Rol: req.body.Rol

  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getUsuarios (req: Request, res: Response){
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(201).json({message: 'Usuarios encontrados', data: usuarios});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getUsuario (req: Request, res: Response){
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'Usuario encontrado', data: usuario});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createUsuario (req: Request, res: Response){
  try{
    const usuarioNuevo = await prisma.usuario.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'Usuario creado', data: usuarioNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUsuario (req: Request, res: Response){
  try{
    const { id } = req.params;

    const usuarioActualizado = await prisma.usuario.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'Usuario actualizado', data: usuarioActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUsuario (req: Request, res: Response){
  try{
    const { id } = req.params;

    const usuarioEliminado = await prisma.usuario.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'Usuario eliminado', data: usuarioEliminado});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, sanitizeUsuarioInput};