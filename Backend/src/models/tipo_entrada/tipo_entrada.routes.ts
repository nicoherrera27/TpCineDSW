import {Router} from 'express';
import {getTipoEntradas, getTipoEntrada, createTipoEntrada, updateTipoEntrada, deleteTipoEntrada, sanitizeTipoEntradaInput} from './tipo_entrada.controller.js'

export const TipoEntradaRouter = Router();

TipoEntradaRouter.get('/', getTipoEntradas);
TipoEntradaRouter.get('/:id', getTipoEntrada);
TipoEntradaRouter.post('/', sanitizeTipoEntradaInput,createTipoEntrada);
TipoEntradaRouter.put('/:id', sanitizeTipoEntradaInput,updateTipoEntrada);
TipoEntradaRouter.delete('/:id', deleteTipoEntrada);