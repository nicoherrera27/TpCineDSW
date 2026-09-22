import {Router} from 'express';
import {getTipoEntradas, getTipoEntrada, createTipoEntrada, updateTipoEntrada, deleteTipoEntrada, sanitizeTipoEntradaInput} from './tipo_entrada.controller.js'

export const tipoEntradaRouter = Router();

tipoEntradaRouter.get('/', getTipoEntradas);
tipoEntradaRouter.get('/:id', getTipoEntrada);
tipoEntradaRouter.post('/', sanitizeTipoEntradaInput,createTipoEntrada);
tipoEntradaRouter.put('/:id', sanitizeTipoEntradaInput,updateTipoEntrada);
tipoEntradaRouter.delete('/:id', deleteTipoEntrada);