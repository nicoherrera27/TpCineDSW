import {Router} from 'express';
import {getUsuarios, getUsuario, createUsuario, updateUsuario, sanitizeUsuarioInput, deleteUsuario} from './usuario.controller';

export const usuarioRouter = Router();

usuarioRouter.get('/', getUsuarios);
usuarioRouter.get('/:id', getUsuario);
usuarioRouter.post('/', sanitizeUsuarioInput, createUsuario);
usuarioRouter.put('/:id', sanitizeUsuarioInput, updateUsuario);
usuarioRouter.delete('/:id', deleteUsuario);