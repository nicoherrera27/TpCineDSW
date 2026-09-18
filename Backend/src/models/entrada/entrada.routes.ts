import {Router} from 'express';
import {getEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada, sanitizeEntradaInput} from './entrada.controller.js'

export const EntradaRouter = Router();

EntradaRouter.get('/', getEntradas);
EntradaRouter.get('/:id', getEntrada);
EntradaRouter.post('/', sanitizeEntradaInput,createEntrada);
EntradaRouter.put('/:id', sanitizeEntradaInput,updateEntrada);
EntradaRouter.delete('/:id', deleteEntrada);