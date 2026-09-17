import {Router} from 'express';
import {getSalas, getSala, createSala, updateSala, deleteSala, sanitizeSalaInput} from './sala.controller.js'

export const SalaRouter = Router();

SalaRouter.get('/', getSalas);
SalaRouter.get('/:id', getSala);
SalaRouter.post('/', sanitizeSalaInput,createSala);
SalaRouter.put('/:id', sanitizeSalaInput,updateSala);
SalaRouter.delete('/:id', deleteSala);