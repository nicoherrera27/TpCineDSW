import {Router} from 'express';
import {getSalas, getSala, createSala, updateSala, deleteSala, sanitizeSalaInput} from './sala.controller.js'

export const salaRouter = Router();

salaRouter.get('/', getSalas);
salaRouter.get('/:id', getSala);
salaRouter.post('/', sanitizeSalaInput,createSala);
salaRouter.put('/:id', sanitizeSalaInput,updateSala);
salaRouter.delete('/:id', deleteSala);