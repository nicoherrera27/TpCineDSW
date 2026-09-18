import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeTipoEntradaInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Descripcion: req.body.Descripcion,
    Bonificacion: req.body.Bonificacion
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getTipoEntradas (req: Request, res: Response){
  try {
    const tipo_entradas = await prisma.tipo_entrada.findMany();
    res.status(201).json({message: 'tipo entradas encontradas', data: tipo_entradas});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getTipoEntrada (req: Request, res: Response){
  try {
    const { id } = req.params;

    const tipo_entrada = await prisma.tipo_entrada.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'tipo entrada encontrada', data: tipo_entrada});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createTipoEntrada (req: Request, res: Response){
  try{
    const tipo_entradaNuevo = await prisma.tipo_entrada.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'tipo entrada creada', data: tipo_entradaNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTipoEntrada (req: Request, res: Response){
  try{
    const { id } = req.params;

    const tipo_entradaActualizado = await prisma.tipo_entrada.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'tipo entrada actualizada', data: tipo_entradaActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTipoEntrada (req: Request, res: Response){
  try{
    const { id } = req.params;

    const tipo_entradaEliminada = await prisma.tipo_entrada.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'tipo entrada eliminada', data: tipo_entradaEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getTipoEntradas, getTipoEntrada, createTipoEntrada, updateTipoEntrada, deleteTipoEntrada, sanitizeTipoEntradaInput};