import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeFuncionInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Estado: req.body.Estado,
    Fecha: req.body.Fecha ? new Date(`${req.body.fecha}T00:00:00.000Z`) : undefined
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getFunciones (req: Request, res: Response){
  try {
    const funciones = await prisma.funcion.findMany();
    res.status(201).json({message: 'funciones encontradas', data: funciones});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getFuncion (req: Request, res: Response){
  try {
    const { id } = req.params;

    const funcion = await prisma.funcion.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'funcion encontrada', data: funcion});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createFuncion (req: Request, res: Response){
  try{
    const funcionNuevo = await prisma.funcion.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'funcion creada', data: funcionNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateFuncion (req: Request, res: Response){
  try{
    const { id } = req.params;

    const funcionActualizado = await prisma.funcion.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'funcion actualizada', data: funcionActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteFuncion (req: Request, res: Response){
  try{
    const { id } = req.params;

    const funcionEliminada = await prisma.funcion.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'funcion eliminada', data: funcionEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getFunciones, getFuncion, createFuncion, updateFuncion, deleteFuncion, sanitizeFuncionInput};