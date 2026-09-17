import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeSalaInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Nombre: req.body.Nombre,
    Capacidad: req.body.Capacidad
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getSalas (req: Request, res: Response){
  try {
    const salaes = await prisma.sala.findMany();
    res.status(201).json({message: 'salaes encontradas', data: salaes});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getSala (req: Request, res: Response){
  try {
    const { id } = req.params;

    const sala = await prisma.sala.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'sala encontrada', data: sala});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createSala (req: Request, res: Response){
  try{
    const salaNuevo = await prisma.sala.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'sala creada', data: salaNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateSala (req: Request, res: Response){
  try{
    const { id } = req.params;

    const salaActualizado = await prisma.sala.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'sala actualizada', data: salaActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSala (req: Request, res: Response){
  try{
    const { id } = req.params;

    const salaEliminada = await prisma.sala.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'sala eliminada', data: salaEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getSalas, getSala, createSala, updateSala, deleteSala, sanitizeSalaInput};