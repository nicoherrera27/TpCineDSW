import {Router} from 'express';
import {getVentas, getVenta, createVenta, updateVenta, deleteVenta, sanitizeVentaInput} from './venta.controller.js'

export const ventaRouter = Router();

ventaRouter.get('/', getVentas);
ventaRouter.get('/:id', getVenta);
ventaRouter.post('/', sanitizeVentaInput,createVenta);
ventaRouter.put('/:id', sanitizeVentaInput,updateVenta);
ventaRouter.delete('/:id', deleteVenta);