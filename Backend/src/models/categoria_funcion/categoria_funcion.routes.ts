import {Router} from 'express';
import {getCategoriaFunciones, getCategoriaFuncion, createCategoriaFuncion, 
    updateCategoriaFuncion, deleteCategoriaFuncion, sanitizeCategoriaFuncionInput} from './categoria_funcion.controller.js'

export const categoria_funcionRouter = Router();

categoria_funcionRouter.get('/', getCategoriaFunciones);
categoria_funcionRouter.get('/:id', getCategoriaFuncion);
categoria_funcionRouter.post('/', sanitizeCategoriaFuncionInput,createCategoriaFuncion);
categoria_funcionRouter.put('/:id', sanitizeCategoriaFuncionInput,updateCategoriaFuncion);
categoria_funcionRouter.delete('/:id', deleteCategoriaFuncion);
