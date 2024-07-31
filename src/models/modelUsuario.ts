import  { knex }  from '../models/conexão';
import { Usuario } from '../@types/usuario';

export class ModelUsuario {
	async insereUsuario(usuario: Usuario): Promise<number[]> {
		const retorno: number[] = await knex('usuario').insert({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}

	async Login(usuario: Usuario): Promise<Usuario[]> {
		const retorno: Usuario[] = await knex('usuario').select().where({ nome: usuario.nome, senha: usuario.senha });
		return retorno;
	}
}