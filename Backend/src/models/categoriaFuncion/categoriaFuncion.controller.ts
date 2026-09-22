import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeCategoriaFuncionInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    descripcion: req.body.descripcion,
    precio: req.body.precio 
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getCategoriaFunciones (req: Request, res: Response){
  try {
    const categorias_funciones = await prisma.categoriaFuncion.findMany();
    res.status(201).json({message: 'categorias_funciones encontradas', data: categorias_funciones});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategoriaFuncion (req: Request, res: Response){
  try {
    const { id } = req.params;

    const categoria_funcion = await prisma.categoriaFuncion.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'categoria_funcion encontrada', data: categoria_funcion});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createCategoriaFuncion (req: Request, res: Response){
  try{
    const categoria_funcionNueva = await prisma.categoriaFuncion.create({
      data:{
        ...req.body.sanitizedInput,
      }
    });
    res.status(201).json({message: 'categoria_funcion creada', data: categoria_funcionNueva});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCategoriaFuncion (req: Request, res: Response){
  try{
    const { id } = req.params;

    const categoria_funcionActualizado = await prisma.categoriaFuncion.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'categoria_funcion actualizada', data: categoria_funcionActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCategoriaFuncion (req: Request, res: Response){
  try{
    const { id } = req.params;

    const categoria_funcionEliminada = await prisma.categoriaFuncion.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'categoria_funcion eliminada', data: categoria_funcionEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getCategoriaFunciones, getCategoriaFuncion, createCategoriaFuncion, updateCategoriaFuncion, deleteCategoriaFuncion, sanitizeCategoriaFuncionInput};