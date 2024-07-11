const express = require('express')
const UsuarioController = require('../controllers/controllerUsuario.js')

const usuarioController = new UsuarioController()


const router = express.Router()
  
router.post('/cadastro', usuarioController.InsereUsuario)
router.post('/login', usuarioController.Login)

  module.exports = router