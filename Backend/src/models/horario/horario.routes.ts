import {Router} from 'express';
import {getHorarios, getHorario, createHorario, updateHorario, sanitizeHorarioInput, deleteHorario} from './horario.controller';

export const HorarioRouter = Router();

HorarioRouter.get('/', getHorarios);
HorarioRouter.get('/:id', getHorario);
HorarioRouter.post('/', sanitizeHorarioInput, createHorario);
HorarioRouter.put('/:id', sanitizeHorarioInput, updateHorario);
HorarioRouter.delete('/:id', deleteHorario);