import {Router} from 'express';
import {getFunciones, getFuncion, createFuncion, updateFuncion, deleteFuncion, sanitizeFuncionInput} from './funcion.controller.js'

export const funcionRouter = Router();

funcionRouter.get('/', getFunciones);
funcionRouter.get('/:id', getFuncion);
funcionRouter.post('/', sanitizeFuncionInput,createFuncion);
funcionRouter.put('/:id', sanitizeFuncionInput,updateFuncion);
funcionRouter.delete('/:id', deleteFuncion);