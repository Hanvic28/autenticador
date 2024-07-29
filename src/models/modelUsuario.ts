import  { knex }  from '../models/conexão';
import { Usuario } from '../@types/usuario';

export class ModelUsuario {
	async insereUsuario(usuario: Usuario): Promise<number[]> {
		const retorno = await knex('usuario').insert({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}

	async Login(usuario: Usuario): Promise<number[]> {
		const retorno = await knex('usuario').select().where({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}
}