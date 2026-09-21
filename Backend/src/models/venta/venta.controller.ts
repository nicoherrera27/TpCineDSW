import {prisma} from "../../lib/prisma";
import {Request, Response, NextFunction} from "express";

function sanitizeVentaInput(req: Request, res: Response, next: NextFunction) {
  // Aca se realizarian las validaciones //
  req.body.sanitizedInput = {
    Costo: req.body.Costo,
    fecha_hora: req.body.fecha_hora,
    precio_total: req.body.precio_total
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    // Sirve para evitar guardar campos vacíos o inválidos en la base de datos
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

async function getVentas (req: Request, res: Response){
  try {
    const ventas = await prisma.venta.findMany();
    res.status(201).json({message: 'ventas encontradas', data: ventas});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getVenta (req: Request, res: Response){
  try {
    const { id } = req.params;

    const venta = await prisma.venta.findUnique({
      where:{Id: Number(id)}
    })
    res.status(201).json({message: 'venta encontrada', data: venta});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createVenta (req: Request, res: Response){
  try{
    const ventaNuevo = await prisma.venta.create({
      data:{
        ...req.body.sanitizedInput,
        FechaAlta: new Date()
      }
    });
    res.status(201).json({message: 'venta creada', data: ventaNuevo});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateVenta (req: Request, res: Response){
  try{
    const { id } = req.params;

    const ventaActualizado = await prisma.venta.update({
      where: {Id: Number(id)},
      data: req.body.sanitizedInput
    })
    res.status(201).json({message: 'venta actualizada', data: ventaActualizado});
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteVenta (req: Request, res: Response){
  try{
    const { id } = req.params;

    const ventaEliminada = await prisma.venta.delete({
      where: {Id: Number(id)}
    })
    res.status(201).json({message: 'venta eliminada', data: ventaEliminada});
  }

  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {getVentas, getVenta, createVenta, updateVenta, deleteVenta, sanitizeVentaInput};