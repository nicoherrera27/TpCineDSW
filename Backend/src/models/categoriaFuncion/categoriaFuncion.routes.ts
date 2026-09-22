import {Router} from 'express';
import {getCategoriaFunciones, getCategoriaFuncion, createCategoriaFuncion, 
    updateCategoriaFuncion, deleteCategoriaFuncion, sanitizeCategoriaFuncionInput} from './categoriaFuncion.controller.js'

export const categoriaFuncionRouter = Router();

categoriaFuncionRouter.get('/', getCategoriaFunciones);
categoriaFuncionRouter.get('/:id', getCategoriaFuncion);
categoriaFuncionRouter.post('/', sanitizeCategoriaFuncionInput,createCategoriaFuncion);
categoriaFuncionRouter.put('/:id', sanitizeCategoriaFuncionInput,updateCategoriaFuncion);
categoriaFuncionRouter.delete('/:id', deleteCategoriaFuncion);
