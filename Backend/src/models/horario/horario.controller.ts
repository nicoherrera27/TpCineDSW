import {NextFunction, Request, Response} from 'express';
import {prisma} from '../../lib/prisma';

function sanitizeHorarioInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    hora: req.body.hora,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getHorarios (req: Request, res: Response){
  try {
    const horarios = await prisma.horario.findMany();
    res.status(201).json({message: 'horarios encontrados', data: horarios});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getHorario (req: Request, res: Response){
  try {
    const { id } = req.params;

    const horario = await prisma.horario.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'horario encontrado', data: horario});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createHorario (req: Request, res: Response){
  try{
    const horarioNuevo = await prisma.horario.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'horario creado', data: horarioNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateHorario (req: Request, res: Response){
  try{
    const { id } = req.params;

    const horarioActualizado = await prisma.horario.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'horario actualizado', data: horarioActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteHorario (req: Request, res: Response){
  try{
    const { id } = req.params;

    const horarioEliminado = await prisma.horario.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'horario eliminado', data: horarioEliminado});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getHorarios, getHorario, createHorario, updateHorario, deleteHorario, sanitizeHorarioInput};