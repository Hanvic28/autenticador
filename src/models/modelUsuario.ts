const knex = require('../models/conexão');
import { Usuario } from '../@types/usuario';

class ModelUsuario {
	async insereUsuario(usuario: Usuario): Promise<[]> {
		const retorno = await knex('usuario').insert({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}

	async Login(usuario: Usuario): Promise<[]> {
		const retorno = await knex('usuario').select().where({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}
}

module.exports = ModelUsuario;
