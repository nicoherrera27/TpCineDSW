import {Router} from 'express';
import {getEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada, sanitizeEntradaInput} from './entrada.controller.js'

export const entradaRouter = Router();

entradaRouter.get('/', getEntradas);
entradaRouter.get('/:id', getEntrada);
entradaRouter.post('/', sanitizeEntradaInput,createEntrada);
entradaRouter.put('/:id', sanitizeEntradaInput,updateEntrada);
entradaRouter.delete('/:id', deleteEntrada);