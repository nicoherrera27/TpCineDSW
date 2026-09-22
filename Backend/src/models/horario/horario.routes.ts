import {Router} from 'express';
import {getHorarios, getHorario, createHorario, updateHorario, sanitizeHorarioInput, deleteHorario} from './horario.controller';

export const horarioRouter = Router();

horarioRouter.get('/', getHorarios);
horarioRouter.get('/:id', getHorario);
horarioRouter.post('/', sanitizeHorarioInput, createHorario);
horarioRouter.put('/:id', sanitizeHorarioInput, updateHorario);
horarioRouter.delete('/:id', deleteHorario);