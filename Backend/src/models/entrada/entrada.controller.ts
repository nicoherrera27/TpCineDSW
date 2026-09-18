import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeEntradaInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Tipo: req.body.Tipo,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getEntradas (req: Request, res: Response){
  try {
    const entradas = await prisma.entrada.findMany();
    res.status(201).json({message: 'entradas encontradas', data: entradas});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getEntrada (req: Request, res: Response){
  try {
    const { id } = req.params;

    const entrada = await prisma.entrada.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'entrada encontrada', data: entrada});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createEntrada (req: Request, res: Response){
  try{
    const entradaNuevo = await prisma.entrada.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'entrada creada', data: entradaNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateEntrada (req: Request, res: Response){
  try{
    const { id } = req.params;

    const entradaActualizado = await prisma.entrada.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'entrada actualizada', data: entradaActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteEntrada (req: Request, res: Response){
  try{
    const { id } = req.params;

    const entradaEliminada = await prisma.entrada.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'entrada eliminada', data: entradaEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada, sanitizeEntradaInput};