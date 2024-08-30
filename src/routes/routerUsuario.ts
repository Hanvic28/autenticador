import express from 'express';
import { UsuarioController } from 'src/controllers/controllerUsuario';

const usuarioController = new UsuarioController();

const router = express.Router();

router.post('/cadastro', usuarioController.InsereUsuario);
router.post('/login', usuarioController.Login);

export default router;
